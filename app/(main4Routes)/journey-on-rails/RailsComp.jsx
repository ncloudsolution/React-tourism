"use client";

import DescriptionTile from "@/components/DescriptionTile";
import TrainMap from "@/components/Map/TrainMap";
import CarSkeleton from "@/components/skeletonUI/compoundElements/CarSkeleton";
import Flow from "@/components/standalone/Flow";
import React, { useEffect, useState } from "react";
import TrainStopPlacesCard from "@/components/TrainStopPlacesCard";
import CurrencyFullBar from "@/components/CurrencyFullBar";

const PtoP = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSkeleton(false);
    }, 500); // 1 seconds delay - second timeout
    return () => clearTimeout(timeoutId);
  }, []);

  // const libraries = ["places"];
  // setTimeout(() => {}, 1000);
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  //   region: "lk",
  //   libraries: libraries,
  // });

  if (showSkeleton) {
    return (
      <>
        <CarSkeleton />
      </>
    );
  }
  return (
    <>
      <CurrencyFullBar />
      {/* <CurrencyTab /> */}
      <div className=" flex flex-col justify-center items-center ">
        {/* <div className="w-full flex justify-center bg-black">
          <Hierarchy />
        </div> */}
        <div className="flex flex-col items-center -scroll-mb-14">
          <div className="xs:mt-10 mt-5  bigmd:w-[838px] bxs:w-[464px] xxxs:w-[314px] w-[294px]  gap-y-5">
            <TrainMap />
            <TrainStopPlacesCard />
          </div>
          <div className="my-10">
            <Flow type={"rails"} />
          </div>

          <div className="mb-16 mt-3">
            <DescriptionTile type={"rails"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PtoP;
