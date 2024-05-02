"use client";

import React, { useContext } from "react";

import { usePathname, useRouter } from "next/navigation";

import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";

import { TourContext } from "@/context/TourContextProvider";

import { FaSearch } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const Hierarchy = () => {
  const { tourDetails } = useContext(TourContext);
  const pathname = usePathname();
  const router = useRouter();

  const sections = [
    { name: "SEARCH", url: "/", icon: <FaSearch /> },
    { name: "BOOKING", url: "/tourbooking", icon: <FaFileAlt /> },
    {
      name: "DONE",
      url: "/tourbooking/summary",
      icon: <FaCircleCheck />,
    },
  ];

  const isButtonEnabled = (index) => {
    if (index === 1) {
      return tourDetails.pageTwoToken; // Enable only if pageTwoToken is true
    } else if (index === 2) {
      return tourDetails.pageThreeToken; // Enable only if pageThreeToken is true
    }
    return true; // Enable for all other sections
  };

  return (
    <div className="flex px-2">
      {sections.map((section, index) => {
        const isActive = index <= sections.findIndex((s) => s.url === pathname);
        const isActiveforLine =
          index + 1 <= sections.findIndex((s) => s.url === pathname);
        return (
          <div key={index} className="flex items-center">
            <button
              disabled={!isButtonEnabled(index)} // Disable the button if isButtonEnabled returns false
              onClick={() => router.push(section.url)} // Navigate using router.push
              className={`${
                isActive
                  ? "text-primary border-primary"
                  : "text-black border-black"
              } xs:text-[30px] text-[16px] font-normal text-center border-[2px] rounded bigmd:p-2 p-1`}
            >
              {section.icon}
            </button>
            {index < sections.length - 1 && (
              <div
                className={`${
                  isActiveforLine ? "bg-primary " : "bg-black "
                }  xs:mx-6 mx-4 xs:text-[24px] text-[16px] bigmd:w-[150px] xs:w-[60px] w-[40px] xs:h-1 h-[2px] rounded`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Hierarchy;
