import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { X, Upload, Image as LucideImage, Lock } from "lucide-react";
import {
  checkIsEligibleToUpload,
  getThemeImages,
} from "@/services/theme.service";

export default function MediaPickerModal({ open, onClose, onSelect, type }) {
  const [tab, setTab] = useState("library");
  const [images, setImages] = useState([]);
  const [isEligibleToUpload, setIsEligibleToUpload] = useState(false);

  //  Call api with type to get images in useEffect

  useEffect(() => {
    if (!open || tab !== "library") return;

    const fetchImages = async () => {
      try {
        const data = await getThemeImages(type);
        setImages(data.data || []);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImages();
  }, [open, tab, type]);

  useEffect(() => {
    if (!open || tab !== "upload") return;

    const check = async () => {
      try {
        const res = await checkIsEligibleToUpload();
        setIsEligibleToUpload(res.data);
      } catch (err) {
        console.error("Eligibility check failed", err);
        setIsEligibleToUpload(false);
      }
    };

    check();
  }, [open, tab, type]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BLUR */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-6xl bg-secondary rounded-3xl border border-primary p-10 z-10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-third hover:text-primary"
        >
          <X />
        </button>

        {/* TABS */}
        <div className="flex gap-6 mb-8 border-b border-third/20 pb-3">
          {["library", "upload"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`uppercase text-sm font-bold tracking-widest pb-2 border-b-2 transition ${
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-third hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        {tab === "library" && (
          <div className="grid grid-cols-4 gap-6">
            {images.length === 0 && (
              <p className="text-center text-third col-span-4">
                No images found in library.
              </p>
            )}
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => img.isEligible && onSelect(img)}
                className={`relative h-44 rounded-2xl overflow-hidden border transition group
             ${
               img.isEligible
                 ? "border-third/30 hover:border-primary cursor-pointer"
                 : "border-dashed border-yellow-400 opacity-70 cursor-not-allowed"
             }`}
              >
                <NextImage
                  src={img.imageUrl}
                  alt="Media"
                  fill
                  className={`object-cover transition ${
                    img.isEligible ? "group-hover:scale-105" : "grayscale"
                  }`}
                />

                {!img.isEligible && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-2 text-primary-400">
                      <Lock className="w-6 h-6" />
                      <span className="text-xs uppercase tracking-widest font-bold">
                        Locked
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "upload" && (
          <div className="relative">
            {/* LOCK OVERLAY */}
            {!isEligibleToUpload && (
              <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center rounded-3xl">
                <div className="flex flex-col items-center gap-2 text-primary-400">
                  <Lock className="w-8 h-8" />
                  <span className="text-xs uppercase tracking-widest font-bold">
                    Upgrade to unlock uploads
                  </span>
                </div>
              </div>
            )}

            {/* REAL UPLOAD ZONE */}
            <label
              className={`relative block border-2 border-dashed rounded-3xl p-20 text-center transition
        ${
          isEligibleToUpload
            ? "border-primary cursor-pointer hover:bg-primary/10"
            : "border-primary-400 opacity-40 cursor-not-allowed"
        }`}
            >
              <div className="flex flex-col items-center justify-center gap-4 text-primary">
                <div className="w-16 h-16 bg-primary text-secondary rounded-2xl flex items-center justify-center">
                  <LucideImage className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold">Drag & Drop Image</h3>
                <p className="text-third text-sm">
                  or click to select from device
                </p>
              </div>

              <input
                type="file"
                className="hidden"
                accept="image/*"
                disabled={!isEligibleToUpload}
                onChange={(e) => {
                  if (!isEligibleToUpload) return;
                  const file = e.target.files[0];
                  if (file) onSelect(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
