import { CtaLink, WhatsAppIcon } from "./Cta";
import { FadeUp } from "./FadeUp";

const steps = [
  {
    n: "01",
    title: "You message us on WhatsApp",
    body: "No download, no account, no password. Message us on WhatsApp and we guide you through a simple setup in under 3 minutes. Your parent doesn't need to install anything.",
  },
  {
    n: "02",
    title: "We guide a voice call with your parent",
    body: "We send you a secure private call link. You share it with your parent on WhatsApp. They click, give a one-time consent, and tell their story in their own language. Our AI listens and asks follow-up questions.",
  },
  {
    n: "03",
    title: "You receive a story and a hardcover book",
    body: "Our AI transforms the conversation into a beautifully written narrative in your parent's own voice. Each session captures one story, a chapter in their life. Most families complete 8 to 12 sessions over a few months, building a full hardcover book. Add photos. We print and deliver a premium A5 hardcover to your home in Europe.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-paper section-y">
      <div className="container-prose">
        <FadeUp>
          <p className="eyebrow text-teal">How it works</p>
        </FadeUp>
        <FadeUp delay={80}>
          <h2
            className="mt-6 font-display font-semibold text-ink"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15 }}
          >
            Three steps. One conversation.<br />A book that lasts forever.
          </h2>
        </FadeUp>

        <div className="mt-12 max-w-[680px] mx-auto flex flex-col">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 80}>
              <div className="relative grid grid-cols-[auto_1fr] gap-5 md:gap-7 py-7 md:py-8 border-t border-divider first:border-t-0">
                <div
                  className="font-display font-bold text-teal/[0.10] leading-none select-none"
                  style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
                  aria-hidden
                >
                  {s.n}
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.08em] text-teal font-body font-medium">
                    Step {s.n}
                  </p>
                  <h3 className="mt-1.5 font-display font-medium text-ink text-[20px] leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-body text-[16px] text-ink-muted" style={{ lineHeight: 1.65 }}>
                    {s.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={240}>
          <div className="mt-10 flex justify-center border-t border-divider pt-8 max-w-[680px] mx-auto">
            <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary">
              <WhatsAppIcon /> Start a Free Story on WhatsApp
            </CtaLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
