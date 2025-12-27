import Button from "@/components/ui/button";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import InputField from "@/components/ui/inputField";
import { X, ImageIcon, FileText } from "lucide-react";

export default function StorefrontEditor({ data, setData, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-secondary rounded-2xl border border-third/30 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-third/30 bg-secondary sticky top-0 z-10">
          <h2 className="text-lg font-semibold">Edit Storefront</h2>
          <button onClick={onClose} className="hover:text-primary transition">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-10">
          {/* BASIC INFO */}
          <section className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText size={16} /> Basic Information
            </h3>
            <InputField
              variant="colored"
              label="Business Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <InputField
              variant="colored"
              label="City"
              value={data.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
            />
            <InputField
              variant="colored"
              multiline
              rows={4}
              label="Description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </section>

          {/* BRANDING */}
          <section className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <ImageIcon size={16} /> Branding
            </h3>
            <DropzoneUpload label="Banner Image" />
            <DropzoneUpload label="Logo Image" />
          </section>

          {/* ABOUT */}
          <section className="space-y-4">
            <h3 className="font-semibold">About Us</h3>
            <InputField
              multiline
              rows={4}
              variant="colored"
              value={data.about}
              onChange={(e) => setData({ ...data, about: e.target.value })}
            />
            <DropzoneUpload label="About Image" />
          </section>

          {/* WHY */}
          <section className="space-y-4">
            <h3 className="font-semibold">Why Choose Us</h3>
            <InputField
              multiline
              rows={4}
              variant="colored"
              value={data.why}
              onChange={(e) => setData({ ...data, why: e.target.value })}
            />
            <DropzoneUpload label="Why Image" />
          </section>

          {/* MISSION */}
          <section className="space-y-4">
            <h3 className="font-semibold">Mission</h3>
            <InputField
              multiline
              rows={4}
              variant="colored"
              value={data.mission}
              onChange={(e) => setData({ ...data, mission: e.target.value })}
            />
            <DropzoneUpload label="Mission Image" />
          </section>

          {/* VISION */}
          <section className="space-y-4">
            <h3 className="font-semibold">Vision</h3>
            <InputField
              multiline
              rows={4}
              variant="colored"
              value={data.vision}
              onChange={(e) => setData({ ...data, vision: e.target.value })}
            />
            <DropzoneUpload label="Vision Image" />
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-third/30 bg-secondary sticky bottom-0">
          <Button variant="outlineSecondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
