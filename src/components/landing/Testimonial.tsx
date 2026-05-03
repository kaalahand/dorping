import { FadeUp } from "./FadeUp";

export const Testimonial = () => {
  return (
    <section className="bg-paper pt-20 pb-12 md:pt-28 md:pb-16">
      <div className="container-prose">
        <FadeUp>
          <div className="max-w-[760px] mx-auto text-center">
            <span
              className="font-display text-teal block leading-none"
              style={{ fontSize: "clamp(80px, 10vw, 140px)" }}
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote
              className="-mt-6 font-display italic text-ink"
              style={{ fontSize: "clamp(22px, 2.8vw, 34px)", lineHeight: 1.5 }}
            >
              My mother talked for 40 minutes about her childhood in Kerala. I had never heard any of it. Now it&rsquo;s a book on our shelf.
            </blockquote>
            <p className="mt-6 font-body text-[14px] font-medium text-ink-muted">
              Priya R., Amsterdam &nbsp;·&nbsp; Early access family
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
