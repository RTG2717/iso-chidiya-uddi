export default function Slider({ value, setValue }) {
  return (
    <div className="flex flex-col items-center justify-center m-4 h-80 bg-blue-300 rounded-full">
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className="-rotate-90"
      />
      <div className="block">Value: {value}</div>
    </div>
  );
}
