import React, { useContext, useEffect, useState } from "react";
import Servicecss from "./Servicecss"; // Import your CSS file
import axios from "axios";
import contextAuth from "../ContextAPI/ContextAuth";
import { Link } from "react-router-dom";
import image1 from "../images/image 2.jpg";
import image2 from "../images/image 3.png";
import image3 from "../images/image 4.png";
import image4 from "../images/image 5.png";
import image5 from "../images/image 7.avif";
import image6 from "../images/image 8.png";
import image7 from "../images/image 9.png";
import image8 from "../images/image 10.png";

const Banner_services = () => {
  const images=[image1,image2,image3,image4,image5,image6,image7,image8];

  const { setLoading } = useContext(contextAuth);

  const [services, setServices] = useState([]);

  const toTitleCase = (str) =>
    str.replace(
      /(^\w|\s\w)(\S*)/g,
      (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
    );

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_PRO_URL}/api/home/data`, {
        withCredentials: true,
      })
      .then((response) => {
        const data = response.data.data;
        setServices(data.services);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  return (
    <>
      <br></br>

      <Servicecss />
      <div className="bg-indigo-900 w-[100%] text-white md:h-28 px-4 md:px-47 flex justify-center items-center leading-3 ">
        <div className="text-center p-2 leading-10 font-sans max-sm:text-xl xl:text-2xl lg:text-3xl md:text-3xl sm:text-2xl md:tracking-wider">
          Elevate your career prospects and stand out to{" "}
          <br className="hidden md:block" /> employers with our personalized
          resume services
        </div>
      </div>

      <br></br>
      <br></br>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-5 w-[80%] md:w-[70%] max-w-[1500px] mx-auto">
        {services?.map((service, index) => (
          <div
            key={service._id}
            className="flex flex-col justify-between items-center gap-y-6 md:gap-y-3 border-2 border-[#00000066]/30 p-1 py-3 rounded-lg  max-[500px]:w-[93%] max-md:w-[70%] md:w-[95%] lg:w-full mx-auto group"
            style={{ fontFamily: "poppins" }}
          >
            <div className="w-[80%] md:w-[65%] md:h-[150px]">
              <img
                src={images[index]}
                alt=""
                className="h-full w-full object-fill rounded-lg group-hover:scale-105 duration-200 ease-in-out"
              />
            </div>
            <h1 className="text-lg text-center">{service.title}</h1>
            <hr className="w-[90%] h-[2px] border-none bg-gray-700" />
            <h2 className="text-base text-center w-[95%] mx-auto">
              {service.description}
            </h2>
            <div className="flex justify-between items-center text-[12px] leading-[15px] px-2 w-full">
              <button>Starts from Rs.{service.price}/-</button>
              <Link
                to={toTitleCase(service.title).split(" ").join("-")}
                className="text-blue-500"
              >
                KNOW MORE
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Banner_services;
