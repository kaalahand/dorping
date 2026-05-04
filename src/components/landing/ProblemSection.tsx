import { CtaLink, WhatsAppIcon } from "./Cta";
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
            &ldquo;You always think there will be more time. Until there isn&rsquo;t.&rdquo;
          </blockquote>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeUp delay={120}>
            <div className="bg-paper border border-divider rounded-lg p-8 h-full">
              <p className="text-[11px] uppercase tracking-[0.10em] text-ink-faint font-body font-medium">
                Time is finite
              </p>
              <p className="mt-3 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                Your parents remember things no one else does. The name of the village schoolteacher. The smell of their grandmother&rsquo;s kitchen. The year the monsoon didn&rsquo;t come. These memories are leaving, quietly, every day.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="bg-paper border border-divider rounded-lg p-8 h-full">
              <p className="text-[11px] uppercase tracking-[0.10em] text-ink-faint font-body font-medium">
                Your parents&rsquo; real voice
              </p>
              <p className="mt-3 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                Your parent&rsquo;s deepest memories aren&rsquo;t in English. They are in the language they grew up in, the one they dream in. Most tools ignore this. We built Reminology around it.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={280}>
            <div className="bg-paper border border-divider rounded-lg p-8 h-full">
              <p className="text-[11px] uppercase tracking-[0.10em] text-ink-faint font-body font-medium">
                Asking the right questions is hard
              </p>
              <p className="mt-3 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                You have tried. You have sat with your parent and said &ldquo;tell me about your childhood.&rdquo; And they said &ldquo;what do you want to know?&rdquo; The problem isn&rsquo;t willingness. It&rsquo;s that memory needs the right prompt to unlock. That is what Reminology does.
              </p>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={360}>
          <div className="mt-10 flex justify-center">
            <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary">
              <WhatsAppIcon /> Start Your Free Family Story Now
            </CtaLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
