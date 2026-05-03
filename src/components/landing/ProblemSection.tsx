import { FadeUp } from "./FadeUp";

export const ProblemSection = () => {
  return (
    <section className="bg-surface-2 section-y" id="what">
      <div className="container-prose">
        <FadeUp>
          <p className="eyebrow text-teal">Why this matters</p>
        </FadeUp>

        <FadeUp delay={80}>
          <blockquote
            className="mt-8 font-display italic text-ink max-w-[720px]"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.3 }}
          >
            &ldquo;Once they are gone, their stories go with them.&rdquo;
          </blockquote>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeUp delay={120}>
            <div className="bg-paper border border-divider rounded-lg p-8 h-full">
              <p className="text-[11px] uppercase tracking-[0.10em] text-ink-faint font-body font-medium">
                Time is finite
              </p>
              <p className="mt-3 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                Once they are gone, their stories go with them. Every conversation you delay is a story the world loses forever.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="bg-paper border border-divider rounded-lg p-8 h-full">
              <p className="text-[11px] uppercase tracking-[0.10em] text-ink-faint font-body font-medium">
                The language barrier
              </p>
              <p className="mt-3 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                No tool lets your parent tell their story in the language they dream in. Every app assumes English. Your parent&rsquo;s story isn&rsquo;t in English.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={280}>
            <div className="bg-paper border border-divider rounded-lg p-8 h-full">
              <p className="text-[11px] uppercase tracking-[0.10em] text-ink-faint font-body font-medium">
                The app barrier
              </p>
              <p className="mt-3 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                Every new app your parent never downloads is a story never told. Reminology works on the WhatsApp they already use every day. No download. No account. Just a tap.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
