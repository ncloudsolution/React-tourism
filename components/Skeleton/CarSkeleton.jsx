import Image from "next/image";
import car from "@/public/Vehicles/sportscar.png";
import car2 from "@/public/Vehicles/sportscar2.png";
import car3 from "@/public/Vehicles/optnewcar.png";
import React from "react";

const CarSkeleton = () => {
  return (
    <>
      <div className="w-full xxs:h-[100vh] h-[85vh] flex justify-center items-center border-2 border-transparent relative ">
        {/** for car 1
        <div className="text-[40px] font-medium absolute -translate-y-[150px] animate-cartext">
          Find your Driver
        </div> **/}

        {/** for car 2**/}

        <div className=" font-medium absolute bg-transparent z-[-1] bxs:animate-cartext2 animate-cartext2formid">
          Find your Driver
        </div>

        {/** <Image src={car} alt="" className="size-[100%] animate-carmoving" /> **/}
        <div className="bxs:w-[350px] xxs:w-[250px] w-[180px] bxs:h-[250px] xxs:h-[150px] h-[80px]">
          {/** line 1 give hieght and width to container**/}
          <Image
            layout="responsive"
            src={car3}
            alt=""
            className="object-cover border-2 border-transparent animate-carmoving2 xxs:translate-y-0"
            priority
          />
          {/** line 2 give layout as responsible**/}
          {/** line 3 give priority to load first line 4 give placeholder="blur" to give initial blur as before loading**/}
        </div>
      </div>
    </>
  );
};

export default CarSkeleton;
