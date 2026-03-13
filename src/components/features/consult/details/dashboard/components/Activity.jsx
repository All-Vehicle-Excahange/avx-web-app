export default function Activity({ text, time }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-third/30  p-3 text-sm">
      <span>{text}</span>
      <span className="text-third text-xs">{time}</span>
    </div>
  );
}
