import { Image, ImageIcon } from "lucide-react";
import React from "react";

export const ImageUploader = ({ label, src, onChange, sizeText = "Image" }) => {
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      {label && (
        <label className="text-xs font-bold uppercase text-third">
          {label}
        </label>
      )}

      <label className="flex-1 min-h-37.5 border-2 border-dashed border-third/40 bg-secondary rounded flex flex-col items-center justify-center cursor-pointer hover:border-primary transition relative overflow-hidden group">
        {src ? (
          <Image
            src={src}
            fill
            className="w-full h-full object-cover"
            alt="Uploaded"
          />
        ) : (
          <div className="text-center p-4">
            <div className="mb-2 mx-auto w-10 h-10 bg-primary text-secondary rounded flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
            <p className="text-primary font-bold text-lg">{sizeText}</p>
            <p className="text-third text-xs">Click to add image</p>
          </div>
        )}

        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) onChange(URL.createObjectURL(file));
          }}
        />
      </label>
    </div>
  );
};
