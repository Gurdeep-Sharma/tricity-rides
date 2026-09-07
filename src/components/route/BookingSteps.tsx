const steps = [
  {
    title: "Send your trip details",
    body: "Fill in the short enquiry form, or message us on WhatsApp with your route and dates.",
  },
  {
    title: "We check and quote",
    body: "We confirm what is available for your dates and send you the fare with the inclusions written out.",
  },
  {
    title: "You confirm",
    body: "Nothing is booked until you accept the quote. Ask anything you need to before then.",
  },
  {
    title: "Driver details before pickup",
    body: "We share the driver's name, number and vehicle details ahead of your travel date.",
  },
];

export function BookingSteps() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
        >
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground"
          >
            {index + 1}
          </span>
          <h3 className="mt-3 text-base font-semibold">
            <span className="sr-only">Step {index + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
