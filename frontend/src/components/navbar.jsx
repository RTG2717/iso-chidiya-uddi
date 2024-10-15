import { useState, useEffect } from "react";

export default function Navbar({ value }) {
  const [uddi, setUddi] = useState(false);

  useEffect(() => {
    if (value < 69) setUddi(false);
    else setUddi(true);
  }, [value]);

  return (
    <div className="text-4xl z-50 fixed w-full border-solid border-yellow-400 border-b-2">
      {uddi ? (
        <div className="bg-black text-white">UDDI</div>
      ) : (
        <div className="bg-white text-black">NO UDDI</div>
      )}
    </div>
  );
}
