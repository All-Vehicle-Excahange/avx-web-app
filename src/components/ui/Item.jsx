import Link from "next/link";

export default function Item({ icon, label, value, href }) {
  return (
    <Link href={href} className="flex items-start gap-3">
      <div className="mt-1 text-primary">{icon}</div>
      <div>
        <p className="text-third text-xs">{label}</p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </Link>
  );
}
