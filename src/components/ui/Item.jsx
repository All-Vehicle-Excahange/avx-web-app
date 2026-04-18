import Link from "next/link";

export default function Item({ icon, label, value, href, className = "" }) {
  const content = (
    <>
      <div className="mt-1 text-primary">{icon}</div>
      <div>
        <p className="text-third text-xs">{label}</p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`flex items-start gap-3 ${className}`}>
        {content}
      </Link>
    );
  }

  return <div className={`flex items-start gap-3 ${className}`}>{content}</div>;
}
