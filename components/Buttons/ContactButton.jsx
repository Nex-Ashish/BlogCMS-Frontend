export default function ContactButton({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full text-sm bg-[#1a1a1a] py-2.5 px-6 border border-white/10 text-white font-medium hover:bg-[#222] transition-colors"
    >
      {title}
    </button>
  )
}