import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800",
  secondary: "bg-white text-ink-900 border border-line-strong hover:border-brand-600 hover:text-brand-600",
  ghost: "text-brand-600 hover:bg-brand-50",
  inverse: "bg-white text-brand-700 hover:bg-brand-50",
};

const SIZES = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-12 px-5 text-[15px] gap-2",
};

/**
 * Site-wide button. Renders a <Link> when `to` is set, an <a> when `href` is set,
 * otherwise a <button>. Icons are passed as children.
 */
export function Button({ variant = "primary", size = "md", block = false, to, href, className = "", children, ...props }) {
  const classes = [
    "inline-flex items-center justify-center rounded-lg font-semibold whitespace-nowrap transition-colors",
    "disabled:opacity-50 disabled:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0",
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    block ? "w-full" : "",
    className,
  ].join(" ");

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{children}</a>;
  return <button type="button" className={classes} {...props}>{children}</button>;
}

export default Button;
