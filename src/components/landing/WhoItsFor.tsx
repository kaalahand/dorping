import { CtaLink, WhatsAppIcon } from "./Cta";
import { FadeUp } from "./FadeUp";

export const WhoItsFor = () => {
  return (
    <section className="bg-surface-1 pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="container-prose">
        <FadeUp>
          <p className="eyebrow text-teal">Who it&rsquo;s for</p>
        </FadeUp>
        <FadeUp delay={80}>
          <h2
            className="mt-6 font-display font-semibold text-ink"
            style={{ fontSize: "clamp(28px, 3.5vw, 42px)", lineHeight: 1.15 }}
          >
            Built for the Indian expat<br />who is running out of time.
          </h2>
        </FadeUp>

        <div className="mt-14 flex flex-col gap-6 max-w-[820px]">
          <FadeUp delay={160}>
            <div className="bg-paper border border-divider rounded-lg p-8">
              <p className="text-[11px] uppercase tracking-[0.10em] text-gold font-body font-medium">
                The Keeper
              </p>
              <p className="mt-4 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                You live in Europe. Your parents live in India. You hear fragments about a village, a journey, a person who shaped them. <strong className="text-ink">But no one has ever sat with them and asked: &ldquo;Tell me the whole story.&rdquo;</strong> Reminology does that for you, in their language, on their schedule.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={240}>
            <div className="bg-paper border border-divider rounded-lg p-8">
              <p className="text-[11px] uppercase tracking-[0.10em] text-gold font-body font-medium">
                The Gifter
              </p>
              <p className="mt-4 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                You want to give your family something no store sells. <strong className="text-ink">A book of your parent&rsquo;s stories, written in their voice, printed and delivered.</strong> The gift they didn&rsquo;t know they wanted. The one they will never stop talking about.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={320}>
            <div className="bg-paper border border-divider rounded-lg p-8">
              <p className="text-[11px] uppercase tracking-[0.10em] text-gold font-body font-medium">
                The Urgent One
              </p>
              <p className="mt-4 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                You feel the window closing. Your parent is ageing. <strong className="text-ink">You live with a quiet background fear that one day it will be too late.</strong> Reminology is for the ones who refuse to let that moment arrive without having done something about it.
              </p>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={400}>
          <div className="mt-10 flex justify-center max-w-[820px]">
            <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary">
              <WhatsAppIcon /> Begin Your Family's Story, Free
            </CtaLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
