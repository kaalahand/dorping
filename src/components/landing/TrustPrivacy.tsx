import { FadeUp } from "./FadeUp";
import { ShieldCheck, Lock, Trash2, MapPin } from "lucide-react";

const badges = [
  { Icon: ShieldCheck, label: "GDPR Compliant" },
  { Icon: Lock, label: "Encrypted Storage" },
  { Icon: Trash2, label: "Delete Anytime" },
  { Icon: MapPin, label: "Netherlands Based" },
];

export const TrustPrivacy = () => {
  return (
    <section className="bg-surface-2 section-y">
      <div className="container-prose text-center">
        <FadeUp>
          <h2
            className="font-display font-medium italic text-ink mx-auto max-w-[760px]"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.3 }}
          >
            &ldquo;Your parent&rsquo;s voice is sacred. We treat it that way.&rdquo;
          </h2>
        </FadeUp>

        <FadeUp delay={120}>
          <p className="mt-8 mx-auto max-w-[680px] font-body text-[16px] text-ink-muted" style={{ lineHeight: 1.8 }}>
            Every recording is encrypted in transit. You control what is stored. Reply &lsquo;DELETE&rsquo; at any time and every recording, transcript, and story is permanently erased within 24 hours. We are GDPR-compliant by design, incorporated in the Netherlands. While we use WhatsApp as a delivery channel for convenience, all story data is stored on our own servers in the EU, not on Meta&rsquo;s infrastructure.
          </p>
        </FadeUp>

        <FadeUp delay={200}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3 font-body text-[13px]">
            {badges.map(({ Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 border border-divider rounded-md px-3.5 py-2 text-ink font-medium bg-paper"
              >
                <Icon className="w-4 h-4 text-teal" strokeWidth={1.75} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
};
