import { useRouter } from "next/router";

/**
 * Pages Router next/link still prefetches on hover when prefetch={false}.
 * Use a real <a> + router.push so VDP/storefront cards never fire /_next/data on hover.
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
  const router = useRouter();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (target === "_blank") return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    if (replace) {
      router.replace(href, undefined, { scroll });
    } else {
      router.push(href, undefined, { scroll });
    }
  };

  return (
    <a href={href} target={target} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
