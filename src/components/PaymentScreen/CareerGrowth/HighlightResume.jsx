import React, { useEffect, useState, useContext } from "react";
import ResumeHighlighter from "../../../images/image 197.png";
import image1 from "../../../images/Vector1.jpg";
import image2 from "../../../images/Vector2.jpg";
import image3 from "../../../images/Vector3.jpg";
import image4 from "../../../images/Vector4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import Image1 from "../../../images/HighlightImage.png";
import Image2 from "../../../images/HighlightImageS4Img2.png";
import Image3 from "../../../images/HighlightSection5.png";
import Image4 from "../../../images/HighlightTip1.png";
import Image5 from "../../../images/HighlightTip2.png";
import Image6 from "../../../images/HighlightTip3.png";
import Image7 from "../../../images/recruiterView1.png";
import Image8 from "../../../images/recruiterView2.png";
import Blog from "../../Blog";
import Footer from "../../Footer";
import Contactus from "../../Contactus";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import contextAuth from "../../../ContextAPI/ContextAuth";
import { Box, Button } from "@mui/material";

const HighlightResume = () => {
  const featureData = [
    {
      image: image1,
      text: "Professional Endorsements",
    },
    {
      image: image2,
      text: "Skill Spotlight",
    },
    {
      image: image3,
      text: "Professional Guidance",
    },
    {
      image: image4,
      text: "Networking Opportunities",
    },
  ];

  const paragraphs = [
    {
      text: "If your profile doesn't include the keywords commonly used in your industry or specific to the roles you are targeting, it may not appear in recruiter searches",
    },
    {
      text: "Recruiters are more likely to overlook profiles that lack comprehensive details about your skills, experiences, and achievements. Keeping your profile up-to-date is crucial for visibility.",
    },
    {
      text: "A smaller professional network and a lack of endorsements or recommendations can contribute to your profile going unnoticed",
    },
  ];

  const BenefitsItems = [
    {
      text: "Increases the visibility of your profile in recruiter searches and on professional networks.",
    },
    {
      text: "Making it stand out and capturing the attention of recruiters and hiring managers.",
    },
    {
      text: "Provide expert guidance on optimizing your profile for specific industries or roles",
    },
    {
      text: "Provide expert guidance on optimizing your profile for specific industries or roles",
    },
  ];

  const tipsInfo = [
    {
      image: Image4,
      text: "Keep your profile up-to-date with your latest experiences, skills, and achievements.",
    },
    {
      image: Image5,
      text: "Provide comprehensive information about your skills, experiences, and achievements",
    },
    {
      image: Image6,
      text: "Highlight your key accomplishments and successes",
    },
  ];

  const [planprice, setPlanprice] = useState([]);
  const { setLoading, token } = useContext(contextAuth);
  const [serviceType, setServiceType] = useState();
  const [planId, setPlanId] = useState();
  const [serviceId, setServiceId] = useState();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]); // Add this line to define the plans state
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [serviceName, setServiceName] = useState(null);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    setLoading(true);
    const fetchDataResume = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/highlightresume/highlight-resumes`
        );

        const { status, highlightResumes } = response.data;
        console.log("HIGHLIGHT YOUR RESUME", response.data);

        if (status === "success") {
          const selectedJobService = highlightResumes[0]; // Assuming there's only one job service for now
          setServiceType(selectedJobService.jobServiceName);
          setPlans(selectedJobService.plans);
          // Optionally, you can set the default selected plan here
          setSelectedPlan(selectedJobService.plans[0]);
          setServiceId(selectedJobService._id);
        } else {
          throw new Error("Failed to fetch job services");
        }
      } catch (error) {
        toast.error("Error fetching job services");
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
      const token = getToken(); // Call the getToken function to get the token value
      // Adding Items to the Cart
      const data = {
        serviceType: "highlightresumes",
        service: {
          id: serviceId,
          name: serviceType,
        },
        plans: [
          {
            id: selectedPlan._id,
            price: selectedPlan.price,
            durationMonths: selectedPlan.durationMonths,
          },
        ],
        cartId
      };
      console.log("SELECTEDPLAN", selectedPlan);
      const addToCartRes = await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/cart/${
          token ? "addtocart" : "add-to-cart"
        }`,
        data,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      const responseCartData = addToCartRes.data;
      console.log("CART DATA", responseCartData);
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
      <div className="flex flex-col lg:flex-row h-full lg:max-h-[450px] max-w-[1600px] mx-auto">
        {/* left part */}
        <div className="hidden sm:block w-full h-[350px] lg:w-[55%]">
          <img
            src={ResumeHighlighter}
            alt=""
            className="h-full w-full object-fill"
            loading="lazy"
          />
        </div>
        {/* right part */}
        <div className="font-bold bg-[#F58634] flex flex-col gap-4 md:gap-y-8 justify-center lg:text-left h-full py-10 pb-16 lg:h-auto w-full lg:w-[45%]">
          <div className="flex flex-col justify-start max-md:gap-4 md:gap-y-10 lg:ml-[10%]">
            <h1 className="text-4xl sm:text-[34px] leading-[50px] px-6 sm:px-10 ">
              Highlight Your Profile
            </h1>
            <p className="text-xl sm:text-xl text-white px-[5px] sm:px-10 tracking-[1px] leading-[30px] sm:leading-10">
              Illuminate Your Potential: Unleashing <br /> Success Through
              Profile Highlighter <br /> Services
            </p>
          </div>
        </div>
      </div>

      {/* Key Features of a Profile Highlighter service */}
      <div className="flex flex-col gap-y-3 w-full lg:w-[75%] max-w-[1500px] mx-auto lg:my-10">
        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-16 mb-10">
          {/* left part */}
          <div className="w-full lg:w-[57%] flex flex-col gap-y-10 mt-5">
            <div className="bg-[#4B57A3] px-1 py-2">
              <h1 className="text-white text-xl sm:text-xl md:text-xl font-semibold">
                Key Features of a Profile Highlighter service
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-y-9 lg:grid-cols-4">
              {featureData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center gap-y-2 lg:gap-y-1 w-[80%] sm:w-full mx-auto"
                >
                  <img src={item.image} alt="" className="w-10 h-10 mr-2" />
                  <p className="text-center ">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          {/* right part - buy package */}
          <div className="w-[70%] sm:w-[50%] lg:w-[30%] flex flex-col gap-y-5 lg:gap-y-2 max-lg:mx-auto">
            <h1 className="text-xl md:text-2xl text-center max-w-[350px] mx-auto mb-1">
              Buy Package
            </h1>

            <form className="flex flex-col gap-4 text-center justify-evenly text-base sm:text-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-4 md:py-5 rounded-xl lg:rounded-md max-w-[350px] min-w-[300px] mx-auto">
              <div className="flex flex-col gap-y-5 justify-start items-start w-fit max-w-[75%] mx-auto">
                {plans.map((plan) => (
                  <div
                    key={plan._id}
                    className="flex justify-start items-center gap-x-1 sm:gap-x-8 md:gap-x-4 lg:gap-x-3 max-[500px]:p-1 max-[500px]:gap-x-3 max-sm:mx-auto"
                  >
                    <input
                      type="radio"
                      name="selectedPlan"
                      id={plan._id}
                      value={plan._id}
                      checked={selectedPlan && selectedPlan._id === plan._id}
                      onChange={() => setSelectedPlan(plan)}
                      className="lg:w-5 lg:h-5 md:h-4 md:w-4 sm:w-5 sm:h-5 cursor-pointer"
                    />
                    <label
                      htmlFor={plan._id}
                      className="text-xs sm:text-lg md:text-base lg:text-lg xl:text-lg text-left lg:leading-[43px] cursor-pointer"
                    >
                      {plan.durationMonths} Months - Rs. {plan.price}
                    </label>
                  </div>
                ))}
              </div>
              <em className="self-center md:text-xs text-[9px]">
                (*Applicable Taxes may apply)
              </em>
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

      {/* Your profile might go unnoticed in recruiter searches for the following reasons: */}
      <div className="bg-[#F6F6F8] py-5">
        <h1 className="text-lg lg:text-2xl text-center px-2 lg:w-[70%] max-w-[1500px] mx-auto">
          Your profile might go unnoticed in recruiter searches for the
          following reasons:
        </h1>
        <div className="flex lg:gap-x-14 xl:gap-x-20 w-[90%] lg:w-[70%] max-w-[1500px] mx-auto justify-center items-center mt-6 lg:mt-4 xl:mt-0">
          <div className="hidden md:block md:w-[30%]">
            <img
              src={Image1}
              alt=""
              className="md:w-[90%] lg:w-[120%] max-w-[400px] h-auto object-contain"
            />
          </div>
          <div className="font-light text-[13px] sm:text-sm lg:text-lg xl:text-xl w-[90%] md:w-[90%] xl:w-[60%] flex flex-col justify-start items-start gap-3 md:gap-5 lg:gap-y-8 lg:h-[200px] xl:h-[200px]">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-justify mx-auto text-base">
                <FontAwesomeIcon
                  icon={faCircle}
                  style={{ color: "#F58634" }}
                  className="mr-3 h-3 w-3"
                />
                {paragraph.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* The benefits you gain from a Profile Highlighter service include */}
      <section>
        <div className="bg-[#F6F6F8] mt-1">
          <h1 className="bg-[#F58634] font-medium text-lg sm:text-xl md:text-xl px-1 sm:leading-10 py-2 sm:h-12 md:h-13 flex justify-center items-center">
            The benefits you gain from a Profile Highlighter service include
          </h1>
          <div className="flex gap-x-2 w-[90%] justify-center items-center lg:w-[70%] max-w-[1500px] mx-auto py-3">
            <div className="hidden md:block w-[30%]">
              <img
                src={Image2}
                alt=""
                className="w-full max-w-[400px] h-auto"
              />
            </div>
            <div className="font-light text-[13px] sm:text-sm lg:text-lg xl:text-base w-[90%] md:w-[90%] xl:w-[60%] flex flex-col justify-evenly items-start gap-2 md:gap-5 lg:gap-y-8 lg:h-[200px] xl:h-[200px]">
              {BenefitsItems.map((item, index) => (
                <p key={index} className="text-justify">
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    style={{ color: "#24e544" }}
                    className="mr-5"
                  />
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* how your profile look to recruiter - image */}
      <div className="lg:w-[60%] max-w-[1000px] mx-auto flex flex-col gap-y-5 my-4">
        <div className="flex flex-col gap-y-2">
          <p className="font-medium text-xl leading-[32px] tracking-wide text-left pl-3">
            Recruiter view - Paid Profiles
          </p>
          <img src={Image7} alt="" className="w-full mx-auto" />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-medium text-xl leading-[32px] tracking-wide text-left pl-3">
            Recruiter view - Free Profiles
          </p>
          <img src={Image8} alt="" className="w-full mx-auto" />
        </div>
      </div>

      {/* To get the best out of a Profile Highlighter service, consider the following tips */}
      <div className="bg-[#F8F8F8] flex flex-col gap-5 w-[85%] lg:w-[60%] max-w-[1500px] mx-auto p-4 px-2 rounded-2xl mb-14">
        <h1 className="xl:text-[20px] lg:text-  xl md:text-xl sm:text-base text-center">
          To get the best out of a Profile Highlighter service, consider the
          following tips
        </h1>
        <div className="flex flex-col md:flex-row gap-1 justify-around items-baseline text-base font-light font-inter">
          {tipsInfo.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-3 justify-center items-center w-[60%] lg:w-[50%] md:max-w-[150px] lg:p-1 md:p-0 rounded-xl ${
                index == 1 ? "gap-y-5" : ""
              }`}
            >
              <img src={item.image} alt="" />
              <p
                className={`text-[12px] w-[180px] ${index == 1 ? "mt-2" : ""}`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Talk to our experts */}
      <Contactus />

      {/* Blog */}
      <Blog />

      {/* Footer */}
      {/* <Footer/> */}
    </div>
  );
};

export default HighlightResume;
