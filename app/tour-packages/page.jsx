import TourPackages from "@/components/TourPackages";
import React from "react";

export const metadata = {
  title: "Tour Packages",
  description:
    "Explore our carefully curated fixed tour packages, designed to offer you the best travel experiences with ease and convenience. These pre-planned itineraries include popular destinations, top attractions, and essential activities, ensuring a hassle-free and enjoyable journey. Perfect for travelers seeking a well-organized trip with no surprises, our fixed tour packages provide excellent value and unforgettable memories",
};

function page() {
  if (typeof window !== "undefined") {
    // Client-side only code
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <TourPackages />
    </>
  );
}

export default page;
