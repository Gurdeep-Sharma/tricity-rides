/** Central list of analytics event names. Keep in sync with docs/CONVERSION-FUNNEL.md. */
export const AnalyticsEvents = {
  FORM_START: "form_start",
  FORM_STEP_COMPLETE: "form_step_complete",
  LEAD_SUBMITTED: "lead_submitted",
  LEAD_API_FAILED: "lead_api_failed",
  WHATSAPP_CLICK: "whatsapp_click",
  PHONE_CLICK: "phone_click",
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
