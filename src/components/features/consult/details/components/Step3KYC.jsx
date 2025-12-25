import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";

export default function Step3KYC() {
  return (
    <div className="space-y-6">
      <InputField label="GST Number" variant="colored" />
      <InputField label="PAN Card Number" variant="colored" />

      <DropzoneUpload label="PAN Card Photo" />

      <InputField label="Aadhar Card Number" variant="colored" />

      <DropzoneUpload label="Aadhar Front Photo" />
      <DropzoneUpload label="Aadhar Back Photo" />
    </div>
  );
}
