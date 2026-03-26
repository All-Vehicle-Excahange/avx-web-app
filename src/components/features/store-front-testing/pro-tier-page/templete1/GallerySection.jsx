"use client";

function GallerySection() {
  const galleryImages = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <section className="w-full py-12 ">
      <div className="containermax-w-7xl px-4 flex flex-col gap-10">
        
        {/* ── HEADER (CSS UNCHANGED) ── */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Gallery
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Our Showroom & <span className="text-fourth/80">Team</span>
          </h2>
        </div>

        {/* ── UNIQUE ARCHITECTURAL GRID ── */}
        <div className="flex flex-col md:grid md:grid-cols-12 md:grid-rows-2 gap-3 h-auto md:h-[600px]">
          
          {/* Image 1: The Tall Vertical Anchor (Left) */}
          <div className="md:col-span-3 md:row-span-2 group relative overflow-hidden rounded-2xl border border-third/10">
            <img
              src={galleryImages[0]}
              alt="Showroom Vertical"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Image 2: The Main Landscape Feature (Top Right) */}
          <div className="md:col-span-9 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
            <img
              src={galleryImages[1]}
              alt="Main Showroom"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Image 3: Detail Shot (Bottom Middle) */}
          <div className="md:col-span-5 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
            <img
              src={galleryImages[2]}
              alt="Team Detail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Image 4: The Wide End Cap (Bottom Right) */}
          <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
            <img
              src={galleryImages[3]}
              alt="Interior View"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
             <div className="absolute inset-0 bg-fourth/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>

        </div>
      </div>
    </section>
  );
}

export default GallerySection;