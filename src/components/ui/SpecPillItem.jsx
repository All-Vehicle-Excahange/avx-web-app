export default function SpecPillItem({ icon, label, value }) {
  return (
    <div className="relative flex items-center justify-between gap-4  border border-white/15 rounded-2xl  px-5 py-3 text-sm backdrop-blur">
      {/* LEFT: ICON + LABEL */}
      <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <span className="text-sm text-primary">{label}</span>
      </div>

      {/* RIGHT: VALUE */}
      <span className="text-sm font-medium text-third">{value}</span>
    </div>
  );
}
