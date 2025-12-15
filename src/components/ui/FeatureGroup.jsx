import { Check } from "lucide-react";

export default function FeatureGroup({ title, items }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-third tracking-wide">
        {title}
      </h4>

      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm">
            <Check size={14} className="text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
