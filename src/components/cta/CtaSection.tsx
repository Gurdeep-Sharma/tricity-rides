import { Container } from "@/components/section/Section";
import { HeroBackdrop } from "@/components/art/HeroBackdrop";
import { QuoteButton } from "@/components/cta/QuoteButton";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { PhoneButton } from "@/components/cta/PhoneButton";
import { Reveal } from "@/components/motion/Reveal";
import { businessConfig } from "@/config/business";

/** Closing conversion band, on the same scenic backdrop as the hero. */
export function CtaSection({
  title,
  description,
  context,
  placement,
  quoteHref = "#quote",
}: {
  title: string;
  description?: string;
  context?: string;
  placement: string;
  quoteHref?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <HeroBackdrop />
      <Container className="relative py-14 md:py-16">
        <Reveal className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
            <p className="text-white/85">
              {description ?? businessConfig.pricing.explanation}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <QuoteButton href={quoteHref} label={businessConfig.pricing.quoteCta} />
            <WhatsAppButton context={context} placement={`${placement}:cta-section`} />
            <PhoneButton
              placement={`${placement}:cta-section`}
              showNumber
              variant="outline"
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
