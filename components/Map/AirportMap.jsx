"use client";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { useContext, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { SelectVehiclesList } from "@/libs/calculations";
import { TourContext } from "@/context/TourContextProvider";
import { RetrunTimeValidity, StartTimeValidity } from "@/libs/TimeValidity";

import CustomDatePicker from "../CustomDatePicker";

import { IoIosCloseCircle } from "react-icons/io";
import { MdLocalAirport } from "react-icons/md";

const center = { lat: 6.9271, lng: 79.8612 };

const AirportMap = ({ children }) => {
  const router = useRouter();

  const [map, setMap] = useState(/** @type google.maps.Map*/ (null));
  /** js docs types for suggesions**/
  const { tourDetails, setTourDetails } = useContext(TourContext);

  const [selectedVehiclesList, setSelectedVehiclesList] = useState([]);
  const [directionsRespone, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [durationForCalc, setDurationForCalc] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [returnTour, setReturnTour] = useState(false);

  const originRef = useRef();
  const destinationRef = useRef();
  const passengerCountRef = useRef();

  const mapRef = useRef();

  const [highwayExitNamesState, setHighwayExitNamesState] = useState();
  const [routeSummary, setRouteSummary] = useState();
  //scroll to after the submission

  const [startDate, setStartDate] = useState(new Date());

  const [returnDate, setReturnDate] = useState(new Date());

  const [isPickup, setIsPickup] = useState(true);
  const [isDrop, setIsDrop] = useState(false);
  const [isPickDisable, setIsPickDisable] = useState(true);
  const [isDropDisable, setIsDropDisable] = useState(false);

  const handlePickup = () => {
    if (isPickup) return;
    setIsPickup(true);
    setIsDrop(false);
    originRef.current.value =
      "Bandaranaike International Airport (CMB), Katunayake";
    destinationRef.current.value = "";
    setIsPickDisable(true);
    setIsDropDisable(false);
  };

  const handleDrop = () => {
    if (isDrop) return;
    console.log("drop");
    setIsDrop(true);
    setIsPickup(false);
    destinationRef.current.value =
      "Bandaranaike International Airport (CMB), Katunayake";
    originRef.current.value = "";

    setIsDropDisable(true);
    setIsPickDisable(false);
  };

  useEffect(() => {
    originRef.current.value =
      "Bandaranaike International Airport (CMB), Katunayake";
  }, []);

  async function calculateRoute() {
    if (
      originRef.current.value === "" ||
      destinationRef.current.value === "" ||
      passengerCountRef.current.value === "" ||
      startDate === ""
    ) {
      return setSubmitError("Please fill all the fields");
    }

    const ValidStartTime = StartTimeValidity(startDate); // Assuming TimeValidity is synchronous

    if (ValidStartTime) {
      setSubmitError(ValidStartTime);
      return;
    }

    try {
      const directionService = new google.maps.DirectionsService();
      const results = await directionService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setSubmitError("");
      setIsSubmit(true);
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      setDurationForCalc(results.routes[0].legs[0].duration.value);

      // const roadDetails = results.routes[0].legs[0].steps.map((step) => {
      //   return step.instructions; //{
      //   // instruction: ,
      //   // distance: step.distance.text,
      //   // duration: step.duration.text,
      //   // startLocation: step.start_location,
      //   // endLocation: step.end_location,
      //   // You can add more properties as needed
      //   //  };
      // });
      // setRouteSummary(roadDetails);

      const selectedVehiclesListValue = SelectVehiclesList(
        passengerCountRef.current.value,
        Math.ceil(results.routes[0].legs[0].distance.value / 1000)
      );
      setSelectedVehiclesList(selectedVehiclesListValue);

      console.log(Math.ceil(results.routes[0].legs[0].distance.value / 1000));

      if (returnTour) {
        const ValidReturnTime = RetrunTimeValidity(
          startDate.getTime() / (1000 * 60),
          returnDate.getTime() / (1000 * 60),
          durationForCalc / 60
        );
        setSubmitError(ValidReturnTime);
        return;
      }
      window.scrollBy({
        top: 300, // Scroll down by 200px
        behavior: "smooth", // Smooth scrolling
      });
      console.log(ValidReturnTime, "RETURN VALID");
    } catch (error) {
      console.error("Error occurred while calculating route:", error);
      // Handle error as needed
    }

    console.log(durationForCalc, "calc");
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setIsSubmit(false);

    passengerCountRef.current.value = "";

    if (isDrop) {
      originRef.current.value = "";
    } else {
      destinationRef.current.value = "";
    }
  }

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="w-fit flex flex-col items-center justify-center ">
          <div className="bxs:text-[30px] xxxs:text-[24px] text-[22px] mt-[50px] mb-[10px] font-medium">
            Airport Pickup / Drop
          </div>
          <MdLocalAirport className="text-[35px] text-primary" />
          <div className="flex my-4 border-2 border-transparent bigmd:w-fit bxs:w-[400px] xxs:w-fit xxxs:w-[250px] w-[230px]">
            <div className="flex flex-col gap-y-3 w-full text-center  ">
              <div className="flex w-full gap-x-3">
                <div
                  onClick={handlePickup}
                  className={`${
                    isPickup
                      ? "bg-primary text-white"
                      : "border-[1px] border-black"
                  } w-1/2  py-2 rounded transition-all duration-500`}
                >
                  Pickup
                </div>
                <div
                  onClick={handleDrop}
                  className={`${
                    isDrop
                      ? "bg-primary text-white"
                      : "border-[1px] border-black"
                  } w-1/2  py-2 rounded transition-all duration-500`}
                >
                  Drop
                </div>
              </div>
              <div className="flex gap-x-3 flex-col bigmd:flex-row  gap-y-3 ">
                <Autocomplete restrictions={{ country: ["lk"] }}>
                  <input
                    disabled={isPickDisable}
                    ref={originRef}
                    placeholder="Origin"
                    type="text"
                    className="p-2 text-[14px] outline-none bigmd:w-[250px]  w-full shadow-md rounded border-[1px] border-black"
                  />
                </Autocomplete>

                <Autocomplete restrictions={{ country: ["lk"] }}>
                  <input
                    disabled={isDropDisable}
                    ref={destinationRef}
                    placeholder="Destination"
                    type="text"
                    className="p-2 text-[14px] outline-none bigmd:w-[250px]  w-full shadow-md rounded border-[1px] border-black "
                  />
                </Autocomplete>

                <input
                  ref={passengerCountRef}
                  placeholder="No.Passengers"
                  type="number"
                  min="1"
                  className="p-2 text-[14px] outline-none bigmd:w-[250px]  w-full shadow-md rounded border-[1px] border-black "
                />
              </div>

              <div className="flex gap-x-3 relative  flex-col bigmd:flex-row gap-y-3">
                <CustomDatePicker
                  selectedDate={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                {returnTour ? (
                  <>
                    <CustomDatePicker
                      selectedDate={returnDate}
                      onChange={(date) => setReturnDate(date)}
                    />

                    <IoIosCloseCircle
                      size={25}
                      className="absolute cursor-pointer bigmd:left-[450px] bxs:left-[320px] xxxs:left-[180px] left-[165px] bigmd:top-[6px] bxs:top-[58px] top-[58px]"
                      onClick={() => setReturnTour(false)}
                    />
                  </>
                ) : (
                  <div
                    className="flex flex-1 justify-center items-center shadow-md rounded border-[1px] border-black cursor-pointer py-[6px]"
                    onClick={() => setReturnTour(true)}
                  >
                    Add Reurn
                  </div>
                )}

                <div className="flex flex-1 justify-between gap-x-4 bigmd:gap-x-2  xxs:text-[16px] text-[12px] font-medium xxs:font-normal">
                  <button
                    type="submit"
                    className="bg-black text-white p-2 rounded bigmd:w-fit flex-1 bigmd:block "
                    onClick={calculateRoute}
                  >
                    Calculate Route
                  </button>
                  <button
                    className="bg-black text-white p-2 rounded bigmd:w-fit :flex-1 bigmd:block"
                    onClick={clearRoute}
                  >
                    Clear Route
                  </button>
                </div>
              </div>
            </div>
          </div>

          {submitError && <div className="text-errorpink">{submitError}</div>}

          {!submitError && distance && duration && (
            <div className="flex xs:flex-row flex-col text-center py-2 px-5 gap-x-3 bg-yellow-400 text-black my-2 rounded">
              <div>Distance : {distance}</div>
              <div className="font-bold xs:flex hidden">||</div>
              <div>Duration : {duration}</div>
            </div>
          )}

          {/* {routeSummary &&
            routeSummary.map((path, index) => (
              <div key={index} className="bg-red-400 my-5">
                {path}
              </div>
            ))} */}

          {/* <div className="flex my-4 gap-x-3 ">
            {/* <button
              className="bg-black text-white p-2 rounded"
              onClick={() => map.panTo(center)}
            >
              to center map
            </button> 
          </div> */}

          {/** map center smoothly**/}
        </div>

        {isSubmit && !submitError && (
          <div className="w-full flex justify-center" ref={mapRef}>
            <div className=" midxl:w-[1400px] mobile:w-[1000px] w-[800px] flex gap-x-10 xs:mt-8 mt-4 mb-16 bigmd:flex-row flex-col bigmd:items-start items-center border-2 border-transparent gap-5 p-4">
              <div className="midxl:w-[800px] xs:w-[400px] xxxs:w-[300px] w-[250px]  midxl:h-[500px] bigmd:h-[300px]  xs:h-[400px] xxxs:h-[300px] h-[250px] aspect-square flex rounded-lg overflow-hidden shadow-md ">
                <GoogleMap
                  center={center}
                  zoom={15}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  onLoad={(map) => setMap(map)}
                >
                  {directionsRespone && (
                    <DirectionsRenderer directions={directionsRespone} />
                  )}
                </GoogleMap>
              </div>
              <div className="w-full">
                {selectedVehiclesList.map((vehicle, index) => (
                  <div
                    key={index}
                    className="bg-transparent text-black w-full flex flex-col xs:flex-row mb-6 p-4 rounded-lg border-[2px] border-black shadow-md justify-between hover:scale-[1.03] transition-all duration-500"
                  >
                    <div className="flex flex-col items-center xs:items-start ">
                      <div className="font-semibold text-[30px] px-8">
                        {vehicle.type}
                      </div>
                      <div className="sm:w-[300px] w-[250px] sm:h-[150px] h-[120px]">
                        <Image
                          src={vehicle.img}
                          alt=""
                          width={300}
                          height={300}
                          className="border-2 border-transparent object-cover w-[100%] h-[100%]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col mobile:mr-3 mr-1  gap-y-3  items-center justify-center border-2 border-transparent">
                      <div className="text-black text-[20px] ">
                        Passengers {vehicle.passengers}
                      </div>
                      <div className="text-black text-[20px] ">
                        Luggages {vehicle.luggages}
                      </div>
                      <div className="bg-black text-white py-2 rounded w-full text-center flex flex-col items-center">
                        <div>
                          Price Rs.
                          {returnTour ? vehicle.price * 2 : vehicle.price}
                        </div>
                        <div className="bigmd:text-[12px] text-[10px] text-yellow-500 bigmd:w-[200px]  xs:w-[150px] w-[170px] px-2 text-center">
                          Highway Charges and other Charges are Not Included
                        </div>
                      </div>
                      <button
                        className="bg-yellow-500 w-full py-2 rounded font-semibold  hover:border-black border-2 border-transparent transition-all duration-500"
                        onClick={() => {
                          console.log(startDate, "date");
                          //console.log(vehicle.price);
                          setTourDetails({
                            vehicleType: vehicle.type,
                            vehicalSeatCapacity: vehicle.passengers,
                            weightFactor: vehicle.weightFactor,
                            price: returnTour
                              ? vehicle.price * 2
                              : vehicle.price,
                            image: vehicle.img,
                            luggages: vehicle.luggages,

                            origin: originRef.current.value,
                            destination: destinationRef.current.value,
                            noOfPassengers: passengerCountRef.current.value,
                            startDate: startDate,
                            returnDate: returnTour
                              ? returnDate
                              : "No any Return",
                            distance: distance,
                            duration: duration,
                          });
                          console.log("redirect");
                          router.push("/tourbooking");
                        }}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/** context usage **/}
      </div>
      {children}
    </>
  );
};

export default AirportMap;
