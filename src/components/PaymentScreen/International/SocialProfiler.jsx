import React, { useEffect, useState, useContext } from "react";
import image2 from "../../../images/SocialProfiler.png";
import bulleticon from "../../../images/bullet.png";
import Contactus from "../../Contactus";
import Blog from "../../Blog";
import image from "../../../images/image 150.png";
import toast from "react-hot-toast";
import contextAuth from "../../../ContextAPI/ContextAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const SocialProfiler = () => {
  const [planprice, setPlanprice] = useState();
  const { setLoading, token } = useContext(contextAuth);
  const [serviceType, setServiceType] = useState();
  const [serviceId, setServiceId] = useState();
  const [planId, setPlanId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchDataResume = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/socialprofilerservice/plans`
        );

        const { status, price } = response.data;

        if (status === "success") {
          const showSelectedService = price[0];
          console.log(showSelectedService);
          setPlanId(showSelectedService._id);
          setServiceId(showSelectedService._id);
          setServiceType(showSelectedService.serviceName);
          setPlanprice(showSelectedService.price);
        } else {
          throw new Error("Failed to fetch  Social Profiler service ");
        }
      } catch (error) {
        toast.error("Error fetching  Social Profiler service ");
      } finally {
        setLoading(false);
      }
    };
    fetchDataResume();
  }, []);

  const handleBuy = async (e) => {
    e.preventDefault();
    let cartId=null;
    if(localStorage.getItem("cartId") && !token){
      cartId=JSON.parse(localStorage.getItem("cartId"));
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
        plans:[{
          id: planId,
          price: planprice,
        }],
        cartId
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
          localStorage.setItem("cartId", JSON.stringify(responseCartData?.cart?._id));
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

  return (
    <div>
      {/* hero section */}
      <div className="flex flex-col lg:flex-row h-full xl:h-[350px] max-w-[1900px] mx-auto">
        {/* left part */}
        <div className="hidden lg:block w-full lg:w-[50%] xl:w-[43%]">
          <img src={image} loading="lazy" className="w-full lg:h-[350px]" />
        </div>
        {/* right part */}
        <div className="font-semibold bg-[#4B57A3] flex flex-col gap-4 md:gap-y-2 justify-center lg:text-left h-full py-10 pb-16 lg:h-[350px] w-full lg:w-[50%] xl:w-[57%]">
          <div
            className="  text-white sm:text-[20px] lg:text-[25px] leading-[50px] sm:leading-[10px] lg:leading-[20px] xl:leading-[30px]  sm:px-14"
            style={{ fontFamily: "inter" }}
          >
            <p className="pl-6 text-3xl md:leading-[45px]">
              Transform Your Presence with Our <br /> Social Profiler Service
            </p>
          </div>

          <p className="text-lg sm:text-[35px] lg:text-[20px] text-[#F58634] max-sm:px-5 sm:px-14 tracking-2px leading-30px sm:leading-10 lg:leading-[30px]">
            <p className="pl-6"> Uncover, Amplify, Succeed!</p>
          </p>
        </div>
      </div>

      {/*  Second Section  */}

      <div className="mt-4 w-[90%] lg:w-[80%] xl:w-[75%] max-w-[1500px] mx-auto">
        <div className="flex flex-col lg:flex-row xl:items-stretch justify-between gap-y-8 w-full gap-x-10 lg:my-10 mb-8">
          {/* Left part */}
          <div
            className="w-full md:w-[80%] mx-auto lg:w-[57%] flex flex-col gap-y-4"
            style={{ fontFamily: "poppins" }}
          >
            <p className="font-semibold text-xl max-lg:text-center sm:text-[28px] xl:text-[23px] text-black md:leading-[40px] xl:leading-[67px] lg:text-start items-center">
              Unlock Success with Social Profiles
            </p>

            <p className="text-[17px] text-black leading-8 md:leading-[40px] lg:leading-7 tracking-normal md:word-spacing-9 mx-auto text-justify">
              A social profile service is vital for shaping a positive online
              image, influencing career prospects, and networking.
              Professionally managed profiles on social media enhance your
              reputation, presenting individuals and businesses in the best
              light for success in today's digital landscape.
            </p>
          </div>

          {/* Right part */}
          <div
            className="w-[85%] sm:w-[55%] md:w-[55%] mx-auto lg:w-[33%] flex flex-col gap-y-5 xl:pt-4 lg:gap-y-6 xl:gap-y-2"
            style={{ fontFamily: "inter" }}
          >
            <h1 className="text-xl md:text-xl text-center font-semibold">
              Social Profiler
            </h1>

            <form className="flex flex-col gap-4 text-center justify-evenly text-base sm:text-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-4 md:py-5 rounded-xl lg:rounded-none">
              <div className="mt-3 p-4 bg-[#D9D9D9]">
                <p
                  className="text-3xl font-medium md:text-4xl lg:text-[26px] text-center text-[#444]"
                  style={{ fontFamily: "arial" }}
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

      {/* Third Section */}

      <h1
        className="font-semibold text-xl lg:text-xl max-md:p-2 md:py-2 bg-[#F58634] mb-8"
        style={{ fontFamily: "inter" }}
      >
        Unlocking Success with Social Profiler
      </h1>

      {/* fourth Section*/}

      <div
        className="flex flex-col justify-center items-center mt-2 gap-y-6 w-[90%] xl:w-[70%] max-w-[1500px] mx-auto mb-6"
        style={{ fontFamily: "inter" }}
      >
        {/* <h1 className='font-medium text-3xl leading-[53px] self-start'>
                    Document Verification Services FAQs: Your Questions Answered
                </h1> */}
        <div className="flex justify-between items-center">
          <div className="w-[35%] hidden md:block">
            <img
              src={image2}
              alt=""
              className="w-[90%] object-contain mx-auto"
            />
          </div>
          <div className="flex flex-col gap-y-5 md:w-[63%]">
            <div className="text-left  flex flex-col gap-y-3">
              <h2 className="text-lg lg:text-lg md:leading-[42px]">
                Professional Image
              </h2>
              <p className="text-base lg:text-base tracking-normal font-extralight md:leading-[40px] md:text-justify">
                Craft a polished and professional online presence
              </p>
            </div>
            <div className="text-left  flex flex-col gap-y-3">
              <h2 className="text-lg lg:text-lg md:leading-[42px]">
                Career Opportunities
              </h2>
              <p className="text-base lg:text-base tracking-normal font-extralight md:leading-[40px] md:text-justify">
                Enhance visibility for improved job prospects and networking
              </p>
            </div>
            <div className="text-left  flex flex-col gap-y-3">
              <h2 className="text-lg lg:text-lg md:leading-[42px]">
                Networking Advantage
              </h2>
              <p className="text-base lg:text-base tracking-normal font-extralight md:leading-[40px] md:text-justify">
                Facilitate effective networking by showcasing skills and
                achievements
              </p>
            </div>
            <div className="text-left  flex flex-col gap-y-3">
              <h2 className="text-lg lg:text-lg leading-[42px]">
                Visibility in Searches
              </h2>
              <p className="text-base lg:text-base tracking-normal font-extralight md:leading-[40px] md:text-justify">
                Increase visibility in online searches, making it easier for
                others to find and connect with you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FIfth Section Points */}
      <div
        className="flex flex-col justify-center items-center my-12"
        style={{ fontFamily: "inter" }}
      >
        <h1 className="font-medium text-[25px] lg:text-[25px] leading-[35px] mb-4 px-2 bg-[#F58634] w-full py-3">
          Unlocking Your Digital Potential: How Our Social Profiler Service
          Works
        </h1>

        {/* <div className="flex justify-center"> */}
        <div className="flex justify-center align-center w-[90%] md:w-[85%] lg:w-[70%] mx-auto max-w-[1500px]">
          <div className="mt-1 p-3 max-sm:p-6 xl:!p-14 bg-white rounded-lg border-2 flex flex-col gap-y-3 text-justify">
            <div className="flex items-center gap-x-2 mb-2">
              <div className="w-6 h-6 mr-3">
                <img src={bulleticon} alt="" className="w-full" />
              </div>
              <p className="self-start text-[14px] text-justify text-gray-800 font-light">
                Begin with a personalized consultation to understand your goals,
                target audience, and desired online image.
              </p>
            </div>

            <div className="flex mb-2 gap-x-2 items-center">
              <div className="w-6 h-6 mr-3">
                <img src={bulleticon} alt="" className="w-full" />
              </div>
              <p className="self-start text-[14px] text-justify text-gray-800 font-light">
                Evaluate the quality and relevance of your existing content,
                providing recommendations for improvement.
              </p>
            </div>

            <div className="flex gap-x-2 mb-2 items-center">
              <div className="w-6 h-6 mr-3">
                <img src={bulleticon} alt="" className="w-full" />
              </div>
              <p className="self-start text-[14px] text-justify text-gray-800 font-light">
                Align your social media presence with your personal or
                professional brand, ensuring a cohesive and impactful image.
              </p>
            </div>

            <div className="flex gap-x-2 mb-2 items-center">
              <div className="w-6 h-6 mr-3">
                <img src={bulleticon} alt="" className="w-full" />
              </div>
              <p className="self-start text-[14px] text-justify text-gray-800 font-light">
                Develop a strategy for engaging with your target audience,
                fostering meaningful connections and interactions.
              </p>
            </div>

            <div className="flex gap-x-2 mb-2 items-center">
              <div className="w-6 h-6 mr-3">
                <img src={bulleticon} alt="" className="w-full" />
              </div>
              <p className="self-start text-[14px] text-justify text-gray-800 font-light">
                Generate compelling and relevant content to enhance your
                profile, including bio, posts, and visual elements.
              </p>
            </div>

            <div className="flex gap-x-2 mb-2 items-center">
              <div className="w-6 h-6 mr-3">
                <img src={bulleticon} alt="" className="w-full" />
              </div>
              <p className="self-start text-[14px] text-justify text-gray-800 font-light">
                Implement strategies to manage and enhance your online
                reputation, addressing any negative content or misinformation.
              </p>
            </div>

            <div className="flex gap-x-2 mb-2 items-center">
              <div className="w-6 h-6 mr-3">
                <img src={bulleticon} alt="" className="w-full" />
              </div>
              <p className="self-start text-[14px] text-justify text-gray-800 font-light">
                Regularly provide insights and analytics on the performance of
                your social media profiles, enabling informed decisions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts */}

      <Contactus />
      <Blog />
    </div>
  );
};

export default SocialProfiler;
