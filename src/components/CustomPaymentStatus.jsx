import axios from "axios";
import React, { useContext, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import contextAuth from "../ContextAPI/ContextAuth";
import toast from "react-hot-toast";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const { setLoading, token } = useContext(contextAuth);

  // getting transaction status true or false
  const { status } = useParams();

//   const transactionId = new URLSearchParams(window.location.search).get(
//     "TransactionId"
//   );

  const invoiceId = new URLSearchParams(window.location.search).get("orderId");

 
 

  // useEffect(() => {
  //     const redirectTimeout = setTimeout(() => navigate('/dashboard'), 10000);
  //     return () => clearTimeout(redirectTimeout);
  // }, [])

  let timeoutId;

  const updateStatus = async () => {
    setLoading(true);
    let newStatus = "Unpaid";
    if (status === "true") newStatus = "Paid";
    else if (status === "false") newStatus = "Unpaid";
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/invoice/update-status`,
        {"_id":invoiceId, "status": newStatus},
          {headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.data.success) {
        toast.error("Error occured");
        throw new Error(
          "ERROR IN UPDATING STATUS......",
          response.data?.message
        );
      }
      timeoutId = setTimeout(() => navigate("/dashboard"), 10000);
    } catch (error) {
      console.log("ERROR ON UPDATING STATUS.......", error);
      toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      updateStatus();
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [token]);

  return (
    <div style={{ fontFamily: "inter" }} className="bg-gray-300 p-5">
      <div className="flex flex-col gap-y-5 p-4 bg-white  sm:max-w-[500px] mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="flex flex-col items-center gap-y-4">
          {status === "true" ? (
            <FaCheckCircle size={80} className="text-green-500" />
          ) : (
            <RxCross1 size={80} className="text-red-500" />
          )}
          <p
            className={`text-3xl ${
              status === "true" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status === "true" ? "Order Placed" : "Failed"}
          </p>
        </div>
        
        <div className="sm:w-[80%] mx-auto flex flex-col gap-y-2">
          <h1 className="text-lg">Invoice Details</h1>
          <div className="text-[15px]">
            {/* <div className="flex flex-wrap justify-between">
              <p>Transaction Id :</p>
              <p>{transactionId}</p>
            </div> */}
            <div className="flex flex-wrap justify-between">
              <p>Invoice Id :</p>
              <p>{invoiceId}</p>
            </div>
            {/* <div className="flex flex-wrap justify-between">
              <p>Order Value :</p>
              <p>₹ {orderValue}/-</p>
            </div> */}
            <div className="flex flex-wrap justify-between">
              <p>Invoice Status :</p>
              <p>{status === "true" ? "Paid" : "Unpaid"}</p>
            </div>
          </div>
        </div>
      
        <p className="text-sm text-left">
          <Link to="/dashboard" className="text-blue-500">
            Click here
          </Link>{" "}
          to return home screen or you will be automatically redirected after 10
          seconds.
        </p>
      </div>
    </div>
  );
};

export default PaymentStatus;
