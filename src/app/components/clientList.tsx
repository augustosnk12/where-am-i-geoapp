import Image from "next/image";
import { useEffect, useState } from "react";

interface ClientListProps {
  isSearching: boolean;
}

const clients = [
  {
    id: 1,
    name: "Nome do cliente",
  },
  { id: 2, name: "juqinha rações" },
  { id: 3, name: "maria dos panos e outros" },
  { id: 4, name: "eu sou gamer de ff kkkkkkkkkkkk" },
  { id: 4, name: "eu sou gamer de ff kkkkkkkkkkkk" },
  { id: 4, name: "eu sou gamer de ff kkkkkkkkkkkk" },
  { id: 4, name: "eu sou gamer de ff kkkkkkkkkkkk" },
  { id: 4, name: "eu sou gamer de ff kkkkkkkkkkkk" },
  { id: 4, name: "eu sou gamer de ff kkkkkkkkkkkk" },
];

export default function ClientList({ isSearching }: ClientListProps) {
  const [fade, setFade] = useState({ opacity: 0 });
  useEffect(() => {
    if (isSearching) {
      setFade({ opacity: 1 }); // Fade in
    } else {
      setFade({ opacity: 0 }); // Fade out
    }
  }, [isSearching]);
  return (
    <div className='overflow-y-scroll'>
      {clients.map((item, index) => (
        <div key={index} className="flex gap-4 mb-4">
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
                {item.name}
              </p>
              <p
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  opacity: fade.opacity,
                }}
                className="text-sm text-gray-500"
              >
                Rua da alegria, Limoeiro-PE
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
