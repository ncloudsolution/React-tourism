"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { TbRoadSign } from "react-icons/tb";
import highway from "@/data/highwayCharges.json";
import { TourContext } from "@/context/TourContextProvider";
import { SetHighwayCharge } from "@/libs/HighwayFair";

const CustomHighwayDropDown = () => {
  const { tourDetails, setTourDetails } = useContext(TourContext);

  const [stations] = useState(Object.keys(highway));
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const handleSelectStation = (station) => {
    setSelected(station);
    const highwayChargeValue = SetHighwayCharge(tourDetails.category, station);
    setTourDetails((prevTourDetails) => ({
      ...prevTourDetails,
      highwayExit: station,
      highwayCharge: highwayChargeValue,
    }));
    setOpen(false);
    setInputValue("");
  };

  return (
    <div className="relative font-normal ">
      <div className="w-full left-0 right-0 h-[30px]">
        {/* Dropdown button */}
        <div
          onClick={() => setOpen(!open)}
          className={`bg-white w-full border-[1px] text-[14px] border-black p-1 flex items-center justify-between rounded ${
            !selected && "text-[#8e8e8e]"
          }`}
        >
          {selected
            ? selected?.length > 25
              ? selected?.substring(0, 25) + "..."
              : selected
            : "Select Your Highway Exit"}
          {/* Dropdown icon */}
          <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        </div>
        {/* Dropdown list */}
        <ul
          className={`bg-white mt-2 overflow-y-auto cursor-pointer ${
            open
              ? "max-h-[220px] border-[1px] border-black rounded mb-2"
              : "max-h-0"
          }`}
        >
          {/* Search input */}
          <div className="flex items-center px-2 sticky top-0 bg-white shadow">
            <AiOutlineSearch size={18} className="text-gray-700" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder="Enter Your Favorite Stations"
              className="placeholder:text-gray-700 placeholder:text-[12px] bxs:placeholder:text-[14px] px-2 py-1 outline-none w-full"
            />
          </div>
          {/* Dropdown items */}
          {stations.map((station) => (
            <li
              key={station}
              className={`py-2 px-3 text-[12px] bxs:text-[14px] hover:bg-sky-600 hover:text-white flex items-center  ${
                station?.toLowerCase() === selected?.toLowerCase() &&
                "bg-sky-600 text-white"
              } ${
                station?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }`}
              onClick={() => handleSelectStation(station)}
            >
              <TbRoadSign size={20} className="mr-2" />
              {station}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomHighwayDropDown;
