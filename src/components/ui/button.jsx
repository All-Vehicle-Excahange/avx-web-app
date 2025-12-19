import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export default function Button({
  children,
  variant = "default",
  size = "md",
  full = false,
  showIcon = true,
  className = "",
  ...props
}) {
  const isRounded = variant === "roundedOutline";
  const isOutline = variant === "outline";

  // === Base Styles === //
  const base =
    "inline-flex items-center justify-center font-medium select-none transition-all hover:cursor-pointer relative z-10 group overflow-hidden";

  // === Variant Styles === //
  const variants = {
    default: "bg-secondary text-primary hover:opacity-80 rounded-xl",

    ghost: "bg-primary text-secondary hover:bg-third rounded-xl",

    // === OUTLINE VARIANT === //
    outline: cn(
      "text-third transition-colors duration-300",
      "rounded-full border border-third hover:border-none", // Google AI style usually looks best with full rounded corners
      "hover:text-white" // Text turns white to pop against the dark inner mask
    ),

    outlineSecondary:
      "border border-third text-primary hover:bg-third rounded-xl trasition-all duration-300",

    roundedOutline:
      "border border-third text-primary hover:bg-primary hover:text-secondary rounded-full flex items-center justify-center h-10 w-10",
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
        !isRounded && sizes[size],
        full && !isRounded && "w-full",
        className
      )}
    >
      {/* === GOOGLE AI ANIMATION LOGIC === */}
      {isOutline && (
        <>
          {/* 2. SPINNING GRADIENT (The "Google AI" moving border) */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000%] h-[1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* 3. INNER MASK (Creates the 'Border' thickness) */}
          <span className="absolute inset-0.5 rounded-full bg-[#171618] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </>
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center">
        {children}
        {showIcon && !isRounded && (
          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        )}
      </span>
    </button>
  );
}
