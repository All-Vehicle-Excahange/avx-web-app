"use client";

export default function Chip({
  label,
  selected,
  onClick,
  variant = "outline",
}) {
  const base =
    "px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition select-none";

  const styles = {
    // OUTLINE — FULLY TRANSPARENT WHEN NOT SELECTED
    outline: selected
      ? "bg-primary text-secondary border border-third"
      : "border border-third text-primary bg-transparent hover:bg-primary hover:text-secondary",

    // PRIMARY variant stays unchanged
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
