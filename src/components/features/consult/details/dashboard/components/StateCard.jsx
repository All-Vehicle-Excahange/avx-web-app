export default function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-third/30 bg-secondary p-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs text-third">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
