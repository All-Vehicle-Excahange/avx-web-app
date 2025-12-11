export default function CategoryTab({ icon, label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
        transition-all whitespace-nowrap
        ${
          active
            ? "text-white underline underline-offset-8"
            : "text-white/70 hover:text-white"
        }
      `}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>

      {/* Count Badge */}
      <span
        className="
          bg-white/40 text-primary
          px-2 py-0.5
          rounded-full
          text-xs font-semibold
        "
      >
        {count}
      </span>
    </button>
  );
}
