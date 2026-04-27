import SectionCard from "@/components/admin/settings/SectionCard";
import InputField from "@/components/admin/settings/InputField";

export default function Social() {
  return (
    <SectionCard title="Social Links">
      <InputField placeholder="Instagram URL" />
      <InputField placeholder="Twitter URL" />
      <InputField placeholder="LinkedIn URL" />
    </SectionCard>
  );
}