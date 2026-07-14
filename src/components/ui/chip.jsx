"use client";

export default function Chip({
  label,
  selected,
  onClick,
  variant = "outline",
  logo,
}) {
  const base =
    "flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition select-none whitespace-nowrap";

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
        <img
          src={logo}
          alt={label}
          className="w-5 h-5 object-contain rounded bg-white p-0.5 shrink-0"
        />
      )}
      <span>{label}</span>
    </div>
  );
}
