import { CtaLink, WhatsAppIcon } from "./Cta";
import { FadeUp } from "./FadeUp";

export const FinalCta = () => {
  return (
    <section id="cta" className="section-y" style={{ backgroundColor: "hsl(var(--teal))" }}>
      <div className="container-prose text-center">
        <FadeUp>
          <h2
            className="mx-auto font-display font-semibold text-paper max-w-[820px]"
            style={{ fontSize: "clamp(32px, 4.5vw, 54px)", lineHeight: 1.15 }}
          >
            The story that needs to be told<br />is waiting. So is your parent.
          </h2>
        </FadeUp>

        <FadeUp delay={120}>
          <p
            className="mt-4 mx-auto font-body text-[17px] max-w-[480px]"
            style={{ color: "hsl(var(--paper) / 0.75)", lineHeight: 1.7 }}
          >
            Start your first memory conversation today. Free. No commitment. No download. Just WhatsApp.
          </p>
        </FadeUp>

        <FadeUp delay={200}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="inverse">
              <WhatsAppIcon /> Start a Free Story on WhatsApp
            </CtaLink>
            <CtaLink
              href="#how-it-works"
              variant="secondary"
              className="!border-paper !text-paper hover:!bg-paper hover:!text-teal"
            >
              See How It Works
            </CtaLink>
          </div>
        </FadeUp>

        <FadeUp delay={280}>
          <p className="mt-6 font-body text-[13px]" style={{ color: "hsl(var(--paper) / 0.5)" }}>
            €49 founding price · 25 stories captured · First 5 stories free
          </p>
        </FadeUp>
      </div>
    </section>
  );
};
