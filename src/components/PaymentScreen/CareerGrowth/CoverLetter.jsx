import React, { useEffect, useRef, useState, useContext } from "react";
import "../../../css/services.css";
import BgImage from "../../../images/coverletterBanner.png";
import toast from "react-hot-toast";
import contextAuth from "../../../ContextAPI/ContextAuth";
import { FaAnglesRight } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import resume1 from "../../../images/resume1.png";
import resume2 from "../../../images/resume2.png";
import resume3 from "../../../images/resume3.png";
import resume4 from "../../../images/resume4.png";
import Contactus from "../../Contactus";
import Blog from "../../Blog";
import image1 from "../../../images/image 167.png";
import icon from "../../../images/image 168.png";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import { Box, Button } from "@mui/material";
// register Swiper custom elements

const CoverLetter = () => {
  const [planprice, setPlanprice] = useState();
  const { setLoading, token } = useContext(contextAuth);
  const [serviceType, setServiceType] = useState();
  const [planId, setPlanId] = useState();
  const [serviceId, setServiceId] = useState();
  const navigate = useNavigate();

  const swiperRef = useRef(null);

  useEffect(() => {
    register();
    // Object with parameters
    const params = {
      pagination: {
        clickable: true,
        dynamicBullets: true,
      },
      centeredSlides: true,
      autoplay: true,
      loop: true,
      // navigation
    };

    // Assign it to swiper element
    Object.assign(swiperRef.current, params);

    // initialize swiper
    swiperRef.current.initialize();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchDataResume = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/coverletterservice/plans`
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
    let cartId=null;
    if(localStorage.getItem("cartId") && !token){
      cartId=JSON.parse(localStorage.getItem("cartId"));
    }
    e.preventDefault();

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
        console.log("ADD TO CART RESPONSE ........", responseCartData);
        toast.success("Package added to cart successfully");
        if (!localStorage.getItem("cartId") && !token) {
          localStorage.setItem("cartId", JSON.stringify(responseCartData?.cart?._id));
        }
        navigate("/cart");
        // console.log(`/cart${token?"":`/${responseCartData?.cart?._id}`}`)
      }
    } catch (error) {
      console.error("Error occurred during API requests:", error);
      toast.error(error.message || "Error occurred during API requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-8" style={{ fontFamily: "inter" }}>
      {/* hero section */}
      <section className="flex justify-center w-full max-w-[2000px] mx-auto">
        <div className="bg-[#F58634] text-white max-md:text-center text-left flex flex-col gap-y-4 justify-center max-md:items-center items-start py-4 p-2 !pl-5 xl:!pl-10 w-full md:w-[35%]">
          <h1 className="text-2xl md:text-2xl xl:text-3xl text-white min-[1800px]:text-4xl max-md:tracking-wide   max-md:leading-[38px] xl:leading-[42px] min-[1800px]:leading-[50px] font-semibold">
            Crafting Your Success <br className="" /> Story: Professional Cover{" "}
            <br className="" /> Letter Services
          </h1>
          <p className="md:text-lg min-[1800px]:text-xl">
            Unlock Opportunities with Tailored Cover Letters{" "}
            <br className="max-[500px]:hidden md:max-[1400px]:hidden" /> That
            Speak Your Success
          </p>
        </div>
        <img
          src={BgImage}
          alt=""
          loading="lazy"
          className="max-md:hidden w-[65%]"
        />
      </section>

      {/* section 2 */}
      <section className="flex flex-col max-lg:gap-y-5">
        <h1 className="text-2xl xl:text-2xl font-bold bg-[#F58634] px-3 py-3">
          Unveiling the Power of Cover Letters: Why They're Essential for Your
          Success
        </h1>

        <div className=" flex flex-col gap-y-10 lg:gap-y-5 mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-y-8 mx-auto lg:my-10 mb-8 gap-x-8 w-[90%] lg:w-[80%] xl:w-[70%] max-w-[1500px]">
            {/* Left part */}
            <div className="w-full md:w-[80%] mx-auto lg:w-[55%] max-w-[600px]">
              <p className="text-lg md:text-xl text-black leading-8 md:leading-[40px] lg:leading-10 tracking-[9%] md:word-spacing-15 mx-auto text-justify font-light">
                A cover letter serves as your personal introduction to potential
                employers, offering a platform beyond your resume to showcase
                your candidacy. It's pivotal in today's competitive job market
                for several reasons. Firstly, it allows you to elaborate on your
                achievements and experiences, providing context that may not be
                evident in your resume alone. Tailoring your cover letter to the
                specific role and company demonstrates your understanding of
                their needs, showcasing your fit for the position.
              </p>
            </div>

            {/* Right part */}
            <div
              className="w-[85%] sm:w-[55%] md:w-[55%] mx-auto lg:w-[33%] flex flex-col gap-y-5 lg:gap-y-6 xl:gap-y-2"
              style={{ fontFamily: "inter" }}
            >
              <h1 className="text-2xl text-center font-semibold">
                Cover Letter
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

          <div className=" main  flex flex-col gap-y-10 lg:gap-y-16">
            <h1 className=" border-y-[2px] border-[#83828233] w-full mx-auto  text-2xl sm:text-3xl font-bold max-sm:px-3 sm:px-10 md:px-20 py-6 ">
              Doledge Sample Cover Letters
            </h1>
            <div className=" sample lg:w-[80%] xl:w-[70%] max-w-[1500px] mx-auto">
              <swiper-container init="false" ref={swiperRef}>
                <swiper-slide>
                  <img
                    src={resume1}
                    alt=""
                    loading="lazy"
                    className="border max-w-[80%] mx-auto max-h-[900px]"
                  />
                </swiper-slide>
                <swiper-slide>
                  <img
                    src={resume2}
                    alt=""
                    loading="lazy"
                    className="border max-w-[80%] mx-auto max-h-[900px]"
                  />
                </swiper-slide>
                <swiper-slide>
                  <img
                    src={resume3}
                    alt=""
                    loading="lazy"
                    className="border max-w-[80%] mx-auto max-h-[900px]"
                  />
                </swiper-slide>
                <swiper-slide>
                  <img
                    src={resume4}
                    alt=""
                    loading="lazy"
                    className="border max-w-[80%] mx-auto max-h-[900px]"
                  />
                </swiper-slide>
              </swiper-container>
            </div>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section className="flex flex-col gap-y-6 mt-4">
        <h1 className="text-3xl font-bold bg-[#F58634] px-2 py-3">
          Unlock Opportunities with Tailored Cover Letters That Speak Your
          Success
        </h1>
        <div className="flex flex-col gap-y-6 sm:gap-y-12 w-[90%] lg:w-[70%] xl:w-[70%] mx-auto max-w-[1500px]">
          <h2 className="font-medium text-xl sm:text-2xl text-center w-[90%] mx-auto">
            In today's competitive job market, a compelling cover letter can be{" "}
            <br className="max-[1100px]:hidden" /> the key to unlocking career
            opportunities. Here's why
          </h2>
          <div className="flex justify-between items-center">
            {/* left */}
            <div className="flex flex-col gap-y-4 sm:gap-y-8 w-[95%] max-lg:mx-auto lg:w-[50%]">
              <div className="flex items-center gap-x-5">
                <img
                  src={icon}
                  alt=""
                  loading="lazy"
                  className="h-6 w-6 md:w-9 md:h-9"
                />
                <p className="text-lg leading-[35px] text-justify tracking-[3%] font-light">
                  It introduces you beyond your resume, showcasing your
                  personality and passion for the role
                </p>
              </div>
              <div className="flex items-center gap-x-5">
                <img
                  src={icon}
                  alt=""
                  loading="lazy"
                  className="h-6 w-6 md:w-9 md:h-9"
                />
                <p className="text-lg leading-[35px] text-justify tracking-[3%] font-light">
                  Tailoring your cover letter to the specific role and company
                  demonstrates your understanding of their needs and how you can
                  fulfill them
                </p>
              </div>
              <div className="flex items-center gap-x-5">
                <img
                  src={icon}
                  alt=""
                  loading="lazy"
                  className="h-6 w-6 md:w-9 md:h-9"
                />
                <p className="text-lg leading-[35px] text-justify tracking-[3%] font-light">
                  Provides an opportunity to address any potential concerns or
                  gaps in your resume proactively
                </p>
              </div>
              <div className="flex items-center gap-x-5">
                <img
                  src={icon}
                  alt=""
                  loading="lazy"
                  className="h-6 w-6 md:w-9 md:h-9"
                />
                <p className="text-lg leading-[35px] text-justify tracking-[3%] font-light">
                  Submitting a polished cover letter demonstrates
                  professionalism and attention to detail, qualities valued by
                  employers
                </p>
              </div>
            </div>
            {/* right */}
            <img
              src={image1}
              alt=""
              loading="lazy"
              className="max-lg:hidden w-[45%] h-fit"
            />
          </div>
        </div>
      </section>

      <Contactus />
      <Blog />
    </div>
  );
};

export default CoverLetter;
