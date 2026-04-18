import Link from "next/link";
import { ArrowUpRight, Lock, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export default function Button({
  children,
  href,
  variant = "default",
  size = "md",
  full = false,
  showIcon = false,
  locked = false,
  loading = false,
  className = "",
  ...props
}) {
  const isRounded = variant === "roundedOutline";
  const isOutline = variant === "outline";
  const isOutlineAnimated = variant === "outlineAnimated";

  const isLocked = locked || loading;

  const base = cn(
    "inline-flex items-center justify-center font-medium select-none transition-all relative z-10 group overflow-hidden",
    isLocked ? "cursor-not-allowed opacity-70" : "hover:cursor-pointer"
  );

  const variants = {
    default: cn(
      "bg-secondary border border-secondary text-primary rounded-full",
      !isLocked && "hover:bg-transparent hover:text-secondary hover:border-secondary hover:border"
    ),
    ghost: cn(
      "bg-primary border border-primary text-secondary rounded-full",
      !isLocked && "hover:bg-third hover:bg-transparent hover:text-primary"
    ),

    outline: cn(
      "text-third rounded-full border border-third",
      "transition-all duration-300",
      "hover:text-white",
      !isLocked && "hover:text-white",
      isLocked && "opacity-50 cursor-not-allowed pointer-events-none"
    ),

    outlineAnimated: cn(
      "text-white rounded-full border border-third",
      "relative overflow-hidden"
    ),

    outlineSecondary: cn(
      "border border-third text-primary rounded-full transition-all duration-300",
      !isLocked && "hover:bg-primary hover:text-secondary"
    ),
    roundedOutline: cn(
      "border border-third text-primary rounded-full flex items-center justify-center h-10 w-10",
      !isLocked && "hover:bg-primary hover:text-secondary"
    ),
  };

  const sizes = {
    xs: "px-1 py-1 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = cn(
    base,
    variants[variant],
    !isRounded && sizes[size],
    full && !isRounded && "w-full",
    className
  );

  const Content = (
    <>
      {(isOutline || isOutlineAnimated) && (
        <>
          {/* Spinning Gradient */}
          <span
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[1000%] h-[1000%]",
              "animate-[spin_4s_linear_infinite]",
              "bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#c0c0c0_25%,#007bff_50%,#c0c0c0_75%,#ffffff_100%)]",
              isOutline
                ? "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                : "opacity-100"
            )}
          />

          {/* Inner Mask */}
          <span
            className={cn(
              "absolute inset-0.5 rounded-full bg-[#141414]",
              isOutline
                ? "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                : "opacity-100"
            )}
          />
        </>
      )}

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center z-20">
          <Loader2 className="w-4 h-4 animate-spin" />
        </span>
      )}

      <span className={cn("relative z-10 flex items-center", loading && "opacity-0")}>
        {children}
        {showIcon && !isRounded && !isLocked && (
          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        )}
      </span>
    </>
  );

  // If href exists → Link
  if (href && !isLocked) {
    return (
      <Link href={href} scroll={true} className={classes}>
        {Content}
      </Link>
    );
  }

  // Default → Button
  return (
    <button {...props} className={classes} disabled={isLocked}>
      {Content}
    </button>
  );
}

