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
    `flex items-center justify-center cursor-pointer text-sm font-medium transition select-none whitespace-nowrap overflow-hidden rounded-lg gap-2 ${
      logo ? "pl-2 pr-4 py-1.5" : "px-4 py-1.5"
    } ${className}`;

  const styles = {
    // OUTLINE (light background use-case)
    outline: selected
      ? "bg-primary text-secondary border border-third"
      : "border border-third text-primary bg-transparent hover:bg-third/10",

    // OUTLINE DARK (mobile / dark background)
    outlineDark: selected
      ? "bg-secondary text-primary border border-third"
      : "border border-third text-secondary bg-transparent hover:bg-third/10",

    // PRIMARY
    primary: selected
      ? "bg-primary text-white border border-primary"
      : "bg-primary/10 text-primary border border-primary/40 hover:bg-primary/20",
  };

  return (
    <div className={`${base} ${styles[variant]}`} onClick={onClick}>
      {logo && (
        <img
          src={logo}
          alt={label}
          className="w-8 h-5 object-contain flex-shrink-0 bg-white rounded-sm p-0.5"
        />
      )}
      <span>{label}</span>
    </div>
  );
}
