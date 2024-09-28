"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import ClientList from "./clientList";

export default function Sidebar() {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div
      className={`h-[100vh] bg-white flex items-center flex-col p-4 transition-all duration-300 ease-in-out`}
      style={{ width: isSearching ? "500px" : "100px" }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo marques consult"
            width={50}
            height={50}
          />
          <div
            className={`text-lg font-bold transition-opacity duration-300 ${
              isSearching ? "opacity-100" : "opacity-0"
            }`}
          >
            Marques Maps
          </div>
        </div>
        <LiaTimesSolid
          className={`text-black transition-opacity duration-300 cursor-pointer hover:opacity-70 ${
            isSearching ? "opacity-100" : "opacity-0"
          }`}
          size={24}
          onClick={() => setIsSearching(false)}
        />
      </div>

      <div className="relative w-full mt-8">
        <FaSearch
          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300`}
        />
        <input
          type="text"
          className={`w-full h-12 border border-gray-300 rounded-lg p-2 text-center transition-all duration-300 ease-in-out `}
          onFocus={() => setIsSearching(true)}
        />
      </div>

      <div className="w-full h-[1px] bg-gray-300 mt-4 mb-8" />

      <ClientList isSearching={isSearching} />
    </div>
  );
}