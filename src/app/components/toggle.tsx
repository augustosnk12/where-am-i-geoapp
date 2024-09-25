interface ToggleProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export default function Toggle({ isActive, setIsActive }: ToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
        <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-300"></div>
        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-4"></div>
      </label>
    </div>
  );
}
