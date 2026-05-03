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
                You live in Europe. Your parents live in India. You video call every Sunday. You hear fragments about a village, a journey, a person who shaped them. But no one has ever asked them to tell the full story. Reminology does that for you.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={240}>
            <div className="bg-paper border border-divider rounded-lg p-8">
              <p className="text-[11px] uppercase tracking-[0.10em] text-gold font-body font-medium">
                The Gifter
              </p>
              <p className="mt-4 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                Birthdays. Diwali. An anniversary. A book of your parent&rsquo;s stories, written in their voice, printed and delivered, is the most meaningful gift you will ever give your family. The kind that cannot be bought in a store.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={320}>
            <div className="bg-paper border border-divider rounded-lg p-8">
              <p className="text-[11px] uppercase tracking-[0.10em] text-gold font-body font-medium">
                The Urgent One
              </p>
              <p className="mt-4 font-body text-[17px] text-ink-muted" style={{ lineHeight: 1.75 }}>
                You feel the window closing. Your parent is ageing. You live with a quiet background anxiety that one day it will be too late. Reminology is for the ones who refuse to let that moment arrive without having done something.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
