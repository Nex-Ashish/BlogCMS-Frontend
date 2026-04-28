"use client";

import SettingsLayout from "../../../../../components/admin/settings/SettingsLayout";
import Danger from "./danger";
import General from "./general";
import Social from "./social";

export default function SettingsPage() {
  return (
    <SettingsLayout>
      <div className="grid md:grid-cols-2 gap-6">
        <General />
        <Social />
      </div>

      <div className="mt-6">
        <Danger />
      </div>
    </SettingsLayout>
  );
}