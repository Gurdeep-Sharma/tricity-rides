"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  MapPin,
  Navigation,
  CalendarDays,
  Clock,
  Users,
  Car,
  MessageCircle,
  UserRound,
  Phone,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SuccessPanel } from "@/components/lead-form/SuccessPanel";
import type { LeadFormPrefill, LeadSuccess } from "@/components/lead-form/types";

import { activeVehicleTypes } from "@/data/vehicles";
import { leadFormSchema, type LeadFormValues } from "@/lib/validation/lead";
import { getAttribution } from "@/lib/attribution";
import { track, AnalyticsEvents } from "@/lib/analytics";
import { toIsoDate } from "@/lib/format";
import { businessConfig } from "@/config/business";
import { cn } from "@/lib/utils";

const TRIP_TYPES = [
  { value: "ONE_WAY", label: "One-way" },
  { value: "ROUND_TRIP", label: "Round-trip" },
  { value: "AIRPORT", label: "Airport" },
] as const;

const STEP_ONE_FIELDS = [
  "tripType",
  "pickupLocation",
  "dropLocation",
  "journeyDate",
  "pickupTime",
  "returnDate",
  "returnTime",
  "passengers",
  "vehicleType",
] as const;

/**
 * Bordered field with the icon and label inside the box, matching the quote
 * card in the reference design. The label is a real <label>, so the control
 * keeps its accessible name.
 */
function Field({
  icon: Icon,
  label,
  htmlFor,
  children,
  className,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  // The whole box is a <label>, so tapping anywhere in it focuses the control.
  // That makes the touch target the full 52px box rather than the input alone.
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex min-h-[52px] cursor-text items-center gap-2.5 rounded-xl border border-input bg-surface px-3 py-2",
        "transition-colors duration-200 focus-within:border-secondary focus-within:ring-3 focus-within:ring-secondary/20",
        className
      )}
    >
      <Icon aria-hidden className="size-4 shrink-0 text-secondary" />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.7rem] leading-none text-muted-foreground">{label}</span>
        {children}
      </span>
    </label>
  );
}

/** Input styling for use inside Field: the box already draws the border. */
const bareInput =
  "mt-1 h-7 w-full border-0 bg-transparent p-0 text-sm text-foreground shadow-none outline-none placeholder:text-muted-foreground/70 focus-visible:border-0 focus-visible:ring-0";

/** Accepts react-hook-form's error message union and renders only real text. */
function FieldError({ message }: { message?: unknown }) {
  const text = typeof message === "string" ? message : undefined;
  if (!text) return null;
  return (
    <p role="alert" className="flex items-start gap-1.5 text-sm text-destructive">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      {text}
    </p>
  );
}

