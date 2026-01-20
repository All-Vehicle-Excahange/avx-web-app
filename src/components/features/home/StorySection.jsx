import Button from "@/components/ui/button";
import StoryCard from "@/components/ui/const/StoryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

export default function StorySection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const stories = [
    {
      id: 1,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 5,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 6,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 7,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 8,
      title: "Mahesh Patel",
      description: "bookings all in one place",
      image:
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section>
      {/* Header & Nav */}
      <div className="flex flex-row justify-between items-start mb-6">
        {/* Title */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-primary leading-tight">
            <span className="text-third">Monthly</span> Top Stories From Our
            Users
          </h2>
        </div>

        {/* Nav Buttons */}
        <div className="flex gap-3 mt-2">
          <Button variant="roundedOutline" ref={prevRef}>
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button variant="roundedOutline" ref={nextRef}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stories Scroll Container */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        grabCursor={true}
        slidesPerView={1}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 5 },
        }}
        className="lg:col-span-5"
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id}>
            <StoryCard
              title={story.title}
              description={story.description}
              image={story.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
