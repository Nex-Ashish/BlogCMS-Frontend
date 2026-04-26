export default function DarkHeading({ heading }) {
  return (
    <span className="inline-flex items-center bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium tracking-widest px-3 py-1 mb-4 rounded-full">
      {heading}
    </span>
  );
}