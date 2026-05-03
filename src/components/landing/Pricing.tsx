import { CtaLink, WhatsAppIcon } from "./Cta";
import { FadeUp } from "./FadeUp";

export const Pricing = () => {
  return (
    <section data-pricing className="bg-paper section-y">
      <div className="container-prose">
        <FadeUp>
          <p className="eyebrow text-teal">Founding price</p>
        </FadeUp>
        <FadeUp delay={80}>
          <h2 className="mt-6 font-display font-medium text-ink text-[clamp(28px,3.2vw,36px)] leading-[1.2]">
            Start free. Pay only when you order the book.
          </h2>
        </FadeUp>

        <FadeUp delay={160}>
          <div className="mt-12 mx-auto max-w-[520px] bg-surface-1 border border-divider rounded-xl p-8 sm:p-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.10em] text-ink-faint font-body font-medium">
                To start
              </p>
              <h3 className="mt-2 font-display font-medium text-ink text-[28px] leading-tight">Free</h3>
              <p className="mt-3 font-body text-[16px] text-ink-muted" style={{ lineHeight: 1.7 }}>
                Your first 5 stories are completely free. No card required. Start telling your parent&rsquo;s story today with no commitment.
              </p>
            </div>

            <hr className="my-8 border-divider" />

            <div>
              <p className="text-[11px] uppercase tracking-[0.10em] text-ink-faint font-body font-medium">
                To order your book
              </p>
              <h3 className="mt-2 font-display font-medium text-ink text-[28px] leading-tight">
                <span className="text-ink-faint line-through font-normal mr-2">€89</span>
                <span className="text-teal">€49</span>
                <span className="font-body font-normal text-[16px] text-ink-muted ml-2">founding price</span>
              </h3>
              <p className="mt-2 font-body text-[13px] font-medium text-amber-600">
                Founding price available until 31 May 2026
              </p>
              <p className="mt-3 font-body text-[15px] font-medium text-ink" style={{ lineHeight: 1.6 }}>
                25 stories captured: enough to build a complete family memoir
              </p>
              <p className="mt-3 font-body text-[16px] text-ink-muted" style={{ lineHeight: 1.7 }}>
                One hardcover A5 book, printed and delivered to your home in Europe. You only pay when you decide to order, no commitment before then.
              </p>
            </div>

            <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary" className="mt-8 w-full">
              <WhatsAppIcon /> Start a Free Story on WhatsApp
            </CtaLink>
            <p className="mt-3 text-center font-body text-[13px] text-ink-faint">
              No card required
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
