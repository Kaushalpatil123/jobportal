import React, { useContext, useState } from "react";
import {
  Link,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Login from "../../Login";
import { useEffect } from "react";
import ccAvenue from "../../../images/ccavenuelogo.webp";
import airpay from "../../../images/airpaylogo.webp";
import contextAuth from "../../../ContextAPI/ContextAuth";
import axios from "axios";
import toast from "react-hot-toast";
import TermsAndConditionsPopup from "./TermsAndConditionsPopup";

export default function CustomCheckOut() {
  const { state } = useLocation();
  const { cartId } = state || {};
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState({});
  const [grandTotal, setGrandTotal] =  useState();
  const [tax, setTax] =  useState();
  const [discountAmount,setDiscountAmount] = useState();
  const [status, setStatus] =  useState();
  const [totalBeforeTax, setTotalBeforeTax] =  useState();

  const [paymentMode, setPaymentMode] = useState("paymentMode1");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    streetAddress: "",
    townCity: "",
  });

  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (name === "emailAddress" && !emailRegex.test(value)) {
      setEmailError("Please enter a valid Email address.");
    } else {
      setEmailError("");
    }
  };

  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [tnc, setTnc] = useState(false);

  const handleAgreeToTerms = (agree) => {
    setShowTermsPopup(false);
    if (agree) {
      setTnc(true);
    }
  };

  const handleCheckboxChange = () => {
    if (!tnc) {
      setShowTermsPopup(true);
    } else {
      setTnc(false);
    }
  };

  const { setLoading, token } = useContext(contextAuth);

  const handleClick = async () => {
    const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      streetAddress,
      townCity,
      state,
      pinCode,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !phoneNumber ||
      !streetAddress ||
      !townCity ||
      !pinCode ||
      !state ||
      !emailAddress.includes("@")
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const data = {
      invoiceId,
      vendorId: "65d098cd4beec65a75da2cf1",
      modeOfPayment: paymentMode,
      firstname: firstName,
      lastname: lastName,
      email: emailAddress,
      address: streetAddress,
      city: townCity,
      state:state,
      pinCode: pinCode,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/payment/handleinvoiceresponse`,
        data,
      );
      console.log("CHECKOUT RESPONSE.........", response);
      const paymentLink = response.data.paymentLink;
      // Redirect to the payment link
      window.open(paymentLink, "_self", "noopener,noreferrer");
    } catch (error) {
      toast.error("Error occured");
      console.log(error);
    }
    setLoading(false);
  };



//     Get Invoice by Id 
  const InvoiceData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_DEV_URL}/api/invoice/invoice/${invoiceId}` );
      const { success, invoice } = response.data;

      if (success === true) {
        setInvoice(invoice);
        setGrandTotal(invoice.grandTotal);
        setTax(invoice.taxAmount);
        setDiscountAmount(invoice.discountAmount);
        setTotalBeforeTax(invoice.totalBeforeTax);
      } else {
        throw new Error("Failed to fetch Invoice ");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
      InvoiceData();
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/*Title*/}
      <div className="flex  bg-[#324c81] w-full mx-auto  justify-between p-4  ">
        <h1 className="   mx-auto text-xl  text-white">CheckOut</h1>
      </div>

      {/*form*/}
      <div className="flex flex-col justify-between mx-auto mt-8 w-[100%] lg:w-[85%] xl:w-[85%] max-w-[1500px]">
        {/* form*/}

        <div className="flex lg:flex-row flex-col mb-10 ">
          <div className="flex flex-row bg-[#324c81] w-[3px]   justify-start h-[full]"></div>
          <div className="flex flex-col  mt-9 ml-8 sm:w-1/2">
            <form style={{ textAlign: "left" }} className="">
              <h1 className="mb-5 text-2xl">Billing Details</h1>
              <div
                // style={{ marginBottom: "2rem" }}
                className="flex flex-col lg:flex-row justify-between "
              >
                <div
                  style={{ marginRight: "1rem", marginBottom: "2rem" }}
                  className="text-[11px] w-full"
                >
                  <label className="font-bold mb-2" htmlFor="firstName">
                    FIRST NAME <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className="px-2 py-[15px] w-full bg-gray-100 outline-none rounded text-base"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-[11px] w-full mb-[2rem]">
                  <label className="font-bold mb-2" htmlFor="lastName">
                    LAST NAME <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className="px-2 py-[15px] w-full bg-gray-100 outline-none rounded text-base"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: "2rem" }} className="text-[11px]">
                <label className="font-bold mb-2" htmlFor="emailAddress">
                  EMAIL ADDRESS <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  placeholder="Email"
                  className="px-2 py-[15px] w-full bg-gray-100 outline-none rounded text-base"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  required
                />
                {emailError && (
                  <div style={{ color: "red", fontSize: "11px" }}>
                    {emailError}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "2rem" }} className="text-[11px]">
                <label className="font-bold mb-2" htmlFor="phoneNumber ">
                  PHONE <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  pattern="[0-9]*"
                  className="px-2 py-[15px] w-full bg-gray-100 outline-none rounded text-base"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ marginBottom: "2rem" }} className="text-[11px]">
                <label className="font-bold mb-2" htmlFor="streetAddress">
                  STREET ADDRESS <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  className="px-2 py-[15px] w-full bg-gray-100 outline-none rounded text-base"
                  value={formData.streetAddress}
                  placeholder="House number and street name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ marginBottom: "2rem" }} className="text-[11px]">
                <label className="font-bold mb-2" htmlFor="townCity">
                  TOWN / CITY <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  id="townCity"
                  name="townCity"
                  placeholder="Town / City"
                  className="px-2 py-[15px] w-full bg-gray-100 outline-none rounded text-base"
                  value={formData.townCity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ marginBottom: "2rem" }} className="text-[11px]">
                <label className="font-bold mb-2" htmlFor="townCity">
                   PIN CODE <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="number"
                  id="pinCode"
                  name="pinCode"
                  placeholder="Pin Code"
                  className="px-2 py-[15px] w-full bg-gray-100 outline-none rounded text-base"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ marginBottom: "2rem" }} className="text-[11px]">
                <label className="font-bold mb-2" htmlFor="townCity">
                  STATE <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  className="px-2 py-[15px] w-full bg-gray-100 outline-none rounded text-base"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          </div>

          <div
            className="flex flex-col max-sm:flex-col ml-20 sm:w-1/2 mb-4 "
            style={{ fontFamily: "sans-serif" }}
          >
            <div className=" max-sm:w-[50%]  ">
              <h2 className="text-left text-2xl mb-4 mt-7 max-sm:mx-auto font-semibold">
                Your Order
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="font-bold text-[14px]">PRODUCT</span>
                  <span className="font-bold text-[14px] pr-4">QUANTITY</span>
                  <span className=" text-[14px] font-bold">SUBTOTAL</span>
                </div>
                <hr />
                {invoice?.details?.map((item) => (
                  <div className="flex justify-between gap-3" key={item?._id}>
                    <span className="font-bold text-[14px] ">
                      {item?.name}
                    </span>
                    
                    <span className="font-bold  text-[14px]">
                    {item?.qty}
                    </span>
                  
                    <span>
                  
                      {" "}
                      <span className=" text-[14px]  text-slate-500 font-medium">
                      ₹{ item?.price }/-
                      </span>{" "}
                      {/* <span className="font-bold text-xs"> (ex. GST)</span> */}
                    </span>
                  </div>
                ))}

                <hr />

                <div className="flex justify-between">
                  <span className="font-bold text-[14px]">SUBTOTAL</span>
                  <span>
                    {" "}
                    <span className=" text-[17px]  text-slate-500">
                      ₹{totalBeforeTax}/-
                    </span>{" "}
                    <span className="font-bold text-xs"> (ex. GST)</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[14px]">Tax</span>
                  <span className=" text-[17px]  text-slate-500">₹{tax}/-</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[14px]">Discount</span>
                  <span className=" text-[17px]  text-slate-500">₹{discountAmount}/-</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[14px]">TOTAL</span>
                  <span className=" text-[17px]  text-slate-500">
                    ₹{grandTotal}/-
                  </span>
                </div>
              </div>
              {/* <div className="flex flex-col gap-y-5">
              {cartItem &&
                cartItem.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm py-4 px-4"
                  >
                    <div className="flex flex-col gap-y-3 max-sm:w-[75%]">
                      <h2 className="text-left font-medium text-lg">
                        {item.service.name || item.serviceType}
                      </h2>

                      {item.plans[0]?.durationMonths && (
                        <p className="text-left text-sm">
                          {item.plans[0]?.durationMonths} Months{" "}
                          {item.plans[0]?.coverLetterIncluded}
                        </p>
                      )}
                      {item.plans[0]?.coverLetterIncluded && (
                        <p className="text-left text-sm">
                          Cover letter included
                        </p>
                      )}
                      {item.plans.length > 1 && (
                        <p className="text-left text-sm">
                          Include {item.plans.length} plans
                        </p>
                      )}
                      <div className="flex justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-1"></div>
                    </div>
                    <div className="max-sm:w-[25%] flex flex-col gap-y-6">
                      <b>
                        {" "}
                        ₹{" "}
                        {}
                        /-
                      </b>
                      <button
                        className="text-sm text-red-500"
                        onClick={DeleteCartItem(item.plans[0].id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div> */}
            </div>

            <div
              className="max-sm:w-[90%]  ml-4 mt-8 mx-auto text-left"
              style={{ fontFamily: "ABeeZee , sans-serif" }}
            >
              <div className="mb-4 flex items-center">
                <label className="cursor-pointer flex flex-col md:flex-row items-center relative">
                  {/* <div
                  className={`w-2 h-2 bg-gray-800 rounded-full absolute left-0 top-0 mt-1 ${
                    paymentMode === "paymentMode1" ? "" : "invisible"
                  }`}
                ></div> */}
                  <div className="flex">
                    <input
                      type="radio"
                      id="paymentMode1"
                      name="paymentMode"
                      value="paymentMode1"
                      checked={paymentMode === "paymentMode1"}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="cursor-pointer"
                    />
                    <h2 className="text-left text-base mr-4 ml-7 font-bold">
                      PAYMENT MODE 1
                    </h2>
                  </div>
                  <img
                    src={ccAvenue}
                    alt="Payment Mode 1 Image"
                    className="w-20 ml-2"
                  />
                </label>
              </div>
              <div
                className={`transition-all duration-500 ${
                  paymentMode === "paymentMode1"
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-left ml-7 font-medium">
                  Pay securely by Credit or Debit card or internet banking
                  through CCAvenue Secure Servers.
                </p>
              </div>

              {/* <div className="mb-4 flex items-center">
              <label className="cursor-pointer flex items-center relative">
                <div
                  className={`w-2 h-2 bg-gray-800 rounded-full absolute left-0 top-0 mt-1 ${
                    paymentMode === "paymentMode2" ? "" : "invisible"
                  }`}
                ></div>
                <input
                  type="radio"
                  id="paymentMode2"
                  name="paymentMode"
                  value="paymentMode2"
                  checked={paymentMode === "paymentMode2"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="cursor-pointer"
                />
                <h2 className="text-left mr-4 ml-7 font-bold">
                  PAYMENT MODE 2
                </h2>
                <img
                  src={airpay}
                  alt="Payment Mode 2 Image"
                  className="w-20 ml-2"
                />
              </label>
            </div> */}

              <div
                className={`transition-all duration-500 ${
                  paymentMode === "paymentMode2"
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-left ml-7 font-medium">
                  The best payment gateway provider in India for e-payment
                  through credit card, debit card & netbanking.
                </p>
              </div>

              <p className="text-left font-medium ml-7 mb-4 mt-3">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our{" "}
                <a href="#" className="text-blue-500">
                  {" "}
                  privacy policy.
                </a>
              </p>

              <div className="mb-4 ml-7 flex justify-start items-center">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={tnc}
                  onChange={handleCheckboxChange}
                  className="mr-2 cursor-pointer"
                />
                <label className="text-xs" htmlFor="terms-checkbox">
                  I HAVE READ AND AGREE TO THE WEBSITE{" "}
                  <a href="#" className="text-blue-500">
                    TERMS AND CONDITIONS
                  </a>
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {showTermsPopup && (
                <TermsAndConditionsPopup
                  onClose={() => setShowTermsPopup(false)}
                  onAgree={handleAgreeToTerms}
                />
              )}

              <button
                className="bg-[#324c81] text-[13px] ml-7 text-white px-3 py-2 "
                disabled={tnc === false}
                onClick={handleClick}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>

        {/*payment section */}

        {/*last section */}

        <div className="text-left mt-16 w-full">
          <div className="flex flex-row bg-[#324c81] w-full mr-24  justify-start h-[2px]    "></div>
          <p className="text-left   my-3 text-2xl">Delivery Information</p>
          <p className="text-left tracking-wide leading-8 text-base text-zinc-500">
            If resume writing is not included, these services will be processed
            10 working days after we receive your updated resume. If we do not
            receive a response within 7 days, we will use your most recent
            Doledge resume. However, if you use these services in conjunction
            with resume writing, they will be processed within 10 working days
            after you approve your final resume.
          </p>
          <p className="text-[17px] font-bold my-2">
            *Service delivery TAT of the service is 15working days.
          </p>
        </div>
        <div className="text-left mt-10">
          <p className="text-left   my-3 text-2xl">Disclaimer</p>
          <p className="text-left tracking-wide leading-8 mb-7 text-base text-zinc-500">
            Jobseekers are advised not to indulge in any monetary engagement
            with such sources in the name of guaranteed interviews with
            employers. Although many job seekers have been benefited from our
            services, we do not guarantee jobs or interview calls. If services
            reschedule or cancel, after 24 hours of purchase of service but not
            more than 3 days (including the day of purchase of service)
            deduction (40%) shall be made and balance amount shall be refunded.
            If services reschedule or cancel, after 10 days (including the day
            of purchase of service) no refund shall be made until and unless it
            is proved that you have not been served for what you have made
            payment. Kindly do not share your Credit/Debit card details to
            anyone. If services reschedule or cancel, after 3 days of purchase
            of service (including the day of purchase of service) but not more
            than 10 days (including the day of purchase of service) deduction
            (50%) shall be made and balance amount shall be refunded. Refund
            procedure may take 45 working days after the service
            deactivation.Doledgeindia.com is not responsible if provided
            procedure is not followed at the time of applying on opportunities
            to get fruitful result. For any queries or issues, mail us at{" "}
            <span className="text-black font-bold ">
              {" "}
              support@doledgeindia.com
            </span>
          </p>
        </div>
      </div>
      {/*last section */}
      <div></div>
    </div>
  );
}
