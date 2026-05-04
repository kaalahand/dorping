import { CtaLink, WhatsAppIcon } from "./Cta";
import { FadeUp } from "./FadeUp";

const testimonials = [
  {
    quote:
      "My mother talked for 40 minutes about her childhood in Kerala. I had never heard any of it. Now it’s a book on our shelf.",
    name: "Priya R., Amsterdam",
    label: "Early access family",
  },
  {
    // TODO: Replace with real testimonial when available
    quote:
      "My father was reluctant at first. After the second call, he started calling us to ask when the next session was.",
    name: "Rahul M., Berlin",
    label: "Early access family",
  },
];

export const Testimonial = () => {
  return (
    <section className="bg-paper pt-20 pb-12 md:pt-28 md:pb-16">
      <div className="container-prose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-[960px] mx-auto">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 120}>
              <div className="text-center">
                <span
                  className="font-display text-teal block leading-none"
                  style={{ fontSize: "clamp(60px, 8vw, 100px)" }}
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote
                  className="-mt-4 font-display italic text-ink"
                  style={{ fontSize: "clamp(19px, 2.2vw, 26px)", lineHeight: 1.5 }}
                >
                  {t.quote}
                </blockquote>
                <p className="mt-6 font-body text-[14px] font-medium text-ink-muted">
                  {t.name} &nbsp;&middot;&nbsp; {t.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={280}>
          <div className="mt-14 flex justify-center">
            <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary">
              <WhatsAppIcon /> Start Your Free Family Story Now
            </CtaLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
