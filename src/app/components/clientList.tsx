import Image from "next/image";
import { useEffect, useState } from "react";
import { useGeomapContext } from "../contexts/GeomapContext";

interface ClientListProps {
  isDisplayingFullWidth: boolean;
}

export default function ClientList({ isDisplayingFullWidth }: ClientListProps) {
  const [fade, setFade] = useState({ opacity: 0 });
  const {
    places,
    setSelectedPlace,
    setOpenPlaceInfoModal,
  } = useGeomapContext();

  useEffect(() => {
    if (isDisplayingFullWidth) {
      setFade({ opacity: 1 }); // Fade in
    } else {
      setFade({ opacity: 0 }); // Fade out
    }
  }, [isDisplayingFullWidth]);

  return (
    <div className="overflow-y-scroll no-scrollbar">
      {places.map((item, index) => (
        <div
          key={index}
          className="flex gap-4 mb-4 hover:opacity-90"
          style={{
            cursor: isDisplayingFullWidth ? "pointer" : "default",
          }}
          onClick={() => {
            if (!isDisplayingFullWidth) return;

            setSelectedPlace(item);
            setOpenPlaceInfoModal(true);
          }}
        >
          <Image
            src="/city.png"
            alt="foto da cidade"
            width={50}
            height={35}
            className="rounded-lg h-12 mb-6"
          />

          {isDisplayingFullWidth && (
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
                className="text-md font-bold"
              >
                {item.company_name}
              </p>
              <p
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  opacity: fade.opacity,
                }}
                className="text-sm text-gray-400"
              >
                {item.street}, {item.city}-{item.uf}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
