export default function Task({ label, progress }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-third/30 bg-secondary p-4">
      <span className="text-sm">{label}</span>
      <span className="text-xs text-third">{progress}</span>
    </div>
  );
}
