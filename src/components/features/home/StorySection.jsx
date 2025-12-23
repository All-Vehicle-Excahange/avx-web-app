import Button from "@/components/ui/button";
import StoryCard from "@/components/ui/const/StoryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function StorySection() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
          <Button variant="roundedOutline" onClick={() => scroll("left")}>
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button variant="roundedOutline" onClick={() => scroll("right")}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stories Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="shrink-0 w-[85%] sm:w-[45%] lg:w-[calc(25%-12px)] snap-start"
          >
            <StoryCard
              title={story.title}
              description={story.description}
              image={story.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
