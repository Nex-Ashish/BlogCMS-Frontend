export default function SectionCard({ title, children }) {
  return (
    <div className="bg-[#140a18] p-5 rounded-xl shadow-md">
      <h2 className="text-lg mb-4">{title}</h2>
      {children}
    </div>
  );
}