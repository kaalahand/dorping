import { CtaLink, WhatsAppIcon } from "./Cta";
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
      <div className="container-prose">
        <FadeUp>
          <h2
            className="font-display font-semibold text-ink max-w-[720px]"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.3 }}
          >
            Your parent&rsquo;s stories are private. We built every layer to keep them that way.
          </h2>
        </FadeUp>

        <FadeUp delay={120}>
          <ul className="mt-8 max-w-[680px] space-y-4 font-body text-[16px] text-ink-muted" style={{ lineHeight: 1.8 }}>
            <li className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-teal mt-[5px] shrink-0" strokeWidth={1.75} aria-hidden />
              <span>Encrypted in transit and at rest. Your parent&rsquo;s voice never travels unprotected.</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-teal mt-[5px] shrink-0" strokeWidth={1.75} aria-hidden />
              <span>EU-hosted servers only. Your data never leaves Europe.</span>
            </li>
            <li className="flex items-start gap-3">
              <Trash2 className="w-4 h-4 text-teal mt-[5px] shrink-0" strokeWidth={1.75} aria-hidden />
              <span>You control deletion. Reply &lsquo;DELETE&rsquo; on WhatsApp and every recording, transcript, and story is permanently erased within 24 hours.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-teal mt-[5px] shrink-0" strokeWidth={1.75} aria-hidden />
              <span>GDPR-compliant by design. Incorporated in the Netherlands.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-teal mt-[5px] shrink-0" strokeWidth={1.75} aria-hidden />
              <span>WhatsApp is only the delivery channel. All story data lives on our servers, not Meta&rsquo;s infrastructure.</span>
            </li>
          </ul>
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

        <FadeUp delay={280}>
          <div className="mt-10 flex justify-center">
            <CtaLink href="https://wa.me/+31630071724?text=Hi%2C%20I%20want%20to%20preserve%20my%20parent%27s%20stories" target="_blank" rel="noopener noreferrer" variant="primary">
              <WhatsAppIcon /> Start Your Free Family Story Now
            </CtaLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
