import { CtaLink, WhatsAppIcon } from "./Cta";
import { FadeUp } from "./FadeUp";

const comparisons = [
  {
    label: "What you ask",
    without: "“Maa, tell me about your childhood.”\n“I don’t know… it was normal.”",
    with: "“What was the first recipe you learned to cook, and who taught you?”\n“Oh! My nani taught me to make dal on a coal stove when I was eight. I still remember how she held my hand over the pot…”",
  },
  {
    label: "How memory works",
    without: "A single long conversation that exhausts both of you.",
    with: "Short, focused sessions across weeks. Each one builds on the last. Your parent has time to remember between calls.",
  },
  {
    label: "What you get",
    without: "A voice recording on your phone you never listen to again.",
    with: "A structured narrative in their voice, reviewed by you, printed as a hardcover book with QR codes to hear the original audio.",
  },
];

export const QuestionScience = () => {
  return (
    <section className="bg-surface-2 section-y">
      <div className="container-prose">
        <FadeUp>
          <p className="eyebrow text-teal">The Reminology difference</p>
        </FadeUp>

        <FadeUp delay={80}>
          <h2
            className="mt-6 font-display font-semibold text-ink max-w-[720px]"
            style={{ fontSize: "clamp(28px, 3.5vw, 42px)", lineHeight: 1.15 }}
          >
            Why your parent needs the right question, not just a willing listener.
          </h2>
        </FadeUp>

        <FadeUp delay={160}>
          <p
            className="mt-6 font-body text-[17px] text-ink-muted max-w-[620px]"
            style={{ lineHeight: 1.75 }}
          >
            When you ask your parent &ldquo;tell me about your life,&rdquo; they don&rsquo;t know where to start. Memory doesn&rsquo;t work like a filing cabinet. It works like a web: one detail triggers another. The right question pulls a thread that unravels an entire chapter.
          </p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {comparisons.map((c, i) => (
            <FadeUp key={c.label} delay={200 + i * 80}>
              <div className="bg-paper border border-divider rounded-lg overflow-hidden h-full flex flex-col">
                <div className="px-6 pt-6 pb-4">
                  <p className="text-[11px] uppercase tracking-[0.10em] text-ink-faint font-body font-medium">
                    {c.label}
                  </p>
                </div>

                <div className="px-6 pb-4 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint/60 font-body mb-2">
                    Without Reminology
                  </p>
                  <p className="font-body text-[15px] text-ink-muted/60 whitespace-pre-line" style={{ lineHeight: 1.6 }}>
                    {c.without}
                  </p>
                </div>

                <div className="px-6 pb-6 flex-1 border-l-2 border-teal ml-4 mr-2">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-teal font-body font-medium mb-2">
                    With Reminology
                  </p>
                  <p className="font-body text-[15px] text-ink" style={{ lineHeight: 1.6 }}>
                    {c.with}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={480}>
          <p className="mt-12 font-body text-[15px] text-ink-muted text-center">
            Over 200 questions designed for Indian family storytelling. Adapted across sessions. Always in your parent&rsquo;s language.
          </p>
        </FadeUp>

        <FadeUp delay={540}>
          <div className="mt-8 flex justify-center">
            <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary">
              <WhatsAppIcon /> Start Your Free Family Story Now
            </CtaLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
