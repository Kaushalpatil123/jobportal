import React, { useEffect, useState, useContext } from "react";

import toast from "react-hot-toast";
import contextAuth from "../../../ContextAPI/ContextAuth";
import { FaAnglesRight } from "react-icons/fa6";
import image from "../../../images/zapResume.png";
import icon from "../../../images/zapIcon.png";
import image2 from "../../../images/image160.png";
import Blog from "../../Blog";
import Footer from "../../Footer";
import Contactus from "../../Contactus";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const ZapResume = () => {
  const [planprice, setPlanprice] = useState();
  const { setLoading, token } = useContext(contextAuth);
  const [serviceType, setServiceType] = useState();
  const [planId, setPlanId] = useState();
  const [serviceId, setServiceId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchDataResume = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/zapyourresumeservice/plans`
        );

        const { status, price } = response.data;

        if (status === "success") {
          const showSelectedService = price[0];
          setPlanId(showSelectedService._id);
          setServiceId(showSelectedService._id);
          setServiceType(showSelectedService.serviceName);
          setPlanprice(showSelectedService.price);
        } else {
          throw new Error("Failed to fetch  zap international resume ");
        }
      } catch (error) {
        toast.error("Error fetching  zap international  resume ");
      } finally {
        setLoading(false);
      }
    };
    fetchDataResume();
  }, []);

  const handleBuy = async (e) => {
    e.preventDefault();
    let cartId = null;
    if (localStorage.getItem("cartId") && !token) {
      cartId = JSON.parse(localStorage.getItem("cartId"));
    }

    setLoading(true);

    try {
      // Adding Items to the Cart
      const data = {
        serviceType,
        service: {
          id: serviceId,
          name: serviceType,
        },
        plans: [
          {
            id: planId,
            price: planprice,
          },
        ],
        cartId,
      };
      const addToCartRes = await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/cart/${
          token ? "addtocart" : "add-to-cart"
        }`,
        data,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      const responseCartData = addToCartRes.data;
      if (!responseCartData) {
        throw new Error("Error occurred while adding to Cart");
      } else {
        console.log("Server Response (Add to Cart):", responseCartData);
        toast.success("Package added to cart successfully");
        if (!localStorage.getItem("cartId") && !token) {
          localStorage.setItem(
            "cartId",
            JSON.stringify(responseCartData?.cart?._id)
          );
        }
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error occurred during API requests:", error);
      toast.error(error.message || "Error occurred during API requests");
    } finally {
      setLoading(false);
    }
  };

  // ZAP Your Resume Writing FAQ
  const zapYourResume = [
    {
      title: 'What is the "Zap Your Resume" service?',
      content:
        '"Zap Your Resume" is a professional resume optimization service designed to modernize and enhance your resume, making it more appealing to employers',
    },
    {
      title: "How does the service work?",
      content:
        "The service involves a comprehensive review and refinement of your resume, focusing on modern formatting, keyword optimization, quantifiable achievements, and overall visual appeal. It aims to present your professional story in the best possible light.",
    },
    {
      title: "How long does the resume optimization process take?",
      content:
        "The duration can vary based on individual requirements and the complexity of the resume. Typically, the service aims to be efficient while ensuring a high-quality outcome.",
    },
    {
      title: "How long does the resume optimization process take?",
      content:
        "Yes, the service can tailor your resume for specific job applications, ensuring that it aligns with the requirements of the positions you are targeting.",
    },
  ];

  return (
    <div className="flex flex-col gap-4 mt-1">
      {/* hero section */}
      {/* <div className=' h-[300px] xl:h-[270px]'>
                <div className=' flex flex-col md:flex-row justify-between items-center w-full max-w-[2000px] xl:h-[270px] mx-auto'>
                    <div className='bg-[#2180ba] flex flex-col gap-y-4 xl:gap-y-12 justify-evenly xl:justify-center items-start w-[60%] mx-auto'>
                        <div className='bg-red-400 flex flex-col gap-y-4 xl:gap-y-12 justify-evenly xl:justify-center items-start w-[70%] mx-auto'>
                            <h1 className='text-lg md:text-2xl font-semibold lg:text-left' style={{ fontFamily: 'inter' }}>
                                Ignite Success with a Resume that Speaks <br className='hidden md:block' /> Innovation and Impact!
                            </h1>
                            <h2 className='text-white text-base md:text-2xl lg:text-left font-semibold' style={{ fontFamily: 'inter' }}>
                                Unleash the Power of 'Zap Your Resume' Services
                            </h2>
                        </div>
                    </div>
                    <div className='w-[50%]'>
                        <img src={image2} alt="" loading='lazy' className='hidden object-cover w-full xl:h-[270px] sm:block' />
                    </div>
                </div>
            </div> */}

      <div className="flex flex-col lg:flex-row mx-auto max-w-[2000px] w-full">
        <div className="bg-[#2180ba] w-[100%] flex justify-center flex-col sm:pt-0 lg:w-[60%] max-sm:h-[300px] max-lg:h-[250px] max-lg:px-3">
          <div className="flex flex-col gap-y-8 lg:w-[78%] lg:ml-auto">
            <div className="text-left">
              <div
                className="text-[24px] lg:text-[22px] xl:text-[26px] 2xl:text-3xl xl:!leading-[45px] max-xl:font-bold xl:font-semibold max-lg:text-center lg:text-left"
                style={{ fontFamily: "inter" }}
              >
                Ignite Success with a Resume that{" "}
                <br className="hidden md:block" /> Speaks Innovation and Impact!
              </div>
            </div>
            <div
              className=" text-white text-lg sm:text-xl xl:text-2xl lg:text-left font-semibold"
              style={{ fontFamily: "inter" }}
            >
              Unleash the Power of 'Zap Your Resume' Services
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center lg:w-[40%]">
          <img
            src={image2}
            alt=""
            className="lg:block max-h-[200px] lg:max-h-[300px] xl:w-[85%] lg:mr-auto"
          />
        </div>
      </div>

      {/* Benefits for Zap Your Resume Service */}
      <div className="flex flex-col gap-y-1 xl:gap-y-1">
        <h1
          className="text-lg md:text-[25px] lg:text-2xl xl:text-xl font-semibold  bg-[#f58634] text-white max-[767px]:p-1 md:p-3 lg:py-3"
          style={{ fontFamily: "inter" }}
        >
          Benefits for Zap Your Resume Service
        </h1>

        <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-x-20 p-3 xl:p-4 max-lg:w-[85%] max-xl:w-[80%] xl:w-[75%] max-w-[1500px] mx-auto gap-4">
          <ul
            className=" bg-[#E9EAEC]/20 md:w-[50%] xl:w-[48%] flex flex-col justify-center items-start gap-y-2 md:gap-y-6 xl:gap-y-4 text-base md:text-xl font-light px-3 py-4"
            style={{ fontFamily: "inter" }}
          >
            <li className="flex justify-center items-center gap-x-5 text-left">
              <FaAnglesRight color="#f58634" />
              Modernized Professional Image
            </li>
            <li className="flex justify-center items-center gap-x-5 text-left">
              <FaAnglesRight color="#f58634" />
              ATS Optimization
            </li>
            <li className="flex justify-center items-center gap-x-5 text-left">
              <FaAnglesRight color="#f58634" />
              Quantifiable Achievements
            </li>
            <li className="flex justify-center items-center gap-x-5 text-left">
              <FaAnglesRight color="#f58634" />
              Tech-Savvy Presentation
            </li>
            <li className="flex justify-center items-center gap-x-5 text-left">
              <FaAnglesRight color="#f58634" />
              Increased Visibility
            </li>
            <li className="flex justify-center items-center gap-x-5 text-left">
              <FaAnglesRight color="#f58634" />
              Strategic Keyword Integration
            </li>
          </ul>
          {/* Right part */}
          <div
            className="w-[85%] sm:w-[55%] md:w-[55%] mx-auto lg:w-[33%] flex flex-col gap-y-5 lg:gap-y-6 xl:gap-y-2"
            style={{ fontFamily: "inter" }}
          >
            <h1 className="text-2xl text-center font-semibold">
              Zap Your Resume
            </h1>

            <form className="flex flex-col gap-4 text-center justify-evenly shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.2)] border py-4 md:py-5 rounded-xl lg:rounded">
              <div className="mt-2 p-3 bg-[#D9D9D9]">
                <p
                  className="text-3xl font-medium md:text-4xl lg:text-[26px] text-center text-[#444]"
                  style={{ fontFamily: "Arial" }}
                >
                  {" "}
                  Rs. {planprice}/-
                </p>
                <p className="text-xs">*Applicable Taxes may apply</p>
              </div>
              <Box sx={{ textAlign: "center", padding: "10px" }}>
                <Button
                  type="submit"
                  onClick={handleBuy}
                  variant="contained"
                  style={{ backgroundColor: "rgba(245, 134, 52, 1)" }}
                >
                  Buy Now
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </div>

      <hr />

      {/* Why ZAP Resume? */}
      <div className="flex flex-col gap-y-3 w-[90%] md:w-[70%] max-w-[800px] mx-auto">
        <div className="flex flex-col gap-y-3 w-fit max-md:mx-auto">
          <h1
            className="text-base md:text-xl xl:text-xl font-bold text-left w-fit"
            style={{ fontFamily: "inter" }}
          >
            Why ZAP Resume?
          </h1>
          <hr className="h-[6px] bg-[#F58634] border-[#F58634] text-[#F58634] rounded-xl" />
        </div>
        <div className="flex justify-between items-center">
          <ul
            className="text-xs md:text-lg xl:text-[17px] flex flex-col  gap-y-3 text-left xl:pl-2"
            style={{ fontFamily: "inter" }}
          >
            <li className="flex justify-start items-center gap-x-5">
              <FaAnglesRight color="#f58634" />
              <p>Time Efficiency and Professional Assistance</p>
            </li>
            <li className="flex justify-start items-center gap-x-5">
              <FaAnglesRight color="#f58634" />
              <p className="">Adaptation to Modern Standards</p>
            </li>
            <li className="flex justify-start items-center gap-x-5">
              <FaAnglesRight color="#f58634" />
              <p>Career Confidence Boost</p>
            </li>
            <li className="flex justify-start items-center gap-x-5">
              <FaAnglesRight color="#f58634" />
              <p>Enhanced Readability</p>
            </li>
          </ul>
          <div className="hidden md:block md:w-[35%]">
            <img
              src={image}
              alt=""
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <hr />

      {/* ZAP Your Resume Writing FAQ */}
      <div className="flex flex-col gap-y-3 md:gap-y-10">
        <h1
          className="text-lg md:text-xl xl:text-xl max-[1023px]:p-1 lg:py-3 leading-[30px] font-semibold xl:font-bold bg-[#f58634] text-white"
          style={{ fontFamily: "inter" }}
        >
          ZAP Your Resume Writing FAQ
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 border w-[90%] md:w-[70%] max-w-[1000px] mx-auto">
          {zapYourResume.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-4 md:gap-y-3 leading-10 md:leading-[48px] border text-left p-4"
              style={{ fontFamily: "inter" }}
            >
              <h1 className="text-base font-bold">{item.title}</h1>
              <p className="text-xs md:text-[15px] font-extralight tracking-wide md:tracking-normal leading-8">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Talk to our experts */}
      <Contactus />

      {/* Bolg */}
      <Blog />

      {/* Footer */}
      {/* <Footer/> */}
    </div>
  );
};

export default ZapResume;