export function LeadForm({
  prefill,
  className,
  heading = "Get a confirmed quote",
}: {
  prefill?: LeadFormPrefill;
  className?: string;
  heading?: string;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<LeadSuccess | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [honeypot, setHoneypot] = useState("");
  const startedRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onTouched",
    defaultValues: {
      tripType: prefill?.tripType ?? "ONE_WAY",
      pickupLocation: prefill?.pickup ?? "",
      dropLocation: prefill?.destination ?? "",
      journeyDate: "",
      pickupTime: "",
      returnDate: "",
      returnTime: "",
      passengers: 2,
      vehicleType: "",
      luggage: "",
      customerName: "",
      phoneNumber: "",
      whatsappNumber: "",
      email: "",
      additionalNotes: "",
      routeSlug: prefill?.routeSlug ?? "",
    },
  });

  const { register, handleSubmit, control, setValue, trigger, formState } = form;

  // useWatch is subscription-based, so it stays safe under the React Compiler.
  const tripType = useWatch({ control, name: "tripType" });
  const phoneNumber = useWatch({ control, name: "phoneNumber" });
  const journeyDate = useWatch({ control, name: "journeyDate" });
  const isRoundTrip = tripType === "ROUND_TRIP";
  const minDate = toIsoDate(new Date());

  // Keep the WhatsApp number in step with the phone number while they match.
  useEffect(() => {
    if (sameAsPhone) {
      setValue("whatsappNumber", phoneNumber ?? "", { shouldValidate: false });
    }
  }, [sameAsPhone, phoneNumber, setValue]);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    track(AnalyticsEvents.FORM_START, {
      route: prefill?.routeSlug ?? null,
      trip_type: tripType,
    });
  }

  async function goToStepTwo() {
    const fields = STEP_ONE_FIELDS.filter(
      (field) => isRoundTrip || (field !== "returnDate" && field !== "returnTime")
    );

    const valid = await trigger(fields as unknown as Parameters<typeof trigger>[0]);
    if (!valid) return;

    track(AnalyticsEvents.FORM_STEP_COMPLETE, {
      step: 1,
      trip_type: tripType,
      route: prefill?.routeSlug ?? null,
    });
    setStep(2);
  }

  async function onSubmit(values: LeadFormValues) {
    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          passengers: Number(values.passengers),
          returnDate: isRoundTrip ? values.returnDate : "",
          returnTime: isRoundTrip ? values.returnTime : "",
          attribution: getAttribution(),
          _hp: honeypot,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | {
            success?: boolean;
            duplicate?: boolean;
            error?: string;
            fieldErrors?: Record<string, string>;
            data?: { reference: string; whatsappUrl: string | null };
          }
        | null;

      if (response.status === 400 && payload?.fieldErrors) {
        for (const [field, message] of Object.entries(payload.fieldErrors)) {
          form.setError(field as Parameters<typeof form.setError>[0], {
            type: "server",
            message,
          });
        }
        const stepOneFieldNames: string[] = [...STEP_ONE_FIELDS];
        const hasStepOneError = Object.keys(payload.fieldErrors).some((f) =>
          stepOneFieldNames.includes(f)
        );
        if (hasStepOneError) setStep(1);
        setFormError(payload.error ?? "Please check the highlighted fields.");
        return;
      }

      if (!response.ok || !payload?.success || !payload.data) {
        track(AnalyticsEvents.LEAD_API_FAILED, { status: response.status });
        setFormError(
          payload?.error ??
            "We could not send your enquiry just now. Please WhatsApp or call us and we will help right away."
        );
        return;
      }

      track(AnalyticsEvents.LEAD_SUBMITTED, {
        trip_type: values.tripType,
        route: prefill?.routeSlug ?? null,
        vehicle: values.vehicleType,
        duplicate: Boolean(payload.duplicate),
      });

      setResult({
        reference: payload.data.reference,
        whatsappUrl: payload.data.whatsappUrl,
        duplicate: Boolean(payload.duplicate),
      });
    } catch {
      track(AnalyticsEvents.LEAD_API_FAILED, { status: 0 });
      setFormError(
        "We could not reach our server. Please WhatsApp or call us and we will help right away."
      );
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (result) panelRef.current?.focus();
  }, [result]);

  if (result) {
    return (
      <div
        id="quote"
        ref={panelRef}
        tabIndex={-1}
        className={cn("scroll-mt-24 focus:outline-none", className)}
      >
        <SuccessPanel
          result={result}
          onReset={() => {
            setResult(null);
            setStep(1);
            startedRef.current = false;
            form.reset();
          }}
        />
      </div>
    );
  }

  return (
    <div
      id="quote"
      className={cn(
        "scroll-mt-28 rounded-2xl border border-white/60 bg-surface p-5 shadow-float sm:p-6",
        className
      )}
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold text-primary">{heading}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {step === 1
            ? "Quick. Easy. On WhatsApp."
            : "Almost done — how should we reach you?"}
        </p>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          <span className="h-1 flex-1 rounded-full bg-secondary" />
          <span
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              step === 2 ? "bg-secondary" : "bg-border"
            )}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} onChange={markStarted} noValidate>
        {/* Honeypot: hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        {formError ? (
          <p
            role="alert"
            className="mb-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {formError}
          </p>
        ) : null}

        <div className={step === 1 ? "space-y-4" : "hidden"}>
          <fieldset>
            <legend className="sr-only">Trip type</legend>
            <Controller
              control={control}
              name="tripType"
              render={({ field }) => {
                const index = TRIP_TYPES.findIndex((o) => o.value === field.value);
                return (
                  <div
                    role="radiogroup"
                    aria-label="Trip type"
                    className="relative grid grid-cols-3 gap-1 rounded-xl bg-muted p-1"
                  >
                    {/* Sliding indicator: transform only, so it never reflows */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-1 left-1 rounded-lg bg-secondary-strong shadow-sm transition-transform duration-300 ease-out"
                      style={{
                        width: "calc((100% - 0.5rem) / 3)",
                        transform: `translateX(calc(${Math.max(index, 0)} * (100% + 0.25rem)))`,
                      }}
                    />
                    {TRIP_TYPES.map((option) => {
                      const selected = field.value === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => {
                            field.onChange(option.value);
                            markStarted();
                          }}
                          className={cn(
                            "relative z-10 min-h-11 cursor-pointer rounded-lg px-2 text-sm font-medium transition-colors duration-200",
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                            selected ? "text-white" : "text-muted-foreground hover:text-primary"
                          )}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                );
              }}
            />
          </fieldset>

          <div className="space-y-2">
            <Field icon={MapPin} label="Pickup Location" htmlFor="pickupLocation">
              <input
                id="pickupLocation"
                className={bareInput}
                placeholder="e.g. Chandigarh, Mohali, Zirakpur"
                autoComplete="off"
                {...register("pickupLocation")}
              />
            </Field>
            <FieldError message={formState.errors.pickupLocation?.message} />

            <Field icon={Navigation} label="Destination" htmlFor="dropLocation">
              <input
                id="dropLocation"
                className={bareInput}
                placeholder="e.g. Shimla, Manali, Delhi"
                autoComplete="off"
                {...register("dropLocation")}
              />
            </Field>
            <FieldError message={formState.errors.dropLocation?.message} />
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Field icon={CalendarDays} label="Pickup Date" htmlFor="journeyDate">
                <input
                  id="journeyDate"
                  type="date"
                  className={bareInput}
                  min={minDate}
                  {...register("journeyDate")}
                />
              </Field>
              <FieldError message={formState.errors.journeyDate?.message} />
            </div>

            <div className="space-y-1.5">
              <Field icon={Clock} label="Time" htmlFor="pickupTime">
                <input
                  id="pickupTime"
                  type="time"
                  className={bareInput}
                  {...register("pickupTime")}
                />
              </Field>
              <FieldError message={formState.errors.pickupTime?.message} />
            </div>
          </div>

          {isRoundTrip ? (
            <div className="grid animate-in fade-in slide-in-from-top-1 gap-2 rounded-xl bg-muted/70 p-2 duration-300 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Field icon={CalendarDays} label="Return Date" htmlFor="returnDate">
                  <input
                    id="returnDate"
                    type="date"
                    className={bareInput}
                    min={journeyDate || minDate}
                    {...register("returnDate")}
                  />
                </Field>
                <FieldError message={formState.errors.returnDate?.message} />
              </div>

              <div className="space-y-1.5">
                <Field icon={Clock} label="Return Time" htmlFor="returnTime">
                  <input
                    id="returnTime"
                    type="time"
                    className={bareInput}
                    {...register("returnTime")}
                  />
                </Field>
                <FieldError message={formState.errors.returnTime?.message} />
              </div>
            </div>
          ) : null}

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Field icon={Users} label="Passengers" htmlFor="passengers">
                <input
                  id="passengers"
                  type="number"
                  inputMode="numeric"
                  className={bareInput}
                  placeholder="e.g. 2"
                  min={1}
                  max={16}
                  {...register("passengers")}
                />
              </Field>
              <FieldError message={formState.errors.passengers?.message} />
            </div>

            <div className="space-y-1.5">
              <Controller
                control={control}
                name="vehicleType"
                render={({ field }) => (
                  <Select
                    value={field.value || null}
                    onValueChange={(value) => {
                      field.onChange(value ?? "");
                      markStarted();
                    }}
                  >
                    {/* The trigger is the whole 52px box, so the tap target
                        matches what the customer sees. */}
                    <SelectTrigger
                      id="vehicleType"
                      aria-labelledby="vehicleType-label"
                      className="flex min-h-[52px] w-full cursor-pointer items-center gap-2.5 rounded-xl border border-input bg-surface px-3 py-2 text-left"
                    >
                      <Car aria-hidden="true" className="size-4 shrink-0 text-secondary" />
                      <span className="min-w-0 flex-1">
                        <span
                          id="vehicleType-label"
                          className="block text-[0.7rem] leading-none text-muted-foreground"
                        >
                          Vehicle Type
                        </span>
                        <SelectValue placeholder="Any" className="mt-1 block text-sm" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {activeVehicleTypes.map((vehicle) => (
                        <SelectItem key={vehicle.slug} value={vehicle.value}>
                          {vehicle.name} — {vehicle.examples}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={formState.errors.vehicleType?.message} />
            </div>
          </div>

          <details className="group rounded-xl border border-input bg-surface">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary [&::-webkit-details-marker]:hidden">
              Luggage or special requirements
              <ArrowRight
                aria-hidden="true"
                className="size-4 text-secondary transition-transform duration-200 group-open:rotate-90"
              />
            </summary>
            <div className="px-3 pb-3">
              <input
                id="luggage"
                aria-label="Luggage or special requirements"
                className="h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-secondary"
                placeholder="e.g. 3 large suitcases, child seat needed"
                {...register("luggage")}
              />
              <FieldError message={formState.errors.luggage?.message} />
            </div>
          </details>

          <Button
            type="button"
            variant="accent"
            size="xl"
            className="w-full text-[0.95rem] tracking-wide uppercase"
            onClick={goToStepTwo}
          >
            <MessageCircle aria-hidden="true" />
            Get My Quote on WhatsApp
          </Button>

          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            No payment now. We reply on WhatsApp with the fare and vehicle options.
          </p>
        </div>

        <div className={step === 2 ? "space-y-4" : "hidden"}>
          <div className="space-y-1.5">
            <Field icon={UserRound} label="Your Name" htmlFor="customerName">
              <input
                id="customerName"
                className={bareInput}
                autoComplete="name"
                placeholder="Full name"
                {...register("customerName")}
              />
            </Field>
            <FieldError message={formState.errors.customerName?.message} />
          </div>

          <div className="space-y-1.5">
            <Field icon={Phone} label="Phone Number" htmlFor="phoneNumber">
              <input
                id="phoneNumber"
                type="tel"
                inputMode="tel"
                className={bareInput}
                autoComplete="tel"
                placeholder="10-digit mobile number"
                {...register("phoneNumber")}
              />
            </Field>
            <FieldError message={formState.errors.phoneNumber?.message} />
          </div>

          <div className="space-y-2">
            <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={sameAsPhone}
                onChange={(event) => setSameAsPhone(event.target.checked)}
                className="size-4 cursor-pointer accent-[var(--primary)]"
              />
              WhatsApp number is the same as my phone number
            </label>

            {!sameAsPhone ? (
              <div className="space-y-1.5">
                <Field icon={MessageCircle} label="WhatsApp Number" htmlFor="whatsappNumber">
                  <input
                    id="whatsappNumber"
                    type="tel"
                    inputMode="tel"
                    className={bareInput}
                    placeholder="10-digit WhatsApp number"
                    {...register("whatsappNumber")}
                  />
                </Field>
                <FieldError message={formState.errors.whatsappNumber?.message} />
              </div>
            ) : (
              <FieldError message={formState.errors.whatsappNumber?.message} />
            )}
          </div>

          <div className="space-y-1.5">
            <Field icon={Mail} label="Email (optional)" htmlFor="email">
              <input
                id="email"
                type="email"
                className={bareInput}
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email")}
              />
            </Field>
            <FieldError message={formState.errors.email?.message} />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="additionalNotes"
              className="block text-[0.7rem] text-muted-foreground"
            >
              Anything else we should know? (optional)
            </label>
            <textarea
              id="additionalNotes"
              rows={3}
              className="w-full rounded-xl border border-input bg-surface px-3 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground/70 focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/20 md:text-sm"
              placeholder="Flight number, extra stops, preferred pickup point"
              {...register("additionalNotes")}
            />
            <FieldError message={formState.errors.additionalNotes?.message} />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {businessConfig.policies.enquiry}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              size="xl"
              className="sm:w-auto"
              onClick={() => setStep(1)}
              disabled={submitting}
            >
              <ArrowLeft aria-hidden="true" />
              Back
            </Button>

            <Button
              type="submit"
              variant="accent"
              size="xl"
              className="flex-1 tracking-wide uppercase"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 aria-hidden="true" className="animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  <MessageCircle aria-hidden="true" />
                  Send My Enquiry
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
