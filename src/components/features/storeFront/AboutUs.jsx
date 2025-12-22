import Image from "next/image";

export default function AboutUs() {
  const images = [
    "/aboutMain.png",
    "/about2.png",
    "/about3.png",
    "/about4.png",
  ];

  return (
    <section className="w-full 3xl:container rounded-2xl  bg-secondary p-6 space-y-8">
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
