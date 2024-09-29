"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import ClientList from "./clientList";
import { useGeomapContext } from "../contexts/GeomapContext";

export default function Sidebar() {
  const [isDisplayingFullWidth, setIsDisplayingFullWidth] = useState(false);

  const { setSearch, search, fetchPlaces } = useGeomapContext();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetchPlaces(search);
  }

  function cleanSearch() {
    setSearch("");
    fetchPlaces("");
  }

  useEffect(() => {
    if (!isDisplayingFullWidth) {
      cleanSearch();
    }
  }, [isDisplayingFullWidth]);

  return (
    <div
      className={`h-[100vh] bg-white flex items-center flex-col p-4 transition-all duration-300 ease-in-out`}
      style={{ width: isDisplayingFullWidth ? "500px" : "100px" }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Image
            src="/logo-v-2.png"
            alt="logo marques consult"
            width={80}
            height={80}
          />
          <div
            className={`text-lg font-bold transition-opacity duration-300 ${
              isDisplayingFullWidth ? "opacity-100" : "opacity-0"
            }`}
          >
            Marques Maps
          </div>
        </div>
        <LiaTimesSolid
          className={`text-black transition-opacity duration-300 cursor-pointer hover:opacity-70 ${
            isDisplayingFullWidth ? "opacity-100" : "opacity-0"
          }`}
          size={24}
          onClick={() => setIsDisplayingFullWidth(false)}
        />
      </div>

      <form onSubmit={handleSearch}>
        <div className="relative w-full mt-8">
          {!search && (
            <FaSearch
              className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300`}
            />
          )}
          <div className="flex items-center gap-2">
            <input
              type="text"
              className={`w-full h-12 border border-gray-300 rounded-lg p-2 text-center transition-all duration-300 ease-in-out `}
              onFocus={() => setIsDisplayingFullWidth(true)}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              autoCapitalize="none"
            />
            {search && (
              <FaTimes className="text-gray-400 cursor-pointer" onClick={cleanSearch} />
            )}
          </div>
        </div>
      </form>

      <div className="w-full h-[1px] bg-gray-300 mt-4 mb-8" />

      <ClientList isSearching={isDisplayingFullWidth} />
    </div>
  );
}
