"use client";

export default function Chip({
  label,
  selected,
  onClick,
  variant = "outline",
  logo,
  className = "",
}) {
  const base =
    `flex items-center justify-center cursor-pointer text-sm font-medium transition select-none whitespace-nowrap overflow-hidden rounded-xl ${logo ? "pr-4" : "px-4 py-1.5 gap-2"
    } ${className}`;

  const styles = {
    // OUTLINE (light background use-case)
    outline: selected
      ? "bg-primary text-secondary border border-third"
      : "border border-third text-primary bg-transparent hover:bg-primary hover:text-secondary",

    // OUTLINE DARK (mobile / dark background)
    outlineDark: selected
      ? "bg-secondary text-primary border border-third"
      : "border border-third text-secondary bg-transparent hover:bg-primary hover:text-secondary",

    // PRIMARY
    primary: selected
      ? "bg-primary text-white border border-primary"
      : "bg-primary/10 text-primary border border-primary/40 hover:bg-primary/20",
  };

  return (
    <div className={`${base} ${styles[variant]}`} onClick={onClick}>
      {logo && (
        <div className="bg-white flex items-center justify-center self-stretch px-2 mr-3 border-r border-white/10">
          <img
            src={logo}
            alt={label}
            className="w-5 h-5 object-contain"
          />
        </div>
      )}
      <span className={logo ? "py-2" : ""}>{label}</span>
    </div>
  );
}
