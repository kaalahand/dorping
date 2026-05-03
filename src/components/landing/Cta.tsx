import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 font-body font-medium text-[15px] leading-none rounded-md transition-colors duration-[180ms] ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper min-h-[44px] px-7 py-[14px]";

const variants = {
  primary: "bg-teal text-paper hover:bg-teal-hover",
  secondary:
    "bg-transparent border-[1.5px] border-teal text-teal hover:bg-teal hover:text-paper",
  inverse: "bg-paper text-teal hover:bg-surface-1",
} as const;

type Variant = keyof typeof variants;

interface CommonProps {
  variant?: Variant;
  className?: string;
}

export function CtaButton({
  variant = "primary",
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}

export function CtaLink({
  variant = "primary",
  className = "",
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}

export const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <span
    className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${className}`}
    style={{ backgroundColor: "#25D366" }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 24 24" width="15" height="15" fill="white">
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.64 6L0 24l6.18-1.62A11.95 11.95 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.67.96.98-3.58-.23-.37A9.92 9.92 0 1 1 22 12c0 5.52-4.48 10-10 10zm5.5-7.46c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.34z"/>
    </svg>
  </span>
);
