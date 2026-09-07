import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("container-page", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  tone = "default",
  children,
}: {
  id?: string;
  className?: string;
  tone?: "default" | "muted" | "primary";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 md:py-20",
        tone === "muted" && "bg-muted/60",
        tone === "primary" && "bg-primary text-primary-foreground",
        className
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  as?: "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-wide text-secondary-strong uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-2xl font-bold md:text-3xl">{title}</Heading>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
