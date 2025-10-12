import React, { useEffect, useRef, useState } from "react";

const Assignment5 = () => {
  const otpCode = "123456";
  const otplength = 6;
  const [phoneNo, setPhoneNo] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(true);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(new Array(otplength).fill(""));
  const inputRefs = useRef([]);
  // console.log(otp);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  function handleSendOtp() {
    if (phoneNo.length !== 10) {
      setError("Phone No Should be 10 digits");
      setPhoneNo(null);
      return;
    }

    setIsOtpSent(true);
  }

  function handleOnChange(value, index) {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < otplength - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if complete
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === otplength && !newOtp.includes("")) {
      console.log("OTP entered:", combinedOtp);
    }
  }

  function handleKeyDown(e, index) {
    if (e.key == "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "ArrowRight" && index < otplength - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {!isOtpSent ? (
        <div className="w-xl p-8 border-2 border-white rounded-lg shadow-xl flex flex-col items-center bg-gradient-to-br to-gray-900 via-gray-800 from-black gap-8">
          <h1 className="text-3xl font-semibold text-white">Login via OTP</h1>
          <input
            type="number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="Enter your Phone Number"
            maxLength={10}
            className="px-4 py-3 rounded-lg border-2 border-white w-full outline-none font-semibold shadow-md"
          />
          <button
            className="px-4 py-3 rounded-lg border-2 border-white shadow-md cursor-pointer hover:bg-white/10 active:bg-white/20"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
          {error.length > 0 && (
            <div className="text-red-500 text-lg font-semibold italic">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="w-xl p-8 border-2 border-white rounded-lg shadow-xl flex flex-col items-center bg-gradient-to-br to-gray-900 via-gray-800 from-black gap-8">
          <h1 className="text-3xl font-semibold text-white">Verify OTP</h1>
          <div className="flex items-center gap-6">
            {otp.map((value, index) => (
              <input
                type="text"
                key={index}
                maxLength={1}
                inputMode="numeric"
                value={value}
                ref={(input) => {
                  inputRefs.current[index] = input;
                }}
                onChange={(e) => handleOnChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="p-4 border-2 rounded-lg w-full text-3xl border-white outline-none"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment5;
