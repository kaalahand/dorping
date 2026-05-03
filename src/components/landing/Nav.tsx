import { useEffect, useState } from "react";
import { CtaLink, WhatsAppIcon } from "./Cta";
import logo from "@/assets/logo.png";

const links = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#what", label: "What is Reminology?" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (window.innerWidth < 768) {
        setHidden(y > lastY && y > 80);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`bg-paper transition-[border-color] ${
          scrolled ? "border-b border-ink/10" : "border-b border-transparent"
        }`}
      >
        <div className="container-prose flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2.5">
            <img src={logo} alt="Reminology" className="h-8 w-auto" />
            <span className="font-display font-medium text-ink text-[22px] leading-none">
              Reminology
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-body text-[14px] text-ink-muted hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary">
              <WhatsAppIcon /> Start a Free Story on WhatsApp
            </CtaLink>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative w-5 h-4 block">
              <span
                className={`absolute left-0 top-0 w-5 h-[1.5px] bg-ink transition-transform ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] w-5 h-[1.5px] bg-ink transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] w-5 h-[1.5px] bg-ink transition-transform ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden bg-paper border-b border-ink/10 overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <div className="container-prose py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body text-[15px] text-ink-muted hover:text-ink py-3 border-b border-divider/60"
            >
              {l.label}
            </a>
          ))}
          <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary" className="mt-4 w-full" onClick={() => setOpen(false)}>
            <WhatsAppIcon /> Start a Free Story on WhatsApp
          </CtaLink>
        </div>
      </div>
    </header>
  );
};
