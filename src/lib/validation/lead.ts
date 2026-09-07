import { z } from "zod";
import { vehicleValues } from "@/data/vehicles";

/** Indian mobile numbers: 10 digits starting 6-9, optionally +91 / 0 prefixed. */
const phoneRegex = /^(?:\+?91[-\s]?|0)?[6-9]\d{9}$/;

const phoneField = z
  .string()
  .trim()
  .min(10, "Enter a valid 10-digit mobile number")
  .max(16, "Enter a valid 10-digit mobile number")
  .refine((v) => phoneRegex.test(v.replace(/[\s-]/g, "")), {
    message: "Enter a valid Indian mobile number",
  });

/** Normalises any accepted input to the last 10 digits. */
export function normalisePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  return digits.length > 10 ? digits.slice(-10) : digits;
}

/** Today at midnight in IST, used so "past date" means the same on server and client. */
export function todayInIndia(): Date {
  const now = new Date();
  const istMs = now.getTime() + (330 + now.getTimezoneOffset()) * 60_000;
  const ist = new Date(istMs);
  ist.setHours(0, 0, 0, 0);
  return ist;
}

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date")
  .refine((v) => !Number.isNaN(Date.parse(`${v}T00:00:00`)), "Choose a valid date");

const timeField = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Choose a valid time");

export const tripTypeValues = ["ONE_WAY", "ROUND_TRIP", "AIRPORT"] as const;
export type TripTypeValue = (typeof tripTypeValues)[number];

export const attributionSchema = z
  .object({
    source: z.string().max(120).optional(),
    medium: z.string().max(120).optional(),
    campaign: z.string().max(200).optional(),
    utmSource: z.string().max(120).optional(),
    utmMedium: z.string().max(120).optional(),
    utmCampaign: z.string().max(200).optional(),
    utmTerm: z.string().max(200).optional(),
    utmContent: z.string().max(200).optional(),
    landingPage: z.string().max(500).optional(),
    referrer: z.string().max(500).optional(),
  })
  .strict();

export type LeadAttribution = z.infer<typeof attributionSchema>;

/** Shared object shape. The API layer applies .strict() and the cross-field rules. */
export const leadFieldsShape = {
  tripType: z.enum(tripTypeValues),
  pickupLocation: z.string().trim().min(2, "Pickup location is required").max(160),
  dropLocation: z.string().trim().min(2, "Destination is required").max(160),
  journeyDate: isoDate,
  pickupTime: timeField,
  returnDate: isoDate.optional().or(z.literal("")),
  returnTime: timeField.optional().or(z.literal("")),
  passengers: z.coerce
    .number({ invalid_type_error: "Enter the number of passengers" })
    .int("Enter a whole number")
    .min(1, "At least 1 passenger")
    .max(16, "For more than 16 passengers, please call us"),
  vehicleType: z.enum(vehicleValues as [string, ...string[]], {
    errorMap: () => ({ message: "Select a vehicle type" }),
  }),
  luggage: z.string().trim().max(300).optional().or(z.literal("")),
  customerName: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Name is too long")
    .regex(/^[\p{L}\p{M}\s.'-]+$/u, "Name can only contain letters"),
  phoneNumber: phoneField,
  whatsappNumber: phoneField,
  email: z.string().trim().email("Enter a valid email").max(160).optional().or(z.literal("")),
  additionalNotes: z.string().trim().max(600).optional().or(z.literal("")),
  routeSlug: z.string().trim().max(120).optional().or(z.literal("")),
};

/** Cross-field rules applied to both the client form and the API payload. */
function applyTripRules<T extends z.ZodTypeAny>(schema: T) {
  return schema
    .superRefine((data: Record<string, unknown>, ctx: z.RefinementCtx) => {
      const journey = String(data.journeyDate ?? "");
      const isRoundTrip = data.tripType === "ROUND_TRIP";
      const returnDate = String(data.returnDate ?? "");
      const returnTime = String(data.returnTime ?? "");

      if (journey) {
        const journeyDate = new Date(`${journey}T00:00:00`);
        if (journeyDate < todayInIndia()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["journeyDate"],
            message: "Journey date cannot be in the past",
          });
        }
      }

      if (isRoundTrip) {
        if (!returnDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["returnDate"],
            message: "Return date is required for a round trip",
          });
        } else if (journey && new Date(`${returnDate}T00:00:00`) < new Date(`${journey}T00:00:00`)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["returnDate"],
            message: "Return date cannot be before the journey date",
          });
        }

        if (!returnTime) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["returnTime"],
            message: "Return time is required for a round trip",
          });
        }
      }
    });
}

/** Client-side form schema (react-hook-form). */
export const leadFormSchema = applyTripRules(z.object(leadFieldsShape));
export type LeadFormValues = z.input<typeof leadFormSchema>;
export type LeadFormParsed = z.output<typeof leadFormSchema>;

/** Server-side request schema: strict, plus honeypot and attribution. */
export const leadRequestSchema = applyTripRules(
  z
    .object({
      ...leadFieldsShape,
      attribution: attributionSchema.optional(),
      /** Honeypot. Must stay empty for a genuine submission. */
      _hp: z.string().max(200).optional(),
    })
    .strict()
);

export type LeadRequest = z.output<typeof leadRequestSchema>;
