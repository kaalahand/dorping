import { CtaLink, WhatsAppIcon } from "./Cta";
import { FadeUp } from "./FadeUp";

const steps = [
  {
    n: "01",
    title: "You tell us about your parent",
    body: "Message us and share a little about your family. Who is the storyteller? What language do they speak? What part of their life are you most curious about? We use this to design a personalised conversation path, not a generic questionnaire.",
  },
  {
    n: "02",
    title: "A simple call, in their own language",
    body: "Your parent receives a link on WhatsApp. They click it, join a call room in their browser, and simply talk. No download, no login, no learning curve.",
  },
  {
    n: "03",
    title: "Our system asks questions that unlock memory",
    body: "This is not a recording app. Our AI interviewer asks carefully designed questions that trigger specific memories: the kind your parent wouldn’t think to tell unprompted. ‘What did your mother cook on the day you got your exam results?’ ‘What was the first thing you bought with your own money?’ Each question builds on what they said before.",
  },
  {
    n: "04",
    title: "Stories unfold across multiple sessions",
    body: "One call captures one story. Over 8 to 12 sessions across a few weeks, a full life narrative takes shape: childhood, marriage, migration, parenthood. Each session picks up where the last one left off. Your parent looks forward to the next call.",
  },
  {
    n: "05",
    title: "We transform voice into a written narrative",
    body: "Our AI doesn’t just transcribe. It transforms your parent’s spoken words into a beautifully structured narrative written in their voice. You review it. Add photos. Approve each story before it becomes a chapter in their book.",
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
            A guided journey, not a single conversation.<br />Stories that unfold over weeks.
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
              <WhatsAppIcon /> Begin Your Family's Story, Free
            </CtaLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
