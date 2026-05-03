import { useState } from "react";
import { FadeUp } from "./FadeUp";

const items = [
  {
    q: "Does my parent need to download an app?",
    a: "No. Your parent receives a WhatsApp message from you with a simple link. They tap it, give a one-time consent, and begin talking. No download. No account. Just one tap on the app they already use every day.",
  },
  {
    q: "Which languages are supported?",
    a: "We currently support English and Hindi (Beta). Bengali launches in June 2026, with Tamil following in Phase 2. If your parent speaks a language not yet supported, join our waitlist and we prioritise based on demand.",
  },
  {
    q: "What if the call drops or my parent gets disconnected?",
    a: "The call link stays active. Your parent can reconnect at any time. The recording resumes and nothing is lost.",
  },
  {
    q: "What happens to my parent's recording?",
    a: "Recordings are encrypted and stored for 30 days after story delivery. You can request permanent deletion at any time by replying DELETE on WhatsApp. We are fully GDPR-compliant and EU-hosted.",
  },
  {
    q: "When do I pay?",
    a: "Your first 5 stories are completely free, no card required. You only pay €49 when you decide to order the printed hardcover book, which covers up to 25 stories.",
  },
  {
    q: "How long does delivery take?",
    a: "Books are printed on demand in the Netherlands and delivered within 5 to 10 business days to addresses in Europe.",
  },
];

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper section-y">
      <div className="container-prose max-w-[820px]">
        <FadeUp>
          <p className="eyebrow text-teal">Common questions</p>
        </FadeUp>
        <FadeUp delay={80}>
          <h2 className="mt-6 font-display font-medium text-ink text-[clamp(24px,3vw,32px)] leading-[1.25] max-w-[640px]">
            Before you begin, here are answers.
          </h2>
        </FadeUp>

        <div className="mt-10">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={item.q} delay={i * 40}>
                <div className="border-t border-divider last:border-b">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group min-h-[44px]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-ink text-[19px] sm:text-[20px] leading-snug">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 mt-1 text-teal font-body text-[22px] leading-none transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 font-body text-[16px] text-ink-muted max-w-[680px]" style={{ lineHeight: 1.75 }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};
