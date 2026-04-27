import SectionCard from "@/components/admin/settings/SectionCard";
import InputField from "@/components/admin/settings/InputField";

export default function General() {
  return (
    <SectionCard title="Basic Site Settings">
      <InputField placeholder="Site Title" />
      <InputField placeholder="Tagline" />
      <InputField placeholder="Admin Email" />

    </SectionCard>
  );
}