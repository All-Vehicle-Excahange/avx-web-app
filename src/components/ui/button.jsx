import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export default function Button({
  children,
  variant = "default",
  full = false,
  size = "md",
  showIcon = true,
  className = "",
  ...props
}) {
  // === Base Styles === //
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all select-none";

  // === Variant Styles === //
  const variants = {
    default: "bg-secondary text-primary hover:opacity-80",
    ghost: "bg-primary text-secondary hover:bg-third",
    outline:
      "border border-third text-primary hover:bg-primary hover:text-secondary",
    outlineSecondary:
      "border border-third text-secondary hover:bg-third hover:text-secondary",
  };

  // === Size Styles === //
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      {...props}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        full ? "w-full" : "w-auto",
        className
      )}
    >
      {children}
      {showIcon && <ArrowUpRight className="ml-2 h-4 w-4" />}
    </button>
  );
}
