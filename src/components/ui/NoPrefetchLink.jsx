import Link from "next/link";

/**
 * Uses Next.js standard Link with prefetch={false}.
 * This avoids fetching all links on viewport entry, but STILL fetches on hover.
 * This restores the "fast navigation" feel when clicking, since it prefetches the moment the user hovers over the button.
 */
export default function NoPrefetchLink({
  href,
  children,
  onClick,
  target,
  replace = false,
  scroll = true,
  ...props
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={target}
      replace={replace}
      scroll={scroll}
      prefetch={false}
      {...props}
    >
      {children}
    </Link>
  );
}
