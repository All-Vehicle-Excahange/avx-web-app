"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";

const CommonSwiper = ({ data, CardComponent, prevRef, nextRef }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;

    if (prevRef?.current && nextRef?.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;

      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [prevRef, nextRef]);

  return (
    <Swiper
      modules={[Navigation, FreeMode]}
      spaceBetween={16}
      grabCursor
      freeMode
      slidesPerView={"auto"}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
    >
      {data.map((item) => (
        <SwiperSlide key={item.id} className="!w-[340px]">
          <CardComponent data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CommonSwiper;