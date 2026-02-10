import Image from "next/image";

export default function WhyBuyHere() {
  const images = ["/about2.png", "/whowe.png", "/about4.png"];

  return (
    <section className="rounded-2xl container   p-6 space-y-8">
      {images.map((src, index) => (
        <div key={index} className="relative w-full overflow-hidden rounded-xl">
          <Image
            src={src}
            alt={`about-${index}`}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </section>
  );
}
