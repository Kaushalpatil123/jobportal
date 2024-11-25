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
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/comboInternationPackService/plans`
        );

        const { status, plans } = response.data;
        console.log("DATA AVE CHHE",response.data);

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
  const discount = 3997;
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
      <div style={{ fontFamily: "inter" }}>
        <div
          style={{ fontFamily: "inter" }}
          className="lg:flex flex-col h-full w-full lg:flex-row max-w-[2000px] mx-auto"
        >
          <div className="hidden md:block w-full lg:w-[45%]  justify-center items-center h-[100px] lg:h-[300px] max-lg:h-[300px]">
            <img
              className="h-full w-full object-fill"
              src={require("../../../images/image 196.png")}
              alt=""
            />
          </div>
          <div className="bg-[#F58634] flex flex-col items-start justify-center h-auto lg:w-[55%] w-full p-4 gap-y-2">
            <h1 className="text-xl sm:text-xl md:text-2xl text-black font-medium text-left lg:mt-5 !leading-[30px] w-[100%]">
              Unlock Global Career Opportunities:
            </h1>
            <h1 className="text-[15px] sm:text-xl md:text-lg text-black font-medium text-left !leading-[30px] w-[100%]">
              "Explore Our International Resume Services Combo Packs Today!"
            </h1>
            <h2 className="text-[15px] lg:text-lg font-light !leading-[30px] lg:my-10 mt-3 text-white text-left w-[100%]">
              Discover Our Comprehensive International Resume Services Combo
              Packs!
            </h2>
          </div>
        </div>
      </div>

      {/* Section-2 Table  */}
      <div className="mt-5   xl:my-16">
        <h1
          className="bg-[#62B01E] font-semibold text-xl sm:text-2xl md:text-[28px]   text-black lg:text-[26px]  py-[0.7rem] md:py-[18px] lg:py-[15px] tracking-normal"
          style={{ fontFamily: "inter" }}
        >
          Combo International Packs
        </h1>

        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] !w-[100%] lg:!w-[90%] max-w-[1500px] mx-auto flex flex-col mt-4">
          <table className="table table-bordered border-b-2 table-fixed">
            <thead className=" align-middle">
              <tr className="font-semibold">
                <th scope="col" className="text-center !text-black">
                  <p className=" text-sm md:text-xl lg:text-xl">
                    International Resume
                  </p>
                  <p className="text-sm md:text-lg lg:text-xl">Rs. 15999/-</p>
                </th>
                <th scope="col" className="text-center">
                  <p className="text-sm md:text-xl lg:text-xl">
                    Zap Your Resume
                  </p>
                  <p className="text-sm md:text-lg lg:text-xl">Rs. 16999/-</p>
                </th>
                <th scope="col" className="text-center">
                  <p className="text-sm md:text-xl lg:text-xl">
                    Visual International
                  </p>
                  <p className="text-sm md:text-lg lg:text-xl">Rs. 25990/-</p>
                </th>
                <th scope="col" className="text-center">
                  <p className="text-sm md:text-xl lg:text-xl">
                    Job Search Assistant 6 Months
                  </p>
                  <p className="text-sm md:text-lg lg:text-xl">Rs. 17999/-</p>
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
                  Global Appeal
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Tailored Approach
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Enhanced Engagement
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Personalized Guidance
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Cross-Cultural Understanding
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Professional Quality
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Improved Communication
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Access to Resources
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Compliance Assurance
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  ATS Optimization
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Global Appeal
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Industry Insights
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Industry-Specific Expertise
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Enhanced Visibility
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Branding Opportunity
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Networking Opportunities
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Enhanced Visibility
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Confidence Boost
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Increased Memorability
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Interview Preparation
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Network Expansion
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Career Advancement
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Career Advancement
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Personalized Support
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Career Advancement
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Job Search Success
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Competitive Advantage
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Access to Resources
                </td>
              </tr>

              <tr className="!border-none">
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Increasing visibility
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />{" "}
                  Career Advancement Opportunities
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Lasting impression on employers
                </td>
                <td className="text-start   text-xs sm:text-base  md:text-lg lg:text-[17px] py-3">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "red", marginRight: "12px" }}
                    size="md"
                  />
                  Confidence Building
                </td>
              </tr>

              {/* <tr className="!border-none text-center object-center">
                <td className="text-right ">
                  <button className="text-xs w-[80px] h-8 lg:w-[130px] sm:text-lg lg:mr-44 text-black  font-semibold py-auto mr-10 max-sm:px-1 sm:px-2 md:px-4 py-1 justify-center  rounded-3xl bg-[#62B01E]">
                    Know more
                  </button>
                </td>
                <td className="text-right">
                  <button className="text-xs sm:text-lg w-[80px] h-8 lg:w-[130px] lg:mr-44 text-black  font-semibold py-auto mr-10  max-sm:px-1 sm:px-2 md:px-4 py-1 justify-center   rounded-3xl bg-[#62B01E]">
                    Know more
                  </button>
                </td>
                <td className=" text-right ">
                  <button className=" text-xs sm:text-lg w-[80px] h-8 lg:w-[130px] lg:mr-40 text-black  font-semibold py-auto px-auto mr-5 max-sm:px-1 sm:px-2 md:px-4 py-1 justify-center   rounded-3xl bg-[#62B01E]">
                    Know more
                  </button>
                </td>
                <td className=" text-right ">
                  <button className=" text-xs sm:text-lg w-[80px] h-8 lg:w-[130px] lg:mr-40 text-black  font-semibold py-auto px-auto mr-5 max-sm:px-1 sm:px-2 md:px-4 py-1 justify-center   rounded-3xl bg-[#62B01E]">
                    Know more
                  </button>
                </td>
              </tr> */}
            </tbody>
          </table>

          {/* Buy Section  */}
          <div className=" flex flex-col lg:flex-row justify-between items-center mx-3 mb-3">
            {/* Left Section  */}
            <div className="lg:w-[55%] w-full xl:w-[48%] text-left border-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className="mx-auto p-2 md:p-4 lg:p-8 pt-3">
                <ul
                  className="text-justify w-full max-lg:w-[85%] xl:w-[90%] mx-auto"
                  style={{ fontFamily: "poppins" }}
                >
                  <ul className="flex flex-col gap-y-2">
                    {displayPlans.map((plan) => (
                      <li
                        className="flex text-justify justify-between gap-4
                        
                        mt-2 max-sm:text-base lg:px-2"
                        key={plan._id}
                      >
                        {plan.planName}
                        <span className="text-right">Rs. {plan.price}/-</span>
                      </li>
                    ))}
                  </ul>
                  <li className="flex  text-black  text-justify font-medium  max-md:px-2  lg:px-3 mt-5 max-sm:text-lg">
                    Buy all {displayPlans?.length} services in combo pack and
                    save Rs. {discount}/- now
                  </li>
                  <li className="text-right mt-8 text-base sm:text-[24px] md:text-[26px] lg:text-[20px] font-semibold px-2 tracking-wide">
                    <span className="line-through">Rs. {totalPrice}/- </span>
                  </li>

                  <li className="flex gap-2 md:gap-5 justify-between md:mt-2 text-base sm:text-[24px] p-2 md:text-[26px] lg:text-[20px] font-semibold ">
                    Combo Offer
                    <span className="text-right">Rs. {planPrice}/-</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-lg sm:text-[22px] xl:text-[20px]  font-medium mt-4 text-center lg:tracking-wide ">

           

                  You Save Rs. {discount} on this offer

                </p>
              </div>

              <div className="mt-4">
                <p className="text-xs text-center">
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
