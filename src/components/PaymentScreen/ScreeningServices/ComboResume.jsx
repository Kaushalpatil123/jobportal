import React, { useEffect, useState, useContext } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Blog from "./../../Blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Contactus from "../../Contactus";
import toast from "react-hot-toast";
import contextAuth from "../../../ContextAPI/ContextAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../../../images/Rectangle105.png";

const ComboResume = () => {
  const theme = useTheme();
  const { setLoading, token } = useContext(contextAuth);
  const [serviceType, setServiceType] = useState();
  const [serviceId, setServiceId] = useState();
  const [planId, setPlanId] = useState();
  const navigate = useNavigate();
  const [displayPlans, setDisplayPlans] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchDataResume = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/comboPackResumeService/plans`
        );

        const { status, plans } = response.data;

        if (status === "success") {
          const showSelectedService = plans[0];
          setDisplayPlans(showSelectedService.plans);
          setPlanId(showSelectedService._id);
          setServiceId(showSelectedService._id);
          setServiceType(showSelectedService.serviceName);
        } else {
          throw new Error("Failed to fetch Combo Resume service ");
        }
      } catch (error) {
        toast.error("Error fetching  Combo Resume service ");
      } finally {
        setLoading(false);
      }
    };
    fetchDataResume();
  }, []);

  const totalPrice = displayPlans?.reduce((acc, curr) => acc + curr.price, 0);
  const discount = 2500;
  const planPrice = totalPrice - discount;

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
            price: planPrice,
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
    <div className="w-full h-auto mx-auto pt-2" style={{ fontFamily: "inter" }}>
      {/* Section 1 */}

      <div className="flex flex-col-reverse lg:flex-row mx-auto max-w-[2000px] h-[360px] w-full">
        <div
          className="w-[100%] flex justify-center flex-col gap-y-8 sm:pt-0 lg:w-[55%]"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <h1 className="w-[100%] md:w-[90%] mx-auto text-left px-5 sm:px-14 md:px-20 lg:px-8 py-3 text-3xl font-medium leading-[55px]">
            Career Catalysts: Elevate Your Journey with Job Boost Services
          </h1>
          <p className="w-[100%] md:w-[90%] mx-auto text-left px-5 sm:px-14 md:px-20 lg:px-8 text-3xl leading-[55px]">
            Unlock Opportunities, Ignite Success!
          </p>
        </div>
        <div className="w-full flex justify-center lg:w-[45%]">
          <img
            src={require("./../../../images/image 199.png")}
            alt="CoverImage"
            className="lg:block w-full h-auto"
          />
        </div>
        <div className="w-[50%] items-end">
          <img
            src={require("./../../../images/image 199.png")}
            alt="Rectangle105"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Section-2 Table  */}
      <div className="mt-4 xl:my-16">
        <h1
          className="bg-[#62B01E] font-semibold text-xl sm:text-2xl md:text-[28px]  text-black lg:text-[30px]  py-[0.7rem] md:py-[1.2rem] tracking-normal"
          style={{ fontFamily: "inter" }}
        >
          Combo Resume Packs
        </h1>

        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] !w-[90%] lg:!w-[70%] max-w-[1500px] mx-auto flex flex-col mt-5">
          <table className="table table-bordered border-b-2 table-fixed">
            <thead className=" align-middle">
              <tr className="font-semibold">
                <th scope="col" className="text-center !text-black">
                  <p className=" text-sm md:text-xl lg:text-xl">Text Resume</p>
                  <p className="text-sm md:text-lg lg:text-xl">Rs. 5899/-</p>
                </th>
                <th scope="col" className="text-center">
                  <p className="text-sm md:text-xl lg:text-xl">Visual Resume</p>
                  <p className="text-sm md:text-lg lg:text-xl">Rs. 7999/-</p>
                </th>
                <th scope="col" className="text-center">
                  <p className="text-sm md:text-xl lg:text-xl">
                    International Resume
                  </p>
                  <p className="text-sm md:text-lg lg:text-xl">Rs. 15999/-</p>
                </th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="!border-none">
                <td className="text-start text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Professional Presentation
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Eye-Catching Design
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Global Standards Compliance
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Concise and Clear Information
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Enhanced Storytelling
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Cultural Sensitivity
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Customization for Targeted Roles
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Increased Visual Impact
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Language Optimization
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Quantifiable Achievements
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Highlight Key Achievements
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Format Adaptation
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Increased Readability
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Infographic Elements
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Global Networking Strategies
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Standout Appeal
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Modern and Innovative Image
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Understanding Visa and Work Authorization Requirements
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Career Confidence Boost
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Online Portfolio Integration
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Industry-Specific Insights
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  ATS Compatibility
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Increased Engagement
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Understanding Global Job Market Trends
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Professional Presentation
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Online Portfolio Integration
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  International Job Search Strategies
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-right ">
                  <button className="text-xs  sm:text-lg  text-black w-max-content font-semibold mx-auto max-sm:px-1 sm:px-2 md:px-4 py-1 justify-center  rounded-3xl bg-[#62B01E]">
                    Know more
                  </button>
                </td>
                <td className="text-right">
                  <button className="text-xs sm:text-lg  text-black w-max-content font-semibold mx-auto   max-sm:px-1 sm:px-2 md:px-4 py-1 justify-center   rounded-3xl bg-[#62B01E]">
                    Know more
                  </button>
                </td>
                <td className="text-right">
                  <button className="text-xs sm:text-lg text-black w-max-content font-semibold mx-auto  max-sm:px-1 sm:px-2 md:px-4 py-1 justify-center   rounded-3xl bg-[#62B01E]">
                    Know more
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Buy Section  */}
          <div className=" flex flex-col lg:flex-row justify-between items-center mx-3 mb-3">
            {/* Left Section  */}
            <div className=" pb-3 lg:w-[55%] xl:w-[48%] text-left border-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className="mx-auto p-2 md:p-4 lg:p-8 pt-3">
                <ul
                  className="text-justify w-full max-lg:w-[85%] xl:w-[90%] mx-auto"
                  style={{ fontFamily: "poppins" }}
                >
                  <ul className="flex flex-col gap-y-3">
                    {displayPlans.map((plan) => (
                      <li
                        className="flex text-justify justify-between gap-5
                        
                        mt-2 max-sm:text-lg lg:px-2"
                        key={plan._id}
                      >
                        {plan.planName}
                        <span className="text-right">Rs. {plan.price}/-</span>
                      </li>
                    ))}
                  </ul>
                  <li className="flex text-justify font-medium  max-md:px-2  lg:px-3 mt-5 max-sm:text-lg">
                    Buy all {displayPlans?.length} services in combo pack and
                    save Rs. {discount}/- now
                  </li>
                  <li className="text-right mt-8 text-lg sm:text-[24px] md:text-[26px] lg:text-[20px] font-semibold px-2 tracking-wide">
                    Rs. <span className="line-through">{totalPrice}/-</span>
                  </li>

                  <li className="flex gap-2 md:gap-5 justify-between md:mt-2 text-lg sm:text-[24px] p-2 md:text-[26px] lg:text-[20px] font-semibold ">
                    Combo Offer
                    <span className="text-right">Rs. {planPrice}/-</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xl sm:text-[22px] xl:text-[20px]  font-medium mt-4 text-center lg:tracking-wide ">
                  You Save - Rs. {discount}/-
                </p>
              </div>

              <div className="mt-4">
                <p className="text-xs text-center mb-1">
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

            {/*     Right Part  */}
            <div className="lg:w-[40%] xl:w-[45%] hidden lg:block">
              <img
                src={require("./../../../images/ScreeningServices/ComboResume.jpg")}
                alt="CoverImage"
                className="w-full "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact us */}
      <Contactus />
      <Blog />
    </div>
  );
};

export default ComboResume;
