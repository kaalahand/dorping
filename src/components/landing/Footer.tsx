import { ShieldCheck, Lock, Trash2, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const badges = [
  { Icon: ShieldCheck, label: "GDPR Compliant" },
  { Icon: Lock, label: "Encrypted Storage" },
  { Icon: Trash2, label: "Delete Anytime" },
  { Icon: MapPin, label: "Netherlands Based" },
];

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: "hsl(var(--ink))" }} className="pt-14 pb-10">
      <div className="container-prose">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <a href="#top" className="inline-flex items-center gap-2.5">
            <img src={logo} alt="Reminology" className="h-8 w-auto brightness-0 invert" />
            <span className="font-display font-medium text-paper text-[22px] leading-none">
              Reminology
            </span>
          </a>
          <p className="font-body text-[14px]" style={{ color: "hsl(var(--paper) / 0.7)" }}>
            Preserving the stories of Indian families in Europe.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 font-body text-[13px]">
          {badges.map(({ Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 border rounded-md px-3.5 py-2 font-medium"
              style={{
                borderColor: "hsl(var(--paper) / 0.18)",
                color: "hsl(var(--paper) / 0.85)",
              }}
            >
              <Icon className="w-4 h-4 text-gold" strokeWidth={1.75} aria-hidden />
              {label}
            </li>
          ))}
        </ul>

        <div
          className="mt-10 pt-6 border-t font-body text-[13px] flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left"
          style={{ borderColor: "hsl(var(--paper) / 0.12)", color: "hsl(var(--paper) / 0.6)" }}
        >
          <p>Reminology · Dorp.ai BV · Amsterdam</p>
          <p className="flex flex-wrap justify-center gap-x-3">
            <a href="#how-it-works" className="hover:text-paper transition-colors">How It Works</a>
            <span aria-hidden>·</span>
            <a href="#faq" className="hover:text-paper transition-colors">FAQ</a>
            <span aria-hidden>·</span>
            <a href="#" className="hover:text-paper transition-colors">Privacy</a>
          </p>
          <p>© 2026 Dorp.ai BV. GDPR compliant.</p>
        </div>
      </div>
    </footer>
  );
};
