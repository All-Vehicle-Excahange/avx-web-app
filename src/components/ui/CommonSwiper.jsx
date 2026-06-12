"use no memo";
"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const CommonSwiper = ({ data, CardComponent, prevRef, nextRef }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (!swiperInstance) return;

    const prevEl = prevRef?.current;
    const nextEl = nextRef?.current;

    if (prevEl && nextEl) {
      const handlePrev = () => swiperInstance.slidePrev();
      const handleNext = () => swiperInstance.slideNext();

      prevEl.addEventListener("click", handlePrev);
      nextEl.addEventListener("click", handleNext);

      return () => {
        prevEl.removeEventListener("click", handlePrev);
        nextEl.removeEventListener("click", handleNext);
      };
    }
  }, [swiperInstance, prevRef, nextRef]);

  return (
    <Swiper
      modules={[FreeMode]}
      spaceBetween={16}
      grabCursor
      freeMode
      slidesPerView={"auto"}
      onSwiper={setSwiperInstance}
    >
      {data.map((item) => (
        <SwiperSlide key={item.id} className="w-[340px]!">
          <CardComponent data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CommonSwiper;