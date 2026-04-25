export default function Loading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 gap-3">
            <div className="w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-500 animate-spin" />
            <p className="text-sm text-slate-400 font-medium">Loading...</p>
        </div>
    )
}