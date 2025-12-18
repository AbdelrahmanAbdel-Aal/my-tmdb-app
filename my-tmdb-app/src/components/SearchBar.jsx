export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded bg-gray-800 text-white outline-none"
    />
  );
}
