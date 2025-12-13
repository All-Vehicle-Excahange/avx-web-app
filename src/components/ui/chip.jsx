"use client";

export default function Chip({
  label,
  selected,
  onClick,
  variant = "outline",
}) {
  const base =
    "px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition select-none whitespace-nowrap";

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
      {label}
    </div>
  );
}
