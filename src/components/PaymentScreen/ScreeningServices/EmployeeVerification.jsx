import React, { useEffect, useState, useContext } from "react";
import "../../../App.css";
import { useTheme } from "@mui/material";
import Blog from "./../../Blog";
import { Card, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormControl, FormControlLabel, Radio } from "@mui/material";
import { FaRegCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import contextAuth from "../../../ContextAPI/ContextAuth";

const EmployeeVerification = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setLoading, token } = useContext(contextAuth);

  const [displayPlans, setDisplayPlans] = useState([]);
  // const [selectedPlan, setSelectedPlan] = useState([]);
  const [serviceType, setServiceType] = useState();
  const [planPrice, setPlanPrice] = useState();
  const [planName, setPlanName] = useState();
  const [serviceId, setServiceId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState([]);
  const [checkedState, setCheckedState] = useState();
  const handleOnChange = (position, planId, planPrice, PlanName) => {
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
        setSelectedPlan(null);
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

  useEffect(() => {
    setLoading(true);
    const EmpVerData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PRO_URL}/api/empbgvarification/plans`
        );
        const { status, plans } = response.data;

        if (status === "success" && plans.length > 0) {
          const showSelectedService = plans[0];
          setServiceId(showSelectedService._id);
          setDisplayPlans(showSelectedService.plans);
          setCheckedState(
            new Array(showSelectedService.plans?.length).fill(false)
          );
          setServiceType(showSelectedService.empbgserviceName);
        } else {
          throw new Error("Failed to fetch Employee Verification Plans ");
        }
      } catch (error) {
        toast.error("Error fetching Plans");
      } finally {
        setLoading(false);
      }
    };
    EmpVerData();
  }, []);

  return (
    <div className="w-full max-w-[1800px] h-auto mx-auto pt-2">
      {/* Section-1  */}
      <div className="flex flex-col-reverse lg:flex-row mx-auto max-w-[2000px] w-full">
        <div className="w-full flex justify-center lg:w-[40%]">
          <img
            src={require("./../../../images/image 198.png")}
            alt="CoverImage"
            className="lg:block w-full h-auto"
          />
        </div>
        <div className="bg-[#F58634] w-[100%] flex justify-center flex-col gap-y-8 md:pt-4 sm:pt-0 lg:w-[60%]">
          <div className="flex flex-col gap-y-3 w-[100%] md:w-[90%] text-left px-5 sm:px-14 md:px-20 lg:px-8 py-3 mt-2">
            <h1 className="text-black text-2xl font-bold sm:text-3xl sm:font-semibold leading-[38px]">
              Reliable Employee Background Verification Services
            </h1>
            <h2 className="text-xl">Ensuring Trust and Confidence</h2>
          </div>

          <p className=" w-[100%] md:w-[85%] text-justify text-[#FFFFFF] font-semibold text-xl px-5 sm:px-14 lg:px-8 pb-4 sm:pb-0 ">
            It safeguards workplace integrity, reduces risks of fraud or
            misconduct, and fosters a safe and productive work environment.
            Trustworthy hires contribute to organizational success and uphold
            credibility in the industry.
          </p>
        </div>
      </div>

      <div className="pt-8 mx-auto">
        <div
          className="flex flex-wrap items-center justify-center bg-[#62B01E] w-[100%] mt-2 "
          style={{
            fontSize: 20,
            fontWeight: "700",
            padding: "18px 11px 8px",
            fontFamily: "Poppins",
          }}
        >
          <div
            className="text-white tracking-widest text-center  self-center max-w-[970px] max-md:max-w-full justify-center leading-[47px] xl:text-[1.8rem] font-bold"
            style={{ fontFamily: "poppins" }}
          >
            Pre-Employment Background Check Solutions
          </div>
        </div>
      </div>

      {/*  Section-2 -->  Details of Employee Background  Verification  */}
      <div
        className="w-[92%] lg:w-[70%] max-w-[1200px] h-auto flex flex-col mx-auto my-14  lg:flex-row md:gap-x-7"
        style={{ fontFamily: "poppins" }}
      >
        <div className="h-auto flex flex-col  xl:flex-row  border rounded-xl items-center m-1 xl:m-10 max-sm:p-3 p-10 2xl:p-1 xl:w-[70%] ml-auto">
          <div className="basis-[37%] pl-3">
            <img
              className="w-full items-center"
              src={require("./../../../images/ScreeningServices/PeopleImage.jpg")}
              alt="PeopleImage"
            />
          </div>

          <div className="basis-[60%]   w-auto text-justify m-2">
            <p
              className="text-lg lg:p-3 !tracking-wide !leading-[35px]"
              style={{ fontFamily: "poppins" }}
            >
              Employee background verification is a vital component of the
              hiring process, offering numerous benefits to employers. This
              process not only safeguards your organization but also minimizes
              potential risks{" "}
            </p>
          </div>
        </div>

        {/*       flex-basis 1/5 area  */}

        <div
          className="w-fit gap-3 h-fit my-auto bg-white flex max-md:flex-row max-md:flex-wrap  md:flex-col justify-start items-center !gap-y-8"
          style={{ fontFamily: "poppins" }}
        >
          {/* 1. */}
          <div className="flex items-center justify-start max-md:mx-auto h-fit mr-auto">
            <img
              className=" w-[40%] max-w-[70px]"
              src={require("./../../../images/ScreeningServices/DrugTest.jpg")}
              alt="DrugTestImage"
            />
            <h2 className="text-lg pl-6 tracking-[12%]"> Drug Test</h2>
          </div>

          {/* 2. */}

          <div className="flex items-center justify-end max-md:mx-auto h-fit mr-auto">
            <img
              className="w-[30%] max-w-[70px]"
              src={require("./../../../images/ScreeningServices/Card.jpg")}
              alt="CreditCardImage"
            />

            <h2 className="text-lg leading-[30px] pl-6 tracking-[12%]">
              {" "}
              Credit Check
            </h2>
          </div>

          {/* 3. */}
          <div className="flex items-center justify-end max-md:mx-auto h-fit mr-auto">
            <img
              className=" w-[30%] max-w-[70px]"
              src={require("./../../../images/ScreeningServices/Legal.jpg")}
              alt="LegalRecordsImage"
            />

            <h2 className="text-lg pl-6">Legal Records</h2>
          </div>
        </div>
      </div>

      {/*   What Can be Checked Section (Flex)  */}

      <div className="p-auto h-auto mt-4 flex flex-wrap flex-col items-center text-center lg:mb-10 border-2 rounded-xl w-[90%] lg:w-[80%] xl:w-[70%] max-w-[1500px] mx-auto">
        {/* <div className="bg-[#1C8254] w-full"> */}
        <h1 className="text-2xl leading-[47px] tracking-wider font-bold text-center py-3">
          What Can Be checked ?
        </h1>
        {/* </div> */}

        <div className=" grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 place-items-center mb-8">
          {/* 1 */}
          <div className="w-45 2xl:w-56 flex flex-col justify-center items-center">
            <img
              className="w-20 h-auto m-3 p-3 lg:m-5 2xl:p-4"
              src={require("./../../../images/ScreeningServices/Home.jpg")}
              alt="home"
            />
            <p className=" w-30  text-lg tracking-wider text-[#000000]">
              Address <br />
              Verification
            </p>
          </div>

          {/* 3 */}
          <div className="w-45 2xl:w-56  flex flex-col items-center justify-center">
            <img
              className="w-20 h-auto m-2 p-2 lg:m-4 2xl:p-3 "
              src={require("./../../../images/ScreeningServices/Edu.jpg")}
              alt="Edu"
            />
            <p className=" w-30 text-lg tracking-wider text-[#000000]">
              Education <br /> Verification
            </p>
          </div>

          {/* 4 */}
          <div className="w-45  2xl:w-56  flex flex-col items-center justify-center ">
            <img
              className="w-20 h-auto m-2 p-2 lg:m-4 2xl:p-3 "
              src={require("./../../../images/ScreeningServices/Emp.jpg")}
              alt="Screening Services"
            />
            <p className=" w-30 text-lg tracking-wider text-[#000000]">
              Employment <br /> Verification
            </p>
          </div>
          {/* 6 */}
          <div className="w-45  2xl:w-56  flex flex-col items-center justify-center">
            <img
              className="w-20 h-auto p-2  m-3 lg:m-4 2xl:p-3 "
              src={require("./../../../images/ScreeningServices/Legal.jpg")}
              alt="legal records ver"
            />
            <p className=" w-30 text-lg tracking-wider text-[#000000]">
              Legal Records <br /> Verification
            </p>
          </div>
          {/* 7 */}
          <div className="w-45  2xl:w-56 flex flex-col items-center justify-center">
            <img
              className="w-20 h-auto p-2 m-2 lg:m-4 2xl:p-3 "
              src={require("./../../../images/ScreeningServices/DB.jpg")}
              alt="DB"
            />
            <p className=" w-30 text-lg tracking-wider text-[#000000]">
              Global Databse <br /> Verification
            </p>
          </div>

          {/* 5 */}
          <div className="w-45 2xl:w-56  flex flex-col items-center justify-center">
            <img
              className="w-20 h-auto  p-2 m-2 lg:m-4 2xl:p-3 "
              src={require("./../../../images/ScreeningServices/Network.jpg")}
              alt="network"
            />
            <p className=" w-30 text-lg tracking-wider text-[#000000]">
              Social Network <br /> Verification
            </p>
          </div>

          {/* 8 */}
          <div className="w-45 2xl:w-56  flex flex-col items-center justify-center">
            <img
              className="w-20 h-auto  p-2 m-2 lg:m-4 2xl:p-3 "
              src={require("./../../../images/ScreeningServices/Credit.png")}
              alt="Credit Check"
            />
            <p className=" w-30 text-lg tracking-wider text-[#000000]">
              Credit Check
            </p>
          </div>
          {/* 2 */}
          <div className="w-45  2xl:w-56 flex flex-col items-center justify-center">
            <img
              className="w-20 h-auto m-3 p-3 lg:m-5 2xl:p-4 "
              src={require("./../../../images/ScreeningServices/ID.jpg")}
              alt="ID"
            />
            <p className=" w-30 text-lg tracking-wider text-[#000000]">
              ID Verification
            </p>
          </div>
        </div>
      </div>

      {/*   Flex Box  */}
      <div
        className="flex flex-col md:flex-row justify-between gap-y-5 w-[90%] lg:w-[80%] xl:w-[70%] max-w-[1500px] mx-auto my-16"
        style={{ fontFamily: "poppins" }}
      >
        {/* left box */}
        <div className="flex flex-col md:w-[50%] border-[2px]">
          <h1 className="bg-[#F0AF73] text-2xl font-semibold py-4">
            Unveiling the Background Check Process
          </h1>
          <div className="flex flex-col bg-[#F0EFF5] px-4 pt-3 pb-4">
            <img
              src={require("./../../../images/ScreeningServices/BackgroundCheck.jpg")}
              alt=""
              className="w-[60%] mx-auto"
            />
            <p className="text-base leading-[35px] font-light text-justify">
              Background checks involve a meticulous examination of a
              candidate's history. Employers collect personal details, including
              consent forms, for criminal, employment, and education
              verification. Additional checks may include credit history or
              professional license verification. The gathered information is
              evaluated transparently, ensuring compliance with legal standards,
              fostering an informed and fair hiring process.
            </p>
          </div>
        </div>
        {/* right box */}
        <div className="flex flex-col md:w-[47%] border-[2px] bg-[#FBFBFB]">
          <h1 className="bg-[#727272] text-2xl font-bold py-4 px-1">
            Employee Background Verification
          </h1>
          <div className="flex flex-col h-full justify-between max-sm:gap-y-4 max-2xl:px-4 2xl:px-6 py-8 sm:max-md:w-[80%] max-md:mx-auto">
            <form className="flex flex-col gap-4 text-center justify-between text-base sm:text-xl rounded-xl lg:rounded-none h-[80%]">
              {displayPlans.map((plan, index) => (
                <div
                  key={plan._id}
                  className="flex items-center gap-x-3 2xl:gap-x-6"
                >
                  <input
                    type="checkbox"
                    name={`plan-${plan.planName}`}
                    id={`custom-${plan._id}`}
                    value={plan._id}
                    onChange={() => handleOnChange(index, plan._id, plan.price,plan.planName)}
                    checked={checkedState[index]}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <label
                    htmlFor={`plan-${plan.planName}`}
                    className="cursor-pointer flex justify-between items-center w-full text-[15px] lg:text-base 2xl:text-lg text-black"
                  >
                    <p className="text-left max-sm:text-sm">{plan.planName}</p>
                    <p className="text-right max-sm:text-sm">
                      Rs. {plan.price}/-
                    </p>
                  </label>
                </div>
              ))}
            </form>
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

      {/* Background Verification check Points  */}

      <div className=" font-light" style={{ fontFamily: "poppins" }}>
        <div className="w-full h-auto mx-auto bg-[#F0AF73] box-border">
          <h1 className="text-[#000000] text-center text-2xl lg:text-3xl leading-[48px] font-normal py-3">
            Importance of Employee Background Verification Check
          </h1>
        </div>

        <div className=" w-[92%] lg:w-[70%] max-w-[1500px] basis-2/3 flex  flex-row flex-wrap xl:flex-row max-xl:gap-y-10 max-xl:items-center max-sm:p-3  sm:p-5 m-4 mx-auto lg:p-8 items-center border-2 border-gray-200 rounded-xl">
          <div className=" h-auto mx-auto xl:basis-1/2 xl:pr-5">
            <img
              className="w-[100%] xl:w-[70%] ml-auto"
              src={require("./../../../images/ScreeningServices/BackgroundVerification.jpg")}
              alt=" Background Verification"
            />
          </div>

          <div className="xl:basis-1/2 self-stretch flex flex-col justify-between w-auto max-xl:w-fit bg-white mx-auto items-around max-xl:items-start">
            {/* 1. */}
            <div className="flex  pr-5 mb-4 w-fit items-center">
              <FaRegCircle color="#F58634" size={20} />
              <h2 className="text-lg pl-5 text-left">Risk Mitigation</h2>
            </div>
            {/* 2. */}
            <div className="flex pr-5 mb-4 w-fit items-center">
              <FaRegCircle color="#F58634" size={20} />
              <h2 className="text-lg pl-5 text-left">Workplace Security</h2>
            </div>
            {/* 3. */}
            <div className="flex pr-5 mb-4 w-fit items-center">
              <FaRegCircle color="#F58634" size={20} />
              <h2 className="text-lg pl-5 text-left">Legal Compliance</h2>
            </div>
            {/* 4. */}
            <div className="flex pr-5 mb-4 w-fit">
              <FaRegCircle color="#F58634" size={20} />
              <h2 className="text-lg pl-5 text-left">
                Protect Company Reputation
              </h2>
            </div>
            {/* 5. */}
            <div className="flex pr-5 mb-4 w-fit items-center">
              <FaRegCircle color="#F58634" size={20} />
              <h2 className="text-lg pl-5 text-left">Enhanced Productivity</h2>
            </div>
            {/* 6. */}
            <div className="flex pr-5  mb-4 items-center">
              <FaRegCircle color="#F58634" size={20} />
              <h2 className="text-lg pl-5 text-left">Prevent Fraud</h2>
            </div>
          </div>
        </div>
      </div>

      <Blog />

      {/* <Footer /> */}
    </div>
  );
};

export default EmployeeVerification;
