"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import ClientList from "./clientList";
import { useGeomapContext } from "../contexts/GeomapContext";

export default function Sidebar() {
  const [isDisplayingFullWidth, setIsDisplayingFullWidth] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { setSearch, search, fetchPlaces } = useGeomapContext();

  useEffect(() => {
    if (debouncedSearch === "") {
      fetchPlaces({ search: "" });
    } else {
      const handler = setTimeout(() => {
        fetchPlaces({ search: debouncedSearch });
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setDebouncedSearch(search);
  }, [search]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetchPlaces({ search });
  }

  function cleanSearch() {
    setSearch("");
    fetchPlaces({ search: "" });
  }

  return (
    <div
      className={`h-[100vh] bg-white flex items-center flex-col p-4 transition-width duration-300 ease-in-out relative z-[1000]`}
      style={{ width: isDisplayingFullWidth ? "400px" : "100px" }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Image
            src="/logo-v-3.png"
            alt="logo marques consult"
            width={80}
            height={80}
          />
          <div
            className={`text-lg text-grey-700 font-bold font-sans transition-opacity duration-300 ${
              isDisplayingFullWidth ? "opacity-100" : "opacity-0"
            }`}
          >
            Marques Maps
          </div>
        </div>
        {isDisplayingFullWidth ? (
          <IoIosArrowDropleftCircle
            className="absolute -right-3 top-20 transform -translate-y-1/2 cursor-pointer hover:text-gray-700 z-[999]"
            size={28}
            onClick={() => setIsDisplayingFullWidth(!isDisplayingFullWidth)}
          />
        ) : (
          <IoIosArrowDroprightCircle
            className="absolute -right-3 top-20 transform -translate-y-1/2 cursor-pointer hover:text-gray-700 z-[999]"
            size={28}
            onClick={() => setIsDisplayingFullWidth(!isDisplayingFullWidth)}
          />
        )}
      </div>

      <form onSubmit={handleSearch} className="w-full">
        <div className="relative w-full mt-8">
          {!search && (
            <FaSearch
              className={
                !isDisplayingFullWidth
                  ? `absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 hover:border-gray-700`
                  : `absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 transition-opacity duration-300`
              }
            />
          )}
          <div className="flex items-left gap-2">
            <input
              type="text"
              className="w-full h-12 border border-gray-300 rounded-lg p-2 m-0 text-left transition-all duration-300 ease-in-out hover:border-gray-700 focus:border-gray-700 focus:outline-none"
              onFocus={() => setIsDisplayingFullWidth(true)}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              autoCapitalize="none"
              style={{
                paddingLeft: !search ? "40px" : "10px",
                paddingRight: search ? "40px" : "10px",
              }}
            />
            {search && (
              <FaTimes
                className="absolute right-4 top-1/2 transform -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-700"
                onClick={cleanSearch}
              />
            )}
          </div>
        </div>
      </form>

      <div className="w-full h-[1px] bg-gray-300 mt-4 mb-8" />

      <ClientList isDisplayingFullWidth={isDisplayingFullWidth} />
    </div>
  );
}
