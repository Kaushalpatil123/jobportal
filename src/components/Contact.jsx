import React,{useState, useEffect} from "react";
import axios from 'axios';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    Query:"",
  });

  const { name, email, phoneNumber,Query } = formData;

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

  const submitContactFormData = (e) => {
    e.preventDefault();
    console.log(formData);
     
    axios.post(`${process.env.REACT_APP_SERVER_PRO_URL}/api/contact-us/get-a-callback`,formData)
    .then(response=>{
      console.log(response);
      e.target.reset();
    })
    .catch(error=>{
      console.log(error);
    })
   
    
  };

  return (
  <div className="flex justify-center w-[80%] md:w-[70%] max-w-[1500px] mx-auto">
    <div className="py-4 md:flex flex-row items-stretch justify-center rounded-lg-gray-200 w-full">
    
    <div className="w-[100%] p-9 flex-1 bg-[#4495e6] text-white flex flex-col justify-center items-center">
      <div className="text-left">
        <p className="font-bold text-xl py-2">Talk to Us</p>
        <p className="py-1">Call us Toll Free: <span className="font-bold">1800-102-5557</span></p>
        <p className="py-1">(9.00 AM to 9.00PM IST)</p>
        <p className="py-1">International Customer Call: <span className="font-bold">+91-120-4021100</span></p>
        <p className="py-1">For bulk queries call: <span className="font-bold">18001034477</span></p>
      </div>
    </div>


    <div className="w-[100%] p-8 flex-1 bg-gray-100 flex flex-col justify-center items-center">
  
      <div className="w-[100%] text-left">
        <h4 className="font-extrabold text-xl ">CONTACT US</h4>
        <p style={{fontFamily:"monospace"}} className="text-sm text-gray-700 mb-4 mt-2">Our executive will get in touch with you soon</p>
        <form onSubmit={submitContactFormData}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            value={name}
            onChange={handleOnChange} 
            type="text"
            required
            placeholder="Type your name here"
          />

          <label className="block text-gray-700 text-sm font-bold my-2 pt-2" htmlFor="email">
            Email ID<span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            type="email"
            required
            placeholder="Type your email ID"
          />

          <label className="block text-gray-700 text-sm font-bold my-2 pt-2" htmlFor="mobile">
            Mobile<span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mobile"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleOnChange}
            type="tel"
            required
            placeholder="Type your mobile number"
          />

          <label className="block text-gray-700 text-sm font-bold my-2 pt-2" htmlFor="query">
            Write your query here<span className="text-red-500">*</span>
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="query"
            name="Query"
            value={Query}
            onChange={handleOnChange}
            placeholder="e.g., I am interested"
            rows="4"
          ></textarea>

          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
            type="submit" 
          >
            CALL ME BACK
          </button>
        </form>
      </div>
    </div>

  </div>
    </div>
  );
};

export default Contact;
