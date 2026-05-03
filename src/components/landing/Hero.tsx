import { CtaLink, WhatsAppIcon } from "./Cta";
import { FadeUp } from "./FadeUp";
import bookSpread from "@/assets/book-spread.jpg";
import fiLogo from "@/assets/fi-logo.png";

export const Hero = () => {
  return (
    <section id="top" className="bg-paper pt-28 pb-20 md:pt-32 md:pb-28">
      <div className="container-prose">
        <div className="max-w-[760px] mx-auto text-center">
          <FadeUp>
            <p className="eyebrow text-ink-muted">
              For Indian families in Europe&nbsp; · &nbsp;Hindi &amp; Bengali&nbsp; · &nbsp;GDPR compliant
            </p>
          </FadeUp>

          <FadeUp delay={80}>
            <h1
              className="mt-6 font-display font-semibold text-ink"
              style={{ fontSize: "clamp(44px, 5vw, 68px)", lineHeight: 1.1 }}
            >
              Their stories<br />won&rsquo;t wait.
            </h1>
          </FadeUp>

          <FadeUp delay={160}>
            <p className="mt-6 mx-auto font-body text-[17px] text-ink-muted max-w-[560px] text-left" style={{ lineHeight: 1.75 }}>
              Your parents have stories you have never heard. We capture them, in their native language, over WhatsApp and turn them into a hardcover book and a secure, private online portal your family keeps forever.
            </p>
          </FadeUp>

          <FadeUp delay={220}>
            <p className="mt-6 font-body text-[13px] text-ink-muted">
              Free to start · €49 founding price · No card required
            </p>
          </FadeUp>

          <FadeUp delay={240}>
            <div className="mt-5 flex flex-wrap gap-4 justify-center">
              <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary">
                <WhatsAppIcon /> Start a Free Story on WhatsApp
              </CtaLink>
              <CtaLink href="#how-it-works" variant="secondary">
                See How It Works
              </CtaLink>
            </div>
          </FadeUp>

          <FadeUp delay={300}>
            <p className="mt-3 font-body text-[13px] text-ink-faint">
              Opens WhatsApp · Takes 2 minutes
            </p>
          </FadeUp>

          <FadeUp delay={320}>
            <p className="mt-2 font-body text-[13px] text-ink-faint">
              No app download. No account. Just WhatsApp.
            </p>
          </FadeUp>

          <FadeUp delay={400}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <a
                href="https://fi.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-divider rounded font-body text-[12px] text-ink-muted px-2.5 py-1.5 hover:border-teal hover:text-ink transition-colors"
              >
                <img src={fiLogo} alt="Founder Institute" className="h-3.5 w-auto" />
                Enrolled in Founder Institute Spring 2026 Cohort
              </a>
              <div className="inline-flex items-center gap-1.5 border border-divider rounded font-body text-[12px] text-ink-muted px-2.5 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal" aria-hidden />
                Trusted by early-access families across Europe
              </div>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={200}>
          <div className="mt-14 md:mt-20 mx-auto w-full max-w-[880px]">
            <img
              src={bookSpread}
              alt="An open Reminology hardcover book showing a family photo and a story written in Hindi"
              className="w-full h-auto rounded-md shadow-[0_30px_60px_-20px_hsl(0_0%_0%/0.25)]"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
