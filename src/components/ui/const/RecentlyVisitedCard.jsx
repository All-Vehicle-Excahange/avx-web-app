import Image from "next/image";
import { useRouter } from "next/router";

export default function RecentlyVisitedCard({ data }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/vehicle/details/${data.id}`)}
      className="
        cursor-pointer
        min-w-[150px] max-w-[150px]
        bg-white
        border border-gray-200
        rounded-lg
        p-2
        hover:shadow-sm
        transition
      "
    >
      {/* IMAGE */}
      <div className="relative h-32 w-full mb-2">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-contain"
        />
      </div>

      {/* TITLE */}
      <p className="text-xs text-gray-800 line-clamp-2">
        {data.title}
      </p>

      {/* PRICE */}
      <p className="mt-1 text-sm font-semibold text-gray-900">
        ₹{data.price}
      </p>
    </div>
  );
}
