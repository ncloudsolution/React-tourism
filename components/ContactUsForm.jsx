"use client";
import React, { useRef, useState, useEffect } from "react";
import Title from "./standalone/Title";
import { SumCaptcha } from "@/libs/Captcha";

const ContactUsForm = () => {
  //this return a array

  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const massageRef = useRef();
  const captchaRef = useRef();

  const [submitError, setSubmitError] = useState("");

  const [sumCaptchaValue, setSumCaptchaValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    // Fetch or generate captcha value on component mount
    setSumCaptchaValue(SumCaptcha());
  }, [submitError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(sumCaptchaValue);

    if (
      nameRef.current.value === "" ||
      emailRef.current.value === "" ||
      subjectRef.current.value === "" ||
      massageRef.current.value === "" ||
      captchaRef.current.value === ""
    ) {
      captchaRef.current.value = ""; // Empty the captcha field value
      return setSubmitError("Please fill all the fields");
    }

    if (parseInt(captchaRef.current.value) !== sumCaptchaValue[2]) {
      captchaRef.current.value = ""; // Empty the captcha field value
      return setSubmitError("Captacha Validation Failed! Try again");
    }

    setIsLoading(true);
    console.log("fine");
    setSubmitError("");

    const emailText = `Reach to Us:
    Name: ${nameRef.current.value}
    Email: ${emailRef.current.value}
    Massage: ${massageRef.current.value}`;

    const formData = new FormData();
    formData.append("to", process.env.NEXT_PUBLIC_MY_EMAIL); // Set the recipient's email here
    formData.append("subject", subjectRef.current.value);
    formData.append("text", emailText);
    formData.append("clientmail", emailRef.current.value); // Set the sender's email here

    try {
      const response = await fetch("/api/contactusEmail", {
        method: "POST",
        body: formData, // FormData will be sent as `multipart/form-data`
      });
      const result = await response.json();
      console.log(result);
      //alert(result.message);
      setIsLoading(false); // Stop loading
      setResponseMessage(result.message); // Set the message from the server

      setTimeout(() => {
        setResponseMessage(false);
      }, 2000);
      console.log("msg send");
    } catch (error) {
      console.error("Error:", error);
      // alert("Failed to send the file.");
      setIsLoading(false); // Stop loading
      setResponseMessage("Failed to make the order. Please try again.");

      setTimeout(() => {
        setResponseMessage(false);
      }, 2000);
    }

    nameRef.current.value = "";
    emailRef.current.value = "";
    subjectRef.current.value = "";
    massageRef.current.value = "";
    captchaRef.current.value = "";

    setSubmitError("");
  };

  return (
    <>
      <div className="w-full border-2 border-transparent relative flex flex-col items-center xs:my-28 my-5">
        {(isLoading || responseMessage) && (
          <div className="absolute top-0 left-0 bottom-0 bg-white right-0 w-full  z-50 border-2 border-transparent flex justify-center items-center">
            {/* Your form or component elements go here */}
            {isLoading && <div>Sending email...</div>}{" "}
            {/* Display a loading message */}
            {responseMessage && <div>{responseMessage}</div>}
            {/* Display the response message */}
          </div>
        )}
        {/* <div className="absolute top-0 left-0 bottom-0 bg-white right-0 w-full  z-50 border-2 border-red-700  flex justify-center items-center">
          helloi
        </div> */}

        <Title title="Reach to Us" />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2  xs:w-[400px] w-[260px]">
            <div>
              <div className="xs:text-[18px] text-[16px]">Name</div>
              <input
                ref={nameRef}
                placeholder="John Nash"
                type="text"
                className="w-full p-2 rounded border-[1px] border-primary outline-none text-[14px]"
              />
            </div>

            <div>
              <div className="xs:text-[18px] text-[16px]">Your Email</div>
              <input
                ref={emailRef}
                placeholder="johnnash123@gmail.com"
                type="email"
                className="w-full p-2 rounded border-[1px] border-primary outline-none text-[14px]"
              />
            </div>

            <div>
              <div className="xs:text-[18px] text-[16px] ">Subject</div>
              <input
                ref={subjectRef}
                placeholder="Inquiry Regarding Tour Details ................."
                type="text"
                className="w-full p-2 rounded border-[1px] border-primary outline-none text-[14px]"
              />
            </div>

            <div>
              <div className="xs:text-[18px] text-[16px] ">Message</div>
              <textarea
                ref={massageRef}
                placeholder="I'm writing you regarding ................."
                className="w-full p-2 rounded border-[1px] border-primary outline-none text-[14px] "
                rows={5}
              />
            </div>

            {submitError && (
              <div className="w-full bg-errorpink p-2 text-white rounded text-center">
                {submitError}
              </div>
            )}

            <div className="flex justify-between my-2 gap-x-4">
              <div className="xs:text-[18px] text-[16px] w-1/2  flex bg-primary text-white rounded items-center justify-center p-2">
                <div>{sumCaptchaValue[0]}</div>
                <div className="xs:mx-2 mx-1">+</div>
                <div>{sumCaptchaValue[1]}</div>
              </div>
              <input
                ref={captchaRef}
                placeholder="Sum"
                type="number"
                className="w-1/2 p-2 rounded border-[1px] border-primary outline-none text-[14px]"
              />
            </div>

            <div>
              <input
                placeholder="Inquiry Regarding Tour Details and Booking Information"
                type="submit"
                className="w-full p-2 rounded bg-primary text-white outline-none xs:text-[18px] text-[16px]"
                value="Submit"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUsForm;
