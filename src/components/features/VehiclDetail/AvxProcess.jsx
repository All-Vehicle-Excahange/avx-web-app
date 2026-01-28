import Image from "next/image";
import React from "react";

export default function AvxProcess() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-3xl font-bold text-primary">AVX Process</h2>
      </div>

      {/* Image Wrapper */}
      <div className="relative w-full  aspect-16/5">
        <Image
          src="/avx_procsees.jpeg"
          alt="AVX Process"
          fill
          className="object-fill"
          priority
        />
      </div>
    </div>
  );
}
