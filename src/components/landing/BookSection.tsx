import { CtaLink, WhatsAppIcon } from "./Cta";
import { FadeUp } from "./FadeUp";
import { Check } from "lucide-react";

const BookMockup = () => (
  <div className="relative mx-auto w-full max-w-[320px] aspect-[3/4]">
    <div
      className="absolute inset-0 rounded-r-md rounded-l-sm overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(212 35% 22%) 0%, hsl(212 40% 14%) 100%)",
        boxShadow:
          "0 30px 60px -20px hsl(0 0% 0% / 0.5), inset 8px 0 0 hsl(var(--gold) / 0.25), inset -1px 0 0 hsl(0 0% 100% / 0.05)",
      }}
    >
      {/* Aged paper texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, hsl(var(--gold) / 0.15), transparent 60%), radial-gradient(circle at 70% 80%, hsl(var(--paper) / 0.05), transparent 50%)",
        }}
      />
      {/* Gold double-rule frame */}
      <div className="absolute inset-6 border border-gold/40 rounded-sm">
        <div className="absolute inset-1.5 border border-gold/25 rounded-sm flex flex-col items-center justify-center text-center px-4">
          <p className="font-display italic text-gold/80 text-[11px] tracking-[0.25em] uppercase">
            A Reminology Volume
          </p>
          <div className="my-6 w-12 h-px bg-gold/50" />
          <h3 className="font-display text-paper text-2xl sm:text-3xl leading-tight">
            Family<br />Stories
          </h3>
          <div className="mt-6 w-8 h-px bg-gold/50" />
          <p className="mt-4 font-display italic text-paper/70 text-[11px]">
            in their own voice
          </p>
        </div>
      </div>
    </div>
  </div>
);

const features = [
  "Stories written in your parent's own voice, not a robotic transcript",
  "QR codes on every page: scan to hear your parent tell the story aloud",
  "Premium A5 hardcover, up to 200 pages, mixed black-and-white and colour",
  "Order sibling copies for €49 each, one for every branch of the family",
  "Printed in the Netherlands, delivered in 5 to 10 business days",
  "Secure online portal: your family's stories, accessible forever",
];

export const BookSection = () => {
  return (
    <section className="section-y" style={{ backgroundColor: "hsl(var(--ink))" }}>
      <div className="container-prose grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center">
        <FadeUp className="order-2 md:order-1">
          <p className="eyebrow text-gold">The Reminology Book</p>
          <h2
            className="mt-6 font-display font-semibold text-paper"
            style={{ fontSize: "clamp(30px, 3.5vw, 44px)", lineHeight: 1.15 }}
          >
            A book for generations.<br />A portal for forever.
          </h2>
          <p
            className="mt-6 font-body text-[17px]"
            style={{ color: "hsl(var(--paper) / 0.80)", lineHeight: 1.75 }}
          >
            Every story your parent tells becomes a chapter. Every photo you add becomes a page. The result is a premium hardcover book, printed in the Netherlands, delivered to your door. And a secure online portal where your family&rsquo;s stories live forever, accessible to you and every generation that follows.
          </p>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 font-body text-[15px] text-paper">
                <Check className="w-4 h-4 text-gold mt-[3px] shrink-0" strokeWidth={2.5} aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="inverse">
              <WhatsAppIcon /> Start Your Free Family Story Now
            </CtaLink>
          </div>
        </FadeUp>

        <FadeUp delay={120} className="order-1 md:order-2">
          <BookMockup />
        </FadeUp>
      </div>
    </section>
  );
};
