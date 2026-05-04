import { useEffect, useState } from "react";
import { CtaLink, WhatsAppIcon } from "./Cta";

export const StickyCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      const pricing = document.querySelector('[data-pricing]') as HTMLElement | null;
      const footer = document.querySelector("footer");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      const pricingTop = pricing ? pricing.getBoundingClientRect().top : Infinity;
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
      const vh = window.innerHeight;
      setVisible(heroBottom < 0 && pricingTop > vh && footerTop > vh);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ backgroundColor: "hsl(var(--ink))" }}
    >
      <div className="container-prose flex items-center justify-end gap-3 py-3">
        <div className="flex items-center gap-3">
          <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary">
            <WhatsAppIcon /> Begin Your Family's Story, Free
          </CtaLink>
          <span className="hidden sm:inline font-body text-[13px]" style={{ color: "hsl(var(--paper) / 0.7)" }}>
            Free to start · No download needed
          </span>
        </div>
      </div>
    </div>
  );
};
