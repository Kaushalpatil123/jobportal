import React, { useEffect, useState, useContext } from "react";
import Rectangle105 from "../../../images/CombosHighlights/Rectangle105.png";
import Blog from "../../Blog";
import image87 from "../../../images/CombosHighlights/image87.png";
import Contactus from "../../Contactus";
import toast from "react-hot-toast";
import contextAuth from "../../../ContextAPI/ContextAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button } from "@mui/material";

const CombosHighlights = () => {
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
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/combosHighlightsService/plans`
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
          throw new Error("Failed to fetch  Combo Highlight service ");
        }
      } catch (error) {
        toast.error("Error fetching   Combo Highlight  service ");
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
    <div className="w-full">
      {/*********************** herobanner **********************/}
      <div className="flex flex-col-reverse lg:flex-row mx-auto max-w-[2000px] h-[350px] w-full">
        <div className="bg-[#F58634] w-[100%] flex justify-center flex-col gap-y-8 sm:pt-0 lg:w-[60%]">
          <h1 className="w-[100%] md:w-[90%] mx-auto text-left px-5 sm:px-14 md:px-20 lg:px-8 py-3 text-3xl font-medium leading-[55px]">
            Combo Highlights: Elevate Your Resume with Expert Crafting from
            Highlight Your Resume and Visual Appeal from Zap Your Resume
          </h1>
        </div>
        <div className="w-full flex justify-center lg:w-[40%]">
          <img
            src={require("./../../../images/image 200.png")}
            alt="CoverImage"
            className="lg:block w-full h-auto"
          />
        </div>
      </div>

      <div className="border-1 mx-auto flex flex-col items-center shadow-lg my-14">
        <div className="mx-auto mt-[13px] flex w-[270px] items-center justify-center rounded-[15px] bg-[#F58634] sm:w-[350px] md:w-[450px] lg:w-[570px]">
          <div className="font-inter text-lg font-semibold leading-[65px]  text-white sm:text-3xl sm:leading-[75px] md:text-4xl md:leading-[100px]">
            Combo Highlights
          </div>
        </div>

        {/********************* table  ***********************/}
        <div className=" mx-auto w-[90%] pt-[60px] sm:pt-[76px] md:w-[80%] lg:w-[70%] max-w-[1500px]">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-white sm:h-[1043px] xl:h-[800px]">
              <thead className="align-middle font-semibold">
                <tr>
                  <th className="border-1 border-white  !bg-[#4472c4] text-center text-lg sm:text-xl  text-white sm:py-6 w-[50%] sm:w-[60%]">
                    Doledge
                    <br className="md:hidden" /> Benefits
                  </th>
                  <th className="border-1 border-white  !bg-[#4472c4] text-center text-base sm:text-xl !text-white  px-1">
                    Highlight Your Resume <br />
                    Rs.3599/-
                  </th>
                  <th className="border-1 border-white  !bg-[#4472c4] text-center text-base sm:text-xl  !text-white  px-1">
                    Zap Your Resume <br /> Rs.5299/-
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#f2f2f2] border-white max-sm:text-base  text-lg">
                <tr className="">
                  <td className="benefit border-2 border-white  pl-3 text-left max-sm:py-1">
                    Ensuring recruiters focus on your most impactful
                    qualifications
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5 ">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                </tr>
                <tr className="">
                  <td className="border-2 border-white pl-3 text-left">
                    Visual elements to enhance the overall look of your resume
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                </tr>
                <tr className="">
                  <td className="border-2 border-white pl-3 text-left">
                    Match the specific requirements of your target industry or
                    job application
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                  <td className="border-2 border-white text-center sm:px-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                </tr>

                <tr className="">
                  <td className="border-2 border-white pl-3 text-left">
                    Optimize your resume for Applicant Tracking Systems [ATS].
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                </tr>

                <tr className="">
                  <td className="border-2 border-white pl-3 text-left">
                    Incorporate quantifiable metrices to highlight your
                    achievements
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                </tr>

                <tr className="">
                  <td className="border-2 border-white pl-3 text-left">
                    Showcase your proficiency with technology by incorporating
                    innovative design elements and digital enhancements
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                </tr>
                <tr className="">
                  <td className="border-2 border-white pl-3 text-left">
                    Streamline the resume creation process with profesional
                    assistance
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                </tr>
                <tr className="">
                  <td className="border-2 border-white pl-3 text-left">
                    Enhanced exposure to an extensive network of over 100,000
                    recruiters, expanding your professional reach
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                </tr>
                <tr className="">
                  <td className="border-2 border-white pl-3 text-left">
                    Expertly crafted profile for a standard presentation,
                    ensuring a more compelling and responsive appeal.
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                  <td className="border-2 border-white text-center  sm:px-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={30}
                      width={30}
                      className="mx-auto"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="green"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/************************ combo offer section *********************/}
        <div className="w-[90%] pt-[10px] sm:pt-[10px] md:w-[70%] max-w-[1500px]">
          <div className="flex sm:flex-row">
            <div className="w-full sm:w-[70%]">
              <div className="non-italic mt-4 text-[20px] font-semibold tracking-[0] text-black [font-family:'Poppins-SemiBold',Helvetica] sm:ml-5 sm:text-left md:mt-4">
                Combo Offer
              </div>
              {/* <div
                className="non-italic mt-3 text-xl font-medium tracking-[0] text-black [font-family:'Poppins-SemiBold',Helvetica] sm:ml-5 sm:text-left md:pr-7 lg:mt-4 lg:text-2xl"
                style={{ fontFamily: "poppins" }}
              >
                Highlight Your Resume<br className="sm:hidden"/> + <br className="sm:hidden"/>Zap Your Resume
              </div> */}
              <div
                className="non-italic mt-3 text-xl font-medium tracking-[0] text-black [font-family:'Poppins-SemiBold',Helvetica] sm:ml-5 sm:text-left md:pr-7 lg:mt-4 lg:text-[20px] max-sm:px-8"
                style={{ fontFamily: "poppins" }}
              >
                Highlight Your Resume + Zap Your Resume
              </div>

              <div className="non-italic mt-3 text-[20px] font-semibold  tracking-[0] text-black [font-family:'Poppins-SemiBold',Helvetica] sm:ml-5 sm:text-left md:mt-5">
                Rs. <span className="line-through">8898/</span>-
              </div>
              <div className="non-italic mt-3 text-[20px] font-semibold  tracking-[0] text-black [font-family:'Poppins-SemiBold',Helvetica] sm:ml-5 sm:text-left lg:mt-4">
                {planprice}/-
              </div>
              <div className="non-italic mt-3 text-[20px] font-medium tracking-[0]  text-black [font-family:'Poppins-SemiBold',Helvetica] sm:ml-5 sm:text-left sm:text-xl lg:mt-4 lg:text-2xl ">
                {" "}
                You Save - Rs.1099/-
              </div>

              {/* <div className="mt-4 max-sm:mx-auto max-sm:mb-5 md:translate-x-[10%] lg::translate-x-[15%] sm:tram flex h-12 w-44 items-center justify-center rounded-2xl bg-[#F58634]  hover:bg-black sm:ml-6">
                <div className="mt-4 text-xs">
                  *Applicable Taxes may apply
                </div>
                <button
                  onClick={handleBuy}
                  className="font-family:'Inter-Regular',Helvetica text-justify text-2xl font-semibold text-[#FFF8F8]"
                >
                  Buy Now
                </button>
              </div> */}
              <div className="mt-4 max-sm:mx-auto max-w-[250px]">
                <p className="text-xs text-center mb-2">
                  *Applicable Taxes may apply
                </p>
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
              </div>
            </div>
            <div className=" flex justify-end md:h-[465px] w-fit">
              <img
                src={image87}
                alt="image87"
                className=" mt-1 hidden sm:block sm:h-3/5 sm:w-4/5 lg:h-4/5 xl:h-[401px] xl:w-[401px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/********************  Contact us *************************/}
      <Contactus />
      <Blog />
    </div>
  );
};

export default CombosHighlights;
