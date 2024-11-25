import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParam } from "react-router-dom";
import contextAuth from "../ContextAPI/ContextAuth";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa6";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import toast from "react-hot-toast";
import "../css/Dashboard.css";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const { setLoading, token, setCart } = useContext(contextAuth);
  //  Fetching CartItems from Backend
  const [cartItem, setcartItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [payableAmount, setPayableAmount] = useState();

  // Fetching all services
  const [allService, setAllService] = useState([]);
  // coupon code
  const inputRef = useRef(null);
  const [couponCode, setCouponCode] = useState("");
  const [options, setOptions] = useState(); // coupon code options
  const [showOptions, setShowOptions] = useState(false);
  // for cart id
  const [cartId, setcartId] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [showcartTotal, setShowCartTotal] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false); // Track if coupon is applied or not
  const [applyVisible, setApplyVisible] = useState(true);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [gst, setGst] = useState(0);

  const handleInputChange = (event) => {
    if (!token) {
      toast.error("Please login to apply offers");
      return;
    }
    const inputText = event.target.value;
    // console.log("Input Text:", inputText);
    setCouponCode(inputText);
    // setShowOptions(inputText.length > 0);
  };

  const handleOptionSelect = (selectedCode) => {
    setCouponCode(selectedCode);
    // console.log("selectedCode couponCode for applying :", selectedCode)
    setShowOptions(false); // Hide options after selecting
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  // handleClickOutside event listener
  useEffect(() => {
    // Attach click event listener to document
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Clean up the event listener when the component is unmounted
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (token) {
      fetchCouponDetails();
    }
    fetchAllServices();
    // Check if coupon is applied when component mounts
    const storedCoupon = localStorage.getItem("appliedCoupon");
    if (storedCoupon) {
      setIsCouponApplied(true);
      setApplyVisible(false);
      setRemoveVisible(true);
    }
  }, []);

  useEffect(() => {
    getCartItems();
  }, [token]);

  // Save applied coupon state in localStorage
  useEffect(() => {
    if (isCouponApplied) {
      localStorage.setItem("appliedCoupon", true);
    } else {
      localStorage.removeItem("appliedCoupon");
    }
  }, [isCouponApplied]);

  // Reset couponCode state when cartItem array becomes empty
  useEffect(() => {
    if (cartItem.length === 0) {
      setCouponCode("");
    }
  }, [cartItem]);

  const getCartItems = async () => {
    let id = null;
    if (localStorage.getItem("cartId") && !token) {
      id = JSON.parse(localStorage.getItem("cartId"));
      console.log(id);
      setcartId(id);
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/cart/${
          id ? `cart/${id}` : "my-cart"
        }`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
     
      setcartItem(data.items);
      setcartId(data._id);
      setCart(data.items.length);
      // const newTotalAmount = data.items.reduce(
      //   (acc, curr) => acc + curr.plans.reduce((ac, cur) => ac + cur.price, 0),
      //   0
      // );
      setTotalAmount(data?.cartTotal);
      setGst(data?.GST);
      setPayableAmount(data?.cartTotalaftergst);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch all services for disaplaying frequently bought together
  const fetchAllServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/home/services`
      );
      if (response.data?.status == "failed") {
        toast.error(response.data?.message);
        throw new Error("ERROR OCCURED IN FETCHING ALL SERVICES......");
      }
      setAllService(
        response.data?.services.sort(() => Math.random() - 0.5).slice(0, 3)
      );
    } catch (error) {
      console.log("ERROR OCCURED IN FETCHING ALL SERVICES......", error);
    }
    setLoading(false);
  };

  //  Deleting Items from the cart
  const DeleteCartItem = (id) => async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${
          process.env.REACT_APP_SERVER_PRO_URL
        }/api/cart/delete-plan-from-cart${!token ? "-open" : ""}/${
          !token ? `${cartId}/` : ""
        }${id}`,
        {
          withCredentials: false,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response);
      toast.success(response.data.message);
      setcartItem(response.data?.cart?.items);
      setcartId(response.data?.cart?._id);
      setCart(response.data?.cart?.items?.length);
      setTotalAmount(response.data?.cart?.cartTotal);
      setGst(response.data?.cart?.GST);
      setPayableAmount(response.data?.cart?.cartTotalaftergst);
      //  if want to empty the coupon code after deleting  every item setCouponCode("")
    } catch (error) {
      toast.error("Plan not found in Cart to delete");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //fetching all coupons from the coupons api
  const fetchCouponDetails = async () => {
    setLoading(true);

    try {
      // console.log("This is user's token", token);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/coupans`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { success, coupan } = response.data;
      // console.log("coupon ka response aaaya re", coupan);
      if (success) {
        setOptions(coupan);
      }
    } catch (error) {
      if (error.response) {
        //! The request was made and the server responded with a status code
        console.log("Server Error:", error.response.data);
        console.log("Status Code:", error.response.status);
      } else if (error.request) {
        //! The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        //! Something happened in setting up the request that triggered an Error
        console.log("Error:", error.message);
      }
      toast.error("Failed to fetch Coupon Details");
      console.log("Error config:", error.config);
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = async () => {
    try {
      setLoading(true);
      // console.log("Coupon Code just before post request :", couponCode);
      const couponcode = couponCode;
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/cart/apply-coupon`,
        { couponcode },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("Coupon Code applied :", couponCode);
      // console.log("Apply coupon post request function response", response.data)
      const { message, cart: updatedCart } = response.data;

      // console.log("TotalAmount withoust gst  : ", totalAmount);
      setCart(updatedCart);
      const updatedCartTotal = updatedCart.cartTotal;
      console.log("updatedCartTotal", updatedCartTotal);
      console.log("you saved :", updatedCart.Discount);
      const finalDiscountedTotal = updatedCartTotal + gst;

      setIsCouponApplied(true);
      setCartTotal(finalDiscountedTotal.toFixed(2));
      setShowCartTotal(true);
      setApplyVisible(false);
      setRemoveVisible(true);
      toast.success(message);
    } catch (error) {
      console.log("Failed to apply coupon:", error);
      // console.log("apply coupon unsuccessful hone ke baad setCouponCode state :", couponCode);
      if (error.response && error.response.status === 404) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      } else if (error.response && error.response.status === 400) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  //remove coupon==
  const removeCoupon = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/cart/remove-coupon`,
        {
          data: { couponCode }, // Send the coupon code in the request body
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      const { message, cart: updatedCart } = response.data;
      setIsCouponApplied(false);
      setCouponCode(" ");
      setCart(updatedCart);
      setShowCartTotal(false);
      setCartTotal(updatedCart.cartTotal);
      // console.log("*********After Remove Coupon ***************");
      // console.log("after removing ccoupon CartTotal", updatedCart.cartTotal);
      // console.log("Discount after coupon remove", updatedCart.Discount);
      setApplyVisible(true);
      setRemoveVisible(false);
      toast.success(message);
    } catch (error) {
      toast.error("Failed to remove Coupon");
      console.error("Error removing coupon:", error);
    } finally {
      setLoading(false);
    }
  };

  //  Order Placing api
  const OrderPlace = async () => {
    setLoading(true);

    try {
      const data = {
        cartId: cartId,
        vendorId: "65d098cd4beec65a75da2cf1",
        modeOfPayment: "Cheque",
      };

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/order/create`,
        data,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success == true) {
        toast.success(response.data.message);
        getCartItems();
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Order not Placed! ");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const continueShopping = () => {
    navigate("/");
  };

  const toTitleCase = (str) =>
    str.replace(
      /(^\w|\s\w)(\S*)/g,
      (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
    );

  return (
    <div
      className="w-[85%] md:w-[90%] lg:w-[80%] xl:w-[70%] max-w-[1500px] mx-auto flex flex-col gap-y-5 my-3"
      style={{ fontFamily: "inter" }}
    >
      <h1 className="text-left text-xl font-bold">My Cart</h1>
      {cartItem.length === 0 ? (
        <div className=" mt-4 flex flex-col">
          <FaCartPlus className="mt-4 mx-auto text-4xl text-[#2d2b2bc7]" />
          <h1 className="text-3xl text-[#323232c7] text-center font-semibold  mt-3">
            {" "}
            Oops! Your Cart is Empty{" "}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between gap-x-5 gap-y-5">
          {/* left part */}
          <div className="md:w-[57%] xl:w-[70%]">
            {/* cart item */}

            <div className="flex flex-col gap-y-5">
              {cartItem ? (
                cartItem.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm py-4 px-4"
                  >
                    <div className="flex flex-col gap-y-3 max-sm:w-[75%]">
                      <h2 className="text-left font-medium text-lg">
                        {item.service.name || item.serviceType}
                     
                      </h2>
                      {item.plans.length == 1 && (
                     <span className="font-normal text-left">{item.plans[0]?.planName}</span>
                      )}
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
                        <div>
                        <p className="text-left text-sm mb-3">
                          Include {item.plans.length} plans
                        </p>
                      {item.plans.map((plan) => (
                         <div
                         key={plan._id}
                         className="flex justify-between"
                       >
                        <span className="font-normal text-left w-[20vw]">{plan.planName}</span>
                     

                     
                        <span className="font-medium">  ₹{plan.price} </span>


                        <button
                        className="text-sm text-red-500 ml-4"
                        onClick={DeleteCartItem(plan.id)}
                      >
                        Delete
                      </button>
                      
                        </div>

                      ))}
                       
                      
                        </div>
                      )}

                      <div className="flex justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-1"></div>
                    </div>
                    <div className="max-sm:w-[25%] flex flex-col gap-y-6">
                      <b>
                        {" "}
                        ₹{" "}
                        {item.plans.reduce((acc, curr) => acc + curr.price, 0)}
                        
                      </b>
                      {item.plans.length == 1 && (
                      <button
                        className="text-sm text-red-500"
                        onClick={DeleteCartItem(item.plans[0].id)}
                      >
                        Delete
                      </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </div>

            {/* Frequently Bought Together */}
            <div className="mt-4  flex flex-col gap-2">
              <h1 className="text-base font-medium text-left">
                Frequently Bought Together
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5">
                {allService?.length ? (
                  allService.map((service) => (
                    <div
                      key={service._id}
                      className="border-[1.2px] border-gray-400/90 flex flex-col md:w-[95%] mx-auto hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() =>
                        (window.location.href = toTitleCase(service.title)
                          .split(" ")
                          .join("-"))
                      }
                    >
                      <img
                        src={service.image}
                        alt=""
                        className="aspect-[3/2] h-[60%]"
                        loading="lazy"
                      />
                      <div className="flex flex-col h-full p-2">
                        <h1 className="text-sm font-medium text-left ">
                          {service.title}
                        </h1>
                        <p className="line-clamp-2 text-left text-sm text-gray-600 mt-1">
                          {service.description}
                        </p>
                        <div className="mt-auto">
                          <p className="text-left text-[13px]">
                            Price :{" "}
                            <span className="text-[12.5px] font-medium">
                              ₹{service.price}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-left">Loading ...</p>
                )}
              </div>
            </div>
          </div>

          {/* payment box - right part*/}
          <div className="md:w-[40%] xl:w-[30%] flex flex-col gap-y-3">
            <div className="flex flex-col justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm py-4 px-4 gap-y-8">
              <div className="flex flex-col gap-y-3">
                <b className="text-lg text-left">Price Details</b>
                <div className="flex flex-col gap-y-3">
                  <div className="flex justify-between">
                    <p>Total</p>
                    <p>₹ {totalAmount}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>GST</p>
                    <p>₹ {gst.toFixed(0)}</p>

                  </div>
                </div>
              </div>
              {/* <hr /> */}

              <div className="flex flex-col gap-y-8 border-t-2 pt-3">
                {showcartTotal && cartTotal !== null && cartTotal !== 0 ? (
                  <>
                    <div className="flex justify-between font-bold">
                      <p className="line-through text-left">
                        Total Payable Amount
                      </p>
                      <p className="line-through">
                        ₹{payableAmount.toFixed(0)}
                      </p>
                    </div>
                    <div className="flex justify-between font-bold -mt-4 ">
                      <p className="">Discounted Total</p>
                      <p>₹ {cartTotal}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between font-semibold text-[15px]">
                    <p className="text-left max-w-[55%]">
                      Total Payable Amount
                    </p>
                    <p className="text-right">₹{payableAmount.toFixed(0)}</p>
                  </div>
                )}
                <button
                  className="bg-orange-500 text-white font-semibold px-3 py-2 rounded-lg flex justify-center items-center"
                  onClick={() => {
                    if (token) {
                      navigate("/check-out", {
                        state: {
                          cartItem,
                          totalAmount,
                          gst,
                          payableAmount,
                          cartId,
                        },
                      });
                    } else {
                      localStorage.setItem("intendedDestination", "/cart")
                      navigate("/login");
                    }
                  }}
                >
                  CONTINUE
                </button>
              </div>
            </div>
            <div
              className="flex justify-between items-center gap-x-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm py-3 px-3 text-sm"
              onClick={() => {
                if (!token) {
                  toast.error("Please login to apply offers");
                  return;
                }
              }}
            >
              <div className="flex flex-col gap-y-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={couponCode}
                  onChange={handleInputChange}
                  // disabled={!token}
                  onClick={() => {
                    if (token) {
                      setShowOptions(true);
                    } else {
                      toast.error("Please login to apply offers");
                      return;
                    }
                  }}
                  placeholder="Enter Your Coupon Code"
                  className="outline-none pb-1 border-b-2 text-gray-700 grow"
                />

                <ul className="flex flex-col justify-center items-stretch gap-y-2 text-gray-500 italic text-xs mt-1">
                  {showOptions &&
                    options.map((coupon) => (
                      <>
                        <li
                          key={coupon.couponcode}
                          className="coupon  rounded-md p-2 grid gap-1 border-1 border-orange-500 cursor-pointer"
                          onClick={() => handleOptionSelect(coupon.couponcode)}
                        >
                          <div className="row1 flex font-bold text-black justify-between">
                            <p>{coupon.name}</p>
                            <p>{coupon.couponcode}</p>
                          </div>
                          <div className="row2 flex font-semibold justify-between">
                            <div className="grid text-black">
                              <p>Discount:</p>
                              <p> {coupon.discountpercentage}%</p>
                            </div>
                            <div className="grid text-black">
                              <p>Expiry Date:</p>
                              <p> {coupon.expiryDate}</p>
                            </div>
                          </div>
                        </li>
                      </>
                    ))}
                </ul>
              </div>

              <button
                className={`text-orange-500 border-2 border-orange-500 px-3 py-1 rounded-md self-start ${
                  applyVisible ? "" : "hidden"
                }`}
                onClick={() => {
                  if (token) {
                    applyCoupon();
                  } else {
                    toast.error("Please login to apply offers");
                    return;
                  }
                }}
              >
                Apply
              </button>
              <button
                className={`text-orange-500 border-2 border-orange-500 px-3 py-1 rounded-md self-start ${
                  removeVisible ? "" : "hidden"
                }`}
                onClick={removeCoupon}
              >
                Remove
              </button>
            </div>
            {/* <FormControl size="medium" className="w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-2">
              <InputLabel id="demo-select-small-label">Select Your Vendor</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={vendorId}
                label="Select Your Vendor"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Select Your Vendor</em>
                </MenuItem>
                <MenuItem value={1}>Vendor 1</MenuItem>
                <MenuItem value={2}>Vendor 2</MenuItem>
                <MenuItem value={3}>Vendor 3</MenuItem>
              </Select>
            </FormControl> */}
          </div>
        </div>
      )}
      <button
        onClick={continueShopping}
        className="mt-5 self-center md:self-start border-2 border-orange-500 text-orange-500 text-sm font-semibold px-3 py-2 flex justify-center items-center"
      >
        CONTINUE SHOPPING
      </button>
      <div className="h-40" />
    </div>
  );
};

export default Cart;
