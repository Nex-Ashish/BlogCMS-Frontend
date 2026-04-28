import InputField from "../../../../../components/admin/settings/InputField";
import SectionCard from "../../../../../components/admin/settings/SectionCard";

export default function Social() {
  return (
    <SectionCard title="Social Links">
      <InputField placeholder="Instagram URL" />
      <InputField placeholder="Twitter URL" />
      <InputField placeholder="LinkedIn URL" />
    </SectionCard>
  );
}