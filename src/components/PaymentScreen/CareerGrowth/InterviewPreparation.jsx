import React, { useEffect, useState, useContext } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Contactus from "../../Contactus";
import Blog from "../../Blog";
import bgImage from "../../../images/Rectangle119.svg";
import toast from "react-hot-toast";
import contextAuth from "../../../ContextAPI/ContextAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InterviewPreparation = () => {
  const [planprice, setPlanprice] = useState();
  const { setLoading, token } = useContext(contextAuth);
  const [serviceType, setServiceType] = useState();
  const [planId, setPlanId] = useState();
  const [serviceId, setServiceId] = useState();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchDataResume = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/interviewpreparationservice/plans`
        );
        console.log(response);

        const { status, price } = response.data;

        if (status === "success") {
          const showSelectedService = price[0];
          console.log(showSelectedService);
          setPlanId(showSelectedService._id);
          setServiceId(showSelectedService._id);
          setServiceType(showSelectedService.serviceName);
          setPlanprice(showSelectedService.price);
        } else {
          throw new Error("Failed to fetch  interview Prep service ");
        }
      } catch (error) {
        toast.error("Error fetching  Interview prep service ");
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
        plans: [
          {
            id: planId,
            price: planprice,
          },
        ],
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
    <>
      <div className="w-full h-auto mx-auto mt-2">
        {/* Section 1 */}
        <div className="flex flex-col lg:flex-row  h-full 2xl:h-[330px] lg:max-h-[500px]">
          <div
            className="bg-cover bg-center flex flex-col gap-4 md:gap-y-8 justify-center lg:text-left h-full py-9 pb-13 lg:h-full w-full items-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div
              className="w-full max-w-[1000px] mx-auto flex flex-col gap-y-5"
              style={{ fontFamily: "poppins" }}
            >
              <h1 className=" font-normal text-xl lg:text-2xl leading-[30px] px-6 sm:px-12 text-start w-[95%] lg-w-[70%] mx-auto">
                Interview Ready: Elevate Your Confidence{" "}
                <br className="hidden lg:block" /> with Expert Guidance
              </h1>
              <p className="font-medium text-base sm:text-xl lg:text-xl text-[#FFFFFF] px-6 sm:px-12 tracking-[2px] leading-[20px] sm:leading-10 text-start  w-[95%] lg-w-[70%] mx-auto">
                Unlock Success with Our Interview Preparation Services
              </p>
            </div>
          </div>
        </div>

        {/*  Second Section  */}

        <div className="p-1 mt-4 lg:w-3/4  max-w-[1500px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-y-5 lg:gap-x-5 w-full lg:my-10 mb-8">
            {/* Left part */}
            <div className="w-[90%] max-lg:mx-auto lg:w-[70%] xl:w-[65%] flex flex-col gap-y-4 xl:gap-y-4 xl:p-7">
              <p className="font-medium  text-base sm:text-3xl md:text-[20px] lg:text-[24px] text-black  md:leading-10 tracking-[2px] text-start  items-center  px-3 md:px-5">
                Why Interview Preparation Matters?
              </p>

              <p
                className="text-[19px] md:text-lg text-start  text-black leading-7 lg:leading-7 tracking-normal lg:tracking-normal lg:p-2  md:[word-spacing:5px] px-3 md:px-5 mx-auto !font-extralight"
                style={{ fontFamily: "poppins" }}
              >
                It ensures candidates are ready to articulate their
                achievements, align with company values, and stand out to
                employers. Comprehensive preparation significantly improves the
                chances of making a positive and lasting impression.
              </p>
            </div>

            {/*  Right part*/}
            <div className="w-[60%] sm:w-[55%] mx-auto lg:w-[35%] flex flex-col gap-y-5 lg:gap-y-1">
              <h1 className=" text-base md:text-xl lg:text-[20px] font-medium text-center">
                Interview Preparation
              </h1>

              <form className="flex flex-col gap-2 pb-3 text-center justify-evenly text-base sm:text-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-2 md:py-5 rounded-xl lg:rounded-none">
                <div className="h-2"></div>
                <div className="mt-3 mb-3 p-4 bg-[#D9D9D9] ">
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

        {/* Section-3  */}
        <div className=" my-14 lg:w-[1000px] max-w-[1500px] mx-auto">
          <h1 className="font-semibold sm:text-xl md:text-2xl lg:text-2xl px-2 py-1 xl:py-2 my-4">
            Mastering the Art of Interview Practice: Your Guide to Success
          </h1>
          <div className="text-center" style={{ fontFamily: "poppins" }}>
            <div className="flex justify-center items-center lg:items-stretch lg:justify-center gap-8 mx-auto  p-2">
              <div className="flex flex-col justify-center items-center gap-y-3 shadow-[rgba(0,_0,_0,_0.14)_0px_0px_10px] w-[85%] sm:w-[70%] md:w-[50%] xl:w-[30%] min-h-[250px] rounded-xl">
                <img
                  src={require("./../../../images/ScreeningServices/Prep1.jpg")}
                  alt=""
                  width={30}
                  height={29}
                  className="mx-auto  w-[50%]"
                />

                <p className="text-base text-[#000000] leading-5 tracking-normal ">
                  Research Company and Job Description
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-4 shadow-[rgba(0,_0,_0,_0.14)_0px_0px_10px] w-[85%] sm:w-[70%] md:w-[50%] xl:w-[30%] min-h-[250px] rounded-xl">
                <img
                  src={require("./../../../images/ScreeningServices/Prep2.jpg")}
                  alt=""
                  width={30}
                  height={30}
                  className="mx-auto w-[40%]"
                />

                <p className="text-base  text-[#000000] leading-5  tracking-normal">
                  Mock Interviews
                </p>
              </div>

              <div className="flex flex-col justify-center items-center gap-y-4 shadow-[rgba(0,_0,_0,_0.14)_0px_0px_10px] w-[85%] sm:w-[70%] md:w-[50%] xl:w-[30%] min-h-[250px] rounded-xl">
                <img
                  src={require("./../../../images/ScreeningServices/Prep3.jpg")}
                  alt=""
                  width={30}
                  height={30}
                  className="mx-auto w-[40%]"
                />

                <p className="text-base  text-[#000000] leading-5  tracking-normal ">
                  Prepare Thoughtful Questions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*  Interview Prep Section  */}

        <div className="">
          <h1 className="bg-[#F58634] font-semibold sm:text-lg md:text-xl lg:text-xl py-3">
            Decoding Interview Preparation: A Strategic Approach to Success
          </h1>

          <div className="flex gap-x-1 xl:gap-x-4  w-[90%] lg:w-3/4 max-w-[1500px] justify-center items-center mx-auto py-5">
            <div className="hidden md:block w-[40%]">
              <img
                src={require("./../../../images/ScreeningServices/pic.jpg")}
                alt=""
                className=" h-full"
              />
            </div>

            <div className="w-[95%] lg:w-[70%] xl:w-[60%]">
              <p
                className="text-xs md:text-base text-justify  text-black font-light leading-2 lg:leading-6  xl:leading-7 tracking-normal lg:p-2 [word-spacing:7px] px-3 md:px-5 mx-auto"
                style={{ fontFamily: "poppins" }}
              >
                Interview preparation involves strategic planning and practice
                to enhance one's readiness for a job interview. It includes
                researching the company, understanding the job role, developing
                responses to common and behavioral questions, practicing with
                mock interviews, refining communication and body language, and
                seeking feedback for continuous improvement. The goal is to
                present oneself confidently and effectively during the interview
                process.{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Contact us */}
        <Contactus />

        <Blog />

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default InterviewPreparation;
