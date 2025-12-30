export default function DrawerSection({ title, children }) {
  return (
    <div>
      <p className="text-xs text-third mb-3">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
