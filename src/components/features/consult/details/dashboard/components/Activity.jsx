export default function Activity({ text, time }) {
  return (
    <div className="flex items-center justify-between bg-secondary/50 rounded-xl p-3 text-sm">
      <span>{text}</span>
      <span className="text-third text-xs">{time}</span>
    </div>
  );
}
