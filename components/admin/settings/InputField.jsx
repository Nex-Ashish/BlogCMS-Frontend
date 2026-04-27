export default function InputField({ placeholder }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full bg-[#1d1023] border border-[#2a1831] rounded-lg p-2 mb-2 outline-none focus:border-purple-500"
    />
  );
}