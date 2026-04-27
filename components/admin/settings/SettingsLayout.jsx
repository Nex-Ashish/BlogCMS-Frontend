export default function SettingsLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0b040d] text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <button className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700">
          Save Changes
        </button>
      </div>

      {children}
    </div>
  );
}