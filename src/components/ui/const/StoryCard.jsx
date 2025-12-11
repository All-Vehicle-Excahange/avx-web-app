import Image from "next/image";

export default function StoryCard({ image, title, description }) {
  return (
    <div className="relative w-full h-full aspect-3/4 rounded-2xl overflow-hidden group cursor-pointer border border-gray-100">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay - Crucial for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-90" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center flex flex-col items-center">
        <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight mb-1">
          {title}
        </h3>
        <p className="text-gray-300 text-sm font-medium">{description}</p>
      </div>
    </div>
  );
}
