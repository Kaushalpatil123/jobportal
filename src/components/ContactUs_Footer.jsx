import React, { useState } from "react";
import axios from 'axios';
import { useContext } from "react";
import contextAuth from "../ContextAPI/ContextAuth";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faSquarePhone } from '@fortawesome/free-solid-svg-icons';


const ContactUs_Footer = () => {

  const { token, setLoading } = useContext(contextAuth);
  // console.log(token);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    Query: "",
  });

  const { name, email, phoneNumber, Query } = formData;

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleOnChange = (e) => {
    if (
      e.target.type === "number" &&
      e.target.value.length > e.target.maxLength
    ) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitContactFormData = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/contact-us/get-a-callback`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      const { message, status } = response.data;
      if (status === "success") {
        toast.success("Your contact details saved succcessfully. Will reach you soon");
        // Reset form data
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          Query: "",
        });
        setTermsAccepted(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast(error.response.data.message);
      }
      else {
        toast.error("Error in saving contact details");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='bg-indigo-900 w-full'>
        <p className='text-white p-6 text-2xl font-semibold'>Contact Us</p>
      </div>
      <div className="flex justify-center w-[80%] md:w-[70%] max-w-[1500px] mx-auto ">
        <div className="py-4 md:flex flex-row items-stretch justify-center rounded-lg-gray-200 w-full ">
          <div className="w-[100%] p-8 flex-1 flex flex-col justify-center items-center">
            <div className="w-[100%] text-left">
              <h4 className="font-extrabold text-xl ">Feel free to reach us</h4>
              <p style={{ fontFamily: "monospace" }} className="text-sm text-gray-700 mb-4 mt-2">Our executive will get in touch with you soon</p>
              <form onSubmit={submitContactFormData}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  className=" shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleOnChange}
                  type="text"
                  required
                  placeholder="Your name here"
                />

                <label className="block text-gray-700 text-sm font-bold my-2 pt-2" htmlFor="email">
                  Email ID<span className="text-red-500">*</span>
                </label>
                <input
                  className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  type="email"
                  required
                  placeholder="Your email ID"
                />

                <label className="block text-gray-700 text-sm font-bold my-2 pt-2" htmlFor="mobile">
                  Mobile<span className="text-red-500">*</span>
                </label>
                <input
                  className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="mobile"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleOnChange}
                  type="tel"
                  required
                  placeholder="Your mobile number"
                />

                <label className="block text-gray-700 text-sm font-bold my-2 pt-2" htmlFor="query">
                  Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="query"
                  name="Query"
                  value={Query}
                  onChange={handleOnChange}
                  placeholder="Any message or query"
                  rows="4"
                ></textarea>

                <label className="block text-gray-700 text-sm font-bold my-2 pt-2">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={handleCheckboxChange}
                    className="mr-2 leading-tight"
                    required
                  />
                  <span>You accept our <a href="/terms-conditions" className="text-blue-600 w-full hover:text-blue-700">Terms and Conditions</a></span>
                </label>

                <button
                  className="bg-[#10744f] w-full hover:bg-[#15673e] text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit Now
                </button>
              </form>
            </div>
          </div>
          <div className="w-[100%] p-9 flex-1  flex flex-col items-center pt-20">
            <div className="text-left space-y-2 text-base text-gray-600" style={{ fontFamily: "poppins" }}>
              <p><FontAwesomeIcon icon={faLocationDot} /><span className=" pl-2"> Plot no.-115 , Sector - 15 , Noida 201301</span></p>
              <p><FontAwesomeIcon icon={faSquarePhone} /><span className="pl-2">Call : +91-931-167-9499</span></p>
              <p><FontAwesomeIcon icon={faEnvelope} /><span className="pl-2">support@doledgeindia.com</span></p>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ContactUs_Footer