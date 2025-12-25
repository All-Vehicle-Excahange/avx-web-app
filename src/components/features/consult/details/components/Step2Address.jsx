import InputField from "@/components/ui/inputField";

export default function Step2Address() {
  return (
    <div className="space-y-6">
      <InputField label="Address" variant="colored" />
      <InputField label="City" variant="colored" />
      <InputField label="State" variant="colored" />
      <InputField label="Country" variant="colored" />
    </div>
  );
}
