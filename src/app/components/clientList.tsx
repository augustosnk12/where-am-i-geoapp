import Image from "next/image";
import { useEffect, useState } from "react";
import { useGeomapContext } from "../contexts/GeomapContext";

interface ClientListProps {
  isSearching: boolean;
}

export default function ClientList({ isSearching }: ClientListProps) {
  const [fade, setFade] = useState({ opacity: 0 });
  const { places, setSelectedPlace } = useGeomapContext();

  useEffect(() => {
    if (isSearching) {
      setFade({ opacity: 1 }); // Fade in
    } else {
      setFade({ opacity: 0 }); // Fade out
    }
  }, [isSearching]);

  return (
    <div className="overflow-y-scroll no-scrollbar">
      {places.map((item, index) => (
        <div
          key={index}
          className="flex gap-4 mb-4 cursor-pointer hover:opacity-90"
          onClick={() => {
            setSelectedPlace(item);
          }}
        >
          <Image
            src="/city.png"
            alt="foto da cidade"
            width={55}
            height={55}
            className="rounded-md h-14 mb-6"
          />

          {isSearching && (
            <div
              style={{
                transition: "opacity 0.3s ease-in-out",
                opacity: fade.opacity,
              }}
            >
              <p
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  opacity: fade.opacity,
                }}
                className="text-lg font-bold"
              >
                {item.nome_fantasia}
              </p>
              <p
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  opacity: fade.opacity,
                }}
                className="text-sm text-gray-500"
              >
                {item.logradouro}, {item.cidade}-{item.uf}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
