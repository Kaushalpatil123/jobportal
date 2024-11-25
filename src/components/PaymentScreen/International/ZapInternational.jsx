import React, { useEffect, useState, useContext } from "react";
import Image1 from "../../../images/Rectangle 173.png";
import Image2 from "../../../images/image 172.png";
import Icon from "../../../images/image 184.png";
import { SlArrowRight } from "react-icons/sl";
import Blog from "../../Blog";
import Contactus from "../../Contactus";
import toast from "react-hot-toast";
import contextAuth from "../../../ContextAPI/ContextAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const ZapInternational = () => {
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
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/zapresumeinternationalservice/plans`
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
        plans: [{
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
    <div className="flex flex-col gap-y-10" style={{ fontFamily: "inter" }}>
      {/* hero section */}
      <section className="flex flex-col lg:flex-row h-full lg:max-h-[450px] min-[1900px]:max-h-[500px] w-full max-w-[2000px] mx-auto">
        {/* left part */}
        <div className="hidden sm:block w-full h-[300px] lg:h-auto lg:w-[55%]">
          <img
            src={Image1}
            alt=""
            className="h-full w-full object-fill"
            loading="lazy"
          />
        </div>
        {/* right part */}
        <div className="bg-[#F0AF73] flex flex-col gap-4 md:!gap-y-4 lg:!gap-y-8 justify-center lg:text-left h-full lg:h-auto w-full lg:w-[45%] py-4 ">
          <h1 className=" text-3xl xl:text-[38px] lg:text-[32px] font-semibold leading-[50px] sm:leading-[45px] px-6 sm:px-12 ">
            Zap Your Resume <br className="hidden " /> International
          </h1>
          <p className=" text-xl sm:text-[20px] lg:text-[24px] max-sm:px-4 sm:px-12 leading-8 ">
            Elevate Your Career with Dynamic <br className="hidden xl:block" />{" "}
            Resumes That Make an Impact Globally
          </p>
        </div>
      </section>

      {/* section 2 */}
      <section className="flex flex-col max-lg:gap-y-8">
        <h1 className="text-[22px] sm:text-[25px] md:text-[28px] xl:text-[25px] md:leading-[40px] tracking-[2%] font-bold bg-[#F58634] px-3 py-3">
          The Importance of Zap Your Resume International <br />
          for Career Advancement
        </h1>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-8 gap-x-6 lg:my-10 mb-8 w-[80%] xl:w-[70%] max-w-[1500px] mx-auto">
          {/* Left part */}
          <div className="w-full md:w-[80%] lg:w-[57%] max-w-[600px]">
            <p className="text-lg md:text-xl lg:text-[22px] text-black leading-8 md:leading-[40px] lg:leading-[43px] tracking-[2%] mx-auto text-justify font-light">
              In today's globalized job market, standing out among the
              competition is paramount. "Zap Your Resume International" offers a
              unique solution. By harnessing innovative resume techniques
              tailored to international standards, it ensures your profile
              captivates employers worldwide. Zap Your Resume International
              maximizes your potential for career advancement.
            </p>
          </div>

          {/* Right part */}
          <div className="w-[37%] max-sm:hidden">
            <img src={Image2} alt="" className="w-full max-h-[450px]" />
          </div>
        </div>

        <div className="bg-[#f9f9f9] border-y">
          <div className="lg:w-[80%] xl:w-[70%] max-w-[1500px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-y-8 gap-x-14 my-10">
            {/* left */}
            <div className="shadow-[2.0px_2.0px_8px_rgba(0,0,0,0.10),-2.0px_-2.0px_8px_rgba(0,0,0,0.10)] border rounded px-4 py-4 tracking-wide max-sm:w-[85%] max-md:w-[80%] max-lg:w-[70%] w-[60%] flex flex-col gap-y-5 md:gap-y-8 xl:gap-y-10">
              <h1 className="text-xl text-left font-semibold leading-[40px]">
                Unlocking Global Oppurtunities: The Advantages of{" "}
                <br className="max-[1400px]:hidden" /> Zap Your Resume
                International
              </h1>
              <div className="grid sm:grid-cols-2 gap-x-2 gap-y-6 text-base font-medium">
                <div className="flex justify-start items-center gap-x-3">
                  <SlArrowRight size={15} />
                  <p className="text-gray-500/80 text-left">Global Appeal</p>
                </div>
                <div className="flex justify-start items-center gap-x-3">
                  <SlArrowRight size={15} />
                  <p className="text-gray-500/80 text-left">
                    Language Localization
                  </p>
                </div>
                <div className="flex justify-start items-center gap-x-3">
                  <SlArrowRight size={15} />
                  <p className="text-gray-500/80 text-left">
                    Enhanced Visibility
                  </p>
                </div>
                <div className="flex justify-start items-center gap-x-3">
                  <SlArrowRight size={15} />
                  <p className="text-gray-500/80 text-left">
                    Elevate Professional Branding
                  </p>
                </div>
                <div className="flex justify-start items-center gap-x-3">
                  <SlArrowRight size={15} />
                  <p className="text-gray-500/80 text-left">
                    Tailored Precision
                  </p>
                </div>
                <div className="flex justify-start items-center gap-x-3">
                  <SlArrowRight size={15} />
                  <p className="text-gray-500/80 text-left">
                    Industry Recognition
                  </p>
                </div>
                <div className="flex justify-start items-center gap-x-3">
                  <SlArrowRight size={15} />
                  <p className="text-gray-500/80 text-left">
                    Increased Oppurtunities
                  </p>
                </div>
                <div className="flex justify-start items-center gap-x-3">
                  <SlArrowRight size={15} />
                  <p className="text-gray-500/80 text-left">Career Mobility</p>
                </div>
              </div>
            </div>
            {/* Right part */}
            <div
              className="w-[85%] sm:w-[55%] md:w-[55%] mx-auto lg:w-[33%] flex flex-col gap-y-5 lg:gap-y-6 xl:gap-y-2"
              style={{ fontFamily: "inter" }}
            >
              <h1 className="text-xl text-center font-semibold">
                Zap Your Resume International
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
      </section>

      {/* secton 3 */}
      <section className="flex flex-col gap-y-16">
        <h1 className="font-semibold text-3xl leading-[55px] tracking-[2%] text-center bg-[#62B01EBF] px-2 py-3">
          Everything You Need to Know About <br /> Zap Your Resume International
        </h1>
        <div className="max-md:w-[95%] max-[860px]:!w-[85%] mx-auto flex justify-start items-start gap-x-10 max-w-[800px]">
          {/* left */}
          <div className="flex flex-col justify-center items-center gap-3 w-[20%] h-[820px] mt-5 max-sm:hidden">
            <img src={Icon} alt="" className="w-[80px] h-[80px]" />
            <div className="bg-[#F58634] h-full w-1"></div>
            <img src={Icon} alt="" className="w-[80px] h-[80px]" />
            <div className="bg-[#F58634] h-full w-1"></div>
            <img src={Icon} alt="" className="w-[80px] h-[80px]" />
            <div className="bg-[#F58634] h-full w-1"></div>
            <img src={Icon} alt="" className="w-[80px] h-[80px]" />
          </div>
          {/* right */}
          <div className="flex flex-col justify-center items-start gap-y-7">
            <div className="flex flex-col gap-y-4 tracking-[2%]">
              <h2 className="max-[860px]:text-2xl text-[25px] text-left leading-[45px]">
                What is Zap Your Resume International?
              </h2>
              <p className="font-light text-lg text-justify leading-[37px] sm:leading-[45px]">
                Zap Your Resume International is a specialized service that
                helps individuals craft resumes tailored to international
                standards, enhancing their global career prospects.
              </p>
            </div>
            <div className="flex flex-col gap-y-4 tracking-[2%]">
              <h2 className="max-[860px]:text-2xl text-[25px] text-left leading-[45px]">
                How does Zap Your Resume International differ from traditional
                resume services?
              </h2>
              <p className="font-light text-lg text-justify leading-[37px] sm:leading-[45px]">
                Zap Your Resume International focuses specifically on optimizing
                resumes for international job markets, considering factors such
                as cultural nuances and industry standards worldwide.
              </p>
            </div>
            <div className="flex flex-col gap-y-4 tracking-[2%]">
              <h2 className="max-[860px]:text-2xl text-[25px] text-left leading-[45px]">
                Can I use Zap Your Resume International for any industry or
                profession?
              </h2>
              <p className="font-light text-lg text-justify leading-[37px] sm:leading-[45px]">
                Yes, Zap Your Resume International caters to professionals
                across all industries and professions, ensuring that resumes are
                customized to meet the requirements of diverse fields.
              </p>
            </div>
            <div className="flex flex-col gap-y-4 tracking-[2%]">
              <h2 className="max-[860px]:text-2xl text-[25px] text-left leading-[45px]">
                How are resumes tailored to international standards?
              </h2>
              <p className="font-light text-lg text-justify leading-[37px] sm:leading-[45px]">
                Resumes are tailored by incorporating internationally recognized
                formats, language preferences, and industry-specific norms,
                ensuring that they meet the expectations of employers in
                different countries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* contact us */}
      <Contactus />
      {/* blog */}
      <Blog />
    </div>
  );
};

export default ZapInternational;
