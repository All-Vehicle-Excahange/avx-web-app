import React, { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import MediaPickerModal from "./MediaPickerModal";

export const ImageUploader = ({ label, src, onChange, sizeText = "Image" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-1 w-full h-full">
        {label && (
          <label className="text-xs font-bold uppercase text-third">
            {label}
          </label>
        )}

        <div
          onClick={() => setOpen(true)}
          className="flex-1 min-h-40 border-2 border-dashed border-third/40 bg-secondary rounded-xl cursor-pointer hover:border-primary transition relative overflow-hidden group"
        >
          {src ? (
            <>
              <Image
                src={src}
                alt="Selected"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="text-secondary font-semibold text-sm">
                  Change Image
                </span>
              </div>
            </>
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center text-center p-4">
              <div className="mb-2 w-12 h-12 bg-primary text-secondary rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-primary font-bold text-lg">{sizeText}</p>
              <p className="text-third text-xs">Click to choose image</p>
            </div>
          )}
        </div>
      </div>

      <MediaPickerModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(img) => {
          onChange(img);
          setOpen(false);
        }}
      />
    </>
  );
};
