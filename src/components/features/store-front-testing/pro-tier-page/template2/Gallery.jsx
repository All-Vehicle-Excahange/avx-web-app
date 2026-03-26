// "use client";

// import { motion } from "framer-motion";

// const data = {
//   galleryTitle: "Our Showroom & Team",
//   galleryImages: [
//     "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
//     "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
//     "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    // "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a ",
    // " https://images.unsplash.com/photo-1550355291-bbee04a92027",
//   ],
// };

// export default function Gallery() {
//   return (
//     <section className="py-12 lg:py-12">
//       <div className="px-5">

//         {/* HEADER */}
//         <div className="mb-10">
//           <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
//             Gallery
//           </p>

//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
//             Our Showroom <span className="text-fourth/80">& Team</span>
//           </h2>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//           {/* BIG IMAGE */}
//           <motion.div
//             className="lg:col-span-2 row-span-2 h-[300px] lg:h-full rounded-2xl overflow-hidden"
//             initial={{ opacity: 0, scale: 0.96 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             <img
//               src={data.galleryImages[0]}
//               className="w-full h-full object-cover hover:scale-105 transition duration-700"
//             />
//           </motion.div>

//           {/* SMALL IMAGES */}
//           {data.galleryImages.slice(1, 5).map((img, i) => (
//             <motion.div
//               key={i}
//               className="h-[140px] rounded-xl overflow-hidden"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//             >
//               <img
//                 src={img}
//                 className="w-full h-full object-cover hover:scale-105 transition duration-500"
//               />
//             </motion.div>
//           ))}

//         </div>

//       </div>
//     </section>
//   );
// }



"use client";

import { motion } from "framer-motion";

const data = {
  galleryTitle: "Our Showroom & Team",
  galleryImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a ",
    " https://images.unsplash.com/photo-1550355291-bbee04a92027",
  ],
};

export default function Gallery() {
  return (
    <section className="py-12 lg:py-12">
      <div className="px-5">

        {/* HEADER */}
        <div className="flex flex-col gap-3 mb-10">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Gallery
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
            Our Showroom <span className="text-fourth/80">& Team</span>
          </h2>
        </div>

        {/* MASONRY GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[120px]">

          {/* BIG LEFT */}
          <motion.div
            className="col-span-2 row-span-2 rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <img src={data.galleryImages[0]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
          </motion.div>

          {/* TOP RIGHT */}
          <motion.div className="col-span-1 row-span-1 rounded-xl overflow-hidden">
            <img src={data.galleryImages[1]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
          </motion.div>

          {/* TALL RIGHT */}
          <motion.div className="col-span-1 row-span-2 rounded-xl overflow-hidden">
            <img src={data.galleryImages[2]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
          </motion.div>

          {/* BOTTOM LEFT */}
          <motion.div className="col-span-1 row-span-1 rounded-xl overflow-hidden">
            <img src={data.galleryImages[3]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}