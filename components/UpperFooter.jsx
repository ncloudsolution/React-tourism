import Image from "next/image";
import React from "react";

import bg from "@/public/Footers/bgimg1.jpeg";
import logo from "@/public/Navbar/tblogo.png";
import Link from "next/link";

import { SiInstagram } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { IoIosMailUnread } from "react-icons/io";

const UpperFooter = () => {
  return (
    <>
      <div className="h-[900px]  xs:h-[750px] sm:h-[700px] bigmd:h-[550px]  w-full  overflow-hidden relative">
        <Image
          src={bg}
          alt=""
          className="size-[100%]  object-cover object-right xs:object-center"
        />

        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute top-0 left-0  w-full flex justify-center bigmd:py-20 py-10 ">
          <div className="text-primary  flex flex-col midxl:w-[70%] w-[90%] bg-transparent items-center ">
            <div className="text-[34px] font-semibold  pb-[50px]">
              Get in Touch
            </div>
            <div className="w-full justify-around items-center grid bigmd:grid-cols-4  xs:grid-cols-2  grid-cols-1 font-medium ">
              <div className="flex flex-col text-center items-center mb-[40px]">
                <div className="bg-white rounded-full mobile:size-[150px] size-[100px] flex justify-center items-center">
                  <Image
                    src={logo}
                    alt=""
                    className="mobile:w-[120px] w-[70px]"
                  />
                </div>

                <div className="my-2">
                  {" "}
                  118/5 st Joseph street, Grandpass, Colombo 14, Sri Lanka,
                </div>
              </div>

              <div className="flex flex-col text-center mb-[40px] ">
                <Link href="/airport-p&d" className="my-2 hover:text-white">
                  Airport Transport
                </Link>
                <Link href="/point-to-point" className="hover:text-white">
                  Point to Point
                </Link>
                <Link
                  href="/journey-on-rails"
                  className="my-2 hover:text-white"
                >
                  Train booking
                </Link>
                <Link href="/day-trips" className="hover:text-white">
                  Day Trips
                </Link>
              </div>

              <div className="flex flex-col  text-center mb-[40px]">
                <div className="mb-2 flex justify-center gap-1">
                  Call -
                  <div>
                    +94719 885 885 <br /> +94712 100 500
                    <br /> +94781 820 820
                    <br />
                    +94781 720 720
                  </div>
                </div>
                <div className="my-2">email - Info@tourbookingsrilanka.com</div>
                <div className="my-2">web - www.tourbookingsrilanka.com</div>
              </div>

              <div className="flex flex-col text-center">
                <Link href="/" className="mb-2 hover:text-white">
                  Terms & Conditions
                </Link>
                <Link href="/" className="my-2 hover:text-white">
                  Privacy Policy
                </Link>
                {/* <Link href="/" className="my-2 hover:text-black">
                  Shipping and Exchange
                </Link> */}
              </div>
            </div>
            <div>
              <div className="flex gap-5 bigmd:mt-[30px] mt-[20px]">
                <Link
                  target="_blank"
                  href="mailto:easycabandtours@gmail.com"
                  className="xs:size-[50px] size-[45px]  rounded-full bg-primary flex justify-center items-center"
                >
                  <IoIosMailUnread className="text-white text-[32px]" />
                </Link>
                <Link
                  target="_blank"
                  href="https://web.facebook.com/easycabandtours?mibextid=ZbWKwL&_rdc=1&_rdr"
                  className="xs:size-[50px] size-[45px]   rounded-full bg-primary flex justify-center items-center"
                >
                  <FaFacebookF className="text-white text-[25px]" />
                </Link>
                <Link
                  target="_blank"
                  href="https://wa.me/+94712100500"
                  className="xs:size-[50px] size-[45px] rounded-full bg-primary flex justify-center items-center"
                >
                  <BsWhatsapp className="text-white text-[28px]" />
                </Link>
                <Link
                  target="_blank"
                  href="https://t.me/Tourbookingsrilanka"
                  className="xs:size-[50px] size-[45px]  rounded-full bg-primary flex justify-center items-center"
                >
                  <FaTelegramPlane className="text-white text-[28px] -translate-x-[2px]" />
                </Link>
                <Link
                  target="_blank"
                  href="https://youtu.be/QXXXz8MipHA"
                  className="xs:size-[50px] size-[45px]  rounded-full bg-primary flex justify-center items-center"
                >
                  <FaYoutube className="text-white text-[28px] " />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpperFooter;
