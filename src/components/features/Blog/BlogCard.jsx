import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";

function BlogCard({ post }) {
  const router = useRouter();

  if (!post) return null;

  const handleCardClick = () => {
    router.push(post.slug || `/blog/${post.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative w-full h-full rounded-2xl overflow-hidden bg-transparent border-2 border-third/20 transition-all duration-300 flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] cursor-pointer p-4 sm:p-5"
    >
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Wrap top section in group to isolate hover effects from footer button */}
        <div className="group flex flex-col flex-1">
          {/* Cover Image */}
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl shrink-0">
            <Image
              src={post.image || "/car-showroom.avif"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-103"
            />
          </div>

          {/* Card Body */}
          <div className="pt-5 flex flex-col gap-4">
            <div className="space-y-2">
              {/* Category Tag */}
              <span className="text-xs font-semibold uppercase tracking-wider text-fourth block">
                {post.category}
              </span>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold font-primary text-primary leading-snug hover:text-fourth transition-colors">
                {post.title}
              </h3>
            </div>

            {/* Excerpt */}
            <p className="text-xs sm:text-sm text-third/80 font-secondary leading-relaxed line-clamp-3">
              {post.description}
            </p>
          </div>
        </div>

        {/* Card Footer (View Blog Button) */}
        <div className="pt-5 mt-auto w-full">
          <Button
            variant="ghost"
            size="sm"
            full={true}
            className="text-xs tracking-wider font-semibold w-full"
          >
            View Blog
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
