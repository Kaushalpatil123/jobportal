import React, { useEffect, useState, useContext } from "react";
import image1 from "../../../images/DocumentVerification/image1.png";
import image2 from "../../../images/DocumentVerification/image2.png";
import image3 from "../../../images/DocumentVerification/image3.png";
import step1 from "../../../images/DocumentVerification/step1.png";
import step2 from "../../../images/DocumentVerification/step2.png";
import step3 from "../../../images/DocumentVerification/step3.png";
import step4 from "../../../images/DocumentVerification/step4.png";
import step5 from "../../../images/DocumentVerification/step5.png";
import step6 from "../../../images/DocumentVerification/step6.png";
import id1 from "../../../images/DocumentVerification/id1.png";
import id2 from "../../../images/DocumentVerification/id2.png";
import id3 from "../../../images/DocumentVerification/id3.png";
import id4 from "../../../images/DocumentVerification/id4.png";
import id5 from "../../../images/DocumentVerification/id5.png";
import Contactus from "../../Contactus";
import { useNavigate } from "react-router-dom";
import Blog from "../../Blog";
import axios from "axios";
import contextAuth from "../../../ContextAPI/ContextAuth";
import toast from "react-hot-toast";
import { Box, Button } from "@mui/material";

const DocumentVerification = () => {
  const navigate = useNavigate();
  const { setLoading, token } = useContext(contextAuth);

  const [displayPlans, setDisplayPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState([]);
  const [serviceType, setServiceType] = useState();
  const [planPrice, setPlanPrice] = useState();
  const [planName, setPlanName] = useState();
  const [serviceId, setServiceId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const [checkedState, setCheckedState] = useState();
  const handleOnChange = (position, planId, planPrice,PlanName) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    if (updatedCheckedState[position]) {
      const plan = {
        id: planId,
        price: planPrice,
        planName:PlanName,
      };
      setSelectedPlan((prev) => [...prev, plan]);
    } else {
      const updateSelectedPlans = selectedPlan?.filter(
        (plan) => plan?.id !== planId
      );
      setSelectedPlan(updateSelectedPlans);
    }
    setSelectedPlanId(planId);
  };

  const BuyNow = async (e) => {
    e.preventDefault();
    let cartId=null;
    if(localStorage.getItem("cartId") && !token){
      cartId=JSON.parse(localStorage.getItem("cartId"));
    }
    setLoading(true);

    if (!serviceId || !selectedPlanId) {
      toast.error("Please select a Plan! ");
      setLoading(false);
      return;
    }

    try {
      // Adding Items to the Cart
      const data = {
        serviceType,
        service: {
          id: serviceId,
          name: serviceType,
        },
        plans: selectedPlan,
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
        setSelectedPlan(null);
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error occurred during API requests:", error);
      toast.error(error.message || "Error occurred during API requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/documentverificationservice/plans`
        );
        const { status, plans } = response.data;

        if (status === "success" && plans.length > 0) {
          const showSelectedService = plans[0];
          setServiceId(showSelectedService._id);
          setDisplayPlans(showSelectedService.plans);
          setServiceType(showSelectedService.serviceName);
          setCheckedState(
            new Array(showSelectedService.plans?.length).fill(false)
          );
        } else {
          throw new Error("Failed to fetch Doc Verify Plans ");
        }
      } catch (error) {
        toast.error("Error fetching Doc Verify  Plans");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-y-20" style={{ fontFamily: "inter" }}>
      <div className="w-full">
        <div className="bg-[#4b57ac]">
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-4 max-md:py-4 max-md:pb-8 md:w-11/12 max-w-[1350px] mx-auto">
            <img
              src={image1}
              alt=""
              loading="lazy"
              className="max-md:order-last max-md:w-[50%] h-fit w-fit object-contain object-center"
            />
            <div
              className="flex flex-col gap-6 md:max-lg:gap-4 text-left self-start md:pt-4 lg:translate-y-[10%] max-md:p-2 max-md:py-4 max-md:text-center"
              style={{ fontFamily: "inter" }}
            >
              <h1 className="text-[#FFFCFA] font-semibold text-3xl leading-[50px]">
                Document Verification Services: Ensuring{" "}
                <br className="hidden lg:block" /> Trust, Accuracy, and
                Compliance
              </h1>
              <p className="text-[#FEFEFE] font-light text-2xl">
                Unveiling Assurance through Verified Documents
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col md:flex-row md:max-lg:justify-between gap-y-5 w-[85%] lg:w-[70%] max-w-[1500px] mx-auto">
          {/* left part */}
          <div
            className="w-full md:w-[50%] text-justify self-end pt-7"
            style={{ fontFamily: "inter" }}
          >
            <h1 className="font-semibold text-2xl leading-[55px] max-md:text-center">
              Importance of document verification
            </h1>
            <p className="font-light text-xl leading-[41px] max-w-[650px] text-justify">
              Document verification services are crucial for ensuring trust and
              credibility in various sectors. By confirming the accuracy and
              legitimacy of documents, they mitigate the risk of fraud, enhance
              security in transactions, and ensure compliance with legal
              requirements. These services are instrumental in fostering
              reliability and maintaining the integrity of professional and
              personal interactions.
            </p>
          </div>

          {/* right part absolute*/}
          <div
            className="lg:absolute lg:right-[5%] lg:-translate-y-[15%] w-full md:w-[47%] lg:w-[42%] max-w-[600px] flex flex-col md:max-lg:h-fit md:max-lg:self-center gap-y-8 md:gap-y-10 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] bg-white py-4"
            style={{ fontFamily: "inter" }}
          >
            <h1 className="bg-[#D9D9D9] font-light text-2xl md:max-lg:text-xl p-3">
              Document Verification
            </h1>
            <div
              className="flex flex-col justify-between gap-y-4"
              style={{ fontFamily: "inter" }}
            >
              <div className="flex  text-lg md:max-lg:text-base lg:text-xl px-2">
                <div className="flex flex-col gap-y-4 w-full">
                  <form className="flex flex-col gap-4 text-center justify-between text-base sm:text-xl py-2 md:py-5 rounded-xl lg:rounded-none w-full max-md:px-5 xl:px-7">
                    {displayPlans.map((plan, index) => (
                      <div
                        key={plan._id}
                        className="flex items-center gap-x-3 sm:gap-x-6"
                      >
                        <input
                          type="checkbox"
                          name={`plan-${plan.planName}`}
                          id={`plan-${plan._id}`}
                          value={plan.price}
                          onChange={() => handleOnChange(index, plan._id, plan.price, plan.planName)}
                          checked={checkedState[index]}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <label
                          htmlFor={`plan-${plan._id}`}
                          className="cursor-pointer flex justify-between items-center w-full"
                        >
                          <p>{plan.planName}</p>
                          <p>Rs. {plan.price}/-</p>
                        </label>
                      </div>
                    ))}
                  </form>
                </div>
              </div>
              <p className="text-xs">*Applicable Taxes may apply</p>
              <Box sx={{ textAlign: "center", padding: "10px" }}>
                  <Button
                    type="submit"
                    onClick={BuyNow}
                    variant="contained"
                    style={{ backgroundColor: "rgba(245, 134, 52, 1)" }}
                  >
                    Buy Now
                  </Button>
                </Box>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-10">
        <h1 className="font-semibold text-2xl md:text-3xl leading-[50px] md:leading-[70px] p-2 bg-[#F0AF73]">
          Document Verification - STEPS
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-[70%] max-w-[1500px] mx-auto">
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={step1} alt="" loading="lazy" />
            <p className="text-lg md:max-lg:text-lg">Submission of Documents</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={step2} alt="" loading="lazy" />
            <p className="text-lg md:max-lg:text-xl">Document Review</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={step3} alt="" loading="lazy" />
            <p className="text-lg md:max-lg:text-xl">Verification Methods</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={step4} alt="" loading="lazy" />
            <p className="text-lg md:max-lg:text-xl">Background Checks</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={step5} alt="" loading="lazy" />
            <p className="text-lg md:max-lg:text-xl">
              Confirmation and Reporting
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={step6} alt="" loading="lazy" />
            <p className="text-lg md:max-lg:text-xl">Compliance Check</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-2 gap-y-6 w-[85%] md:w-[70%] max-w-[1500px] mx-auto">
        <h1 className="font-medium text-2xl md:text-3xl max-md:text-justify leading-[45px] md:leading-[53px] self-start">
          Document Verification Services FAQs: Your Questions Answered
        </h1>
        <div className="flex justify-evenly items-center">
          <div className="hidden lg:block w-[42%]">
            <img
              src={image2}
              alt=""
              loading="lazy"
              className="w-full h-full object-contain mx-auto"
            />
          </div>
          <div className="flex flex-col gap-y-5 lg:w-[58%]">
            <div className="text-justify">
              <h2 className="text-2xl leading-[40px] md:leading-[53px]">
                What is document verification?
              </h2>
              <p className="text-[17px] font-light leading-[35px] md:leading-[41px]">
                Document verification is a process of confirming the
                authenticity and accuracy of submitted documents, often used in
                various contexts such as employment, education, and financial
                transactions.
              </p>
            </div>
            <div className="text-justify">
              <h2 className="text-2xl leading-[40px] md:leading-[53px]">
                What documents are typically verified?
              </h2>
              <p className="text-[17px] font-light leading-[35px] md:leading-[41px]">
                Commonly verified documents include identification proofs,
                educational certificates, employment records, financial
                statements, and legal documents.
              </p>
            </div>
            <div className="text-justify">
              <h2 className="text-2xl leading-[40px] md:leading-[53px]">
                Is document verification a legal requirement?
              </h2>
              <p className="text-[17px] font-light leading-[35px] md:leading-[41px]">
                In many industries, document verification is a legal requirement
                to ensure compliance with regulations and maintain the security
                of transactions.
              </p>
            </div>
            <div className="text-justify">
              <h2 className="text-2xl leading-[40px] md:leading-[53px]">
                How long does document verification take?
              </h2>
              <p className="text-[17px] font-light leading-[35px] md:leading-[41px]">
                The duration varies based on the complexity of the verification
                process and the type of documents being reviewed. It can range
                from a few days to several weeks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[85%] md:w-[70%] max-w-[1500px] mx-auto flex flex-col gap-y-5">
        <h1 className="font-semibold text-3xl text-justify md:pl-6">
          ID’s Verification using Doledge Verify
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-between md:gap-11 md:w-[60%] lg:w-[55%] text-lg md:text-xl tracking-wide">
            <div className="flex justify-evenly items-baseline flex-wrap gap-4">
              <div className="flex flex-col justify-center items-center md:w-[30%] md:max-lg:pt-5">
                <img src={id1} alt="" loading="lazy" />
                <p>Aadhar card</p>
              </div>
              <div className="flex flex-col justify-center items-center md:w-[30%]">
                <img src={id2} alt="" loading="lazy" />
                <p>Pan card</p>
              </div>
              <div className="flex flex-col justify-center items-center  md:w-[30%]">
                <img src={id3} alt="" loading="lazy" />
                <p>Mobile number</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-2">
                <img src={id4} alt="" loading="lazy" />
                <p>Driving license</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-2">
                <img src={id5} alt="" loading="lazy" />
                <p>Bank details</p>
              </div>
            </div>
          </div>
          <div className="w-[40%] md:max-lg:w-[35%] hidden md:flex justify-center items-center">
            <img
              src={image3}
              alt=""
              loading="lazy"
              className="w-fit hidden md:block"
            />
          </div>
        </div>
      </div>

      <Contactus />

      <Blog />

      {/* <Footer/> */}
    </div>
  );
};

export default DocumentVerification;
