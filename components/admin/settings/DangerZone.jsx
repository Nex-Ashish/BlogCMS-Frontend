export default function DangerZone() {
  return (
    <div className="border border-red-500/30 p-5 rounded-xl">
      <h2 className="text-red-400 mb-2">Danger Zone</h2>
      <p className="text-sm text-gray-400 mb-4">
        This will permanently delete your Account.
      </p>

      <button className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700">
        Delete My Account
      </button>
    </div>
  );
}