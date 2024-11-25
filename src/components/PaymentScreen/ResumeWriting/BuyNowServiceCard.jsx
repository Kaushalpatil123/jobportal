import React, { useState, useEffect, useContext } from "react";
import { Card, Typography, Button, Box } from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  Checkbox,
  RadioGroup,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import contextAuth from "../../../ContextAPI/ContextAuth";
import toast from "react-hot-toast";
const serviceType = "visualresumeservices";

export default function BuyNowServiceCard(props) {
  const { setLoading, token } = useContext(contextAuth);
  const plans = Object.values(props.plans.plans)[0];
  const mapPlans = [
    {
      planName: "Regular 8 working days",
      price: plans[0].price,
      _id: plans[0]._id,
    },
    {
      planName: `Express 4 working days (Rs.${plans[1].price})`,
      price: plans[0].price + plans[1].price,
      _id: plans[1]._id,
    },
    {
      planName: `Super express 2 working days (Rs.${plans[2].price})`,
      price: plans[0].price + plans[2].price,
      _id: plans[2]._id,
    },
  ];
  const [optionPrice, setOptionPrice] = useState(
    Object.values(props?.plans?.plans)[0][0]?.price
  );
  const [includeCoverLetter, setIncludeCoverLetter] = useState(false);
  const serviceId = props?.plans?._id;
  const [optionId, setOptionId] = useState(
    Object.values(props?.plans?.plans)[0][0]?._id
  );

  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Handle change in selected plan
  const handlePlanChange = (event) => {
    const selectedOptionId = event.target.value; // Changed variable name
    const plan = mapPlans.find((p) => p._id === selectedOptionId); // Changed lookup key to _id
    setOptionId(selectedOptionId); // Update optionId with the selected option's ID
    setOptionPrice(plan.price); // Update option price
  };

  const [dynamicPrice, setDynamicPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_PRO_URL}/api/coverletterservice/plans`);
        // Assuming the API response contains the price as a property named 'price'
        setDynamicPrice(response.data.price[0].price);
        console.log("JOI LE TU AEK VAR ",response.data.price[0].price)
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    fetchData();
  }, []);

  // Handle change in cover letter option
  const handleCoverLetterChange = (event) => {
    setIncludeCoverLetter(event.target.checked);
    setOptionPrice(
      event.target.checked ? optionPrice + dynamicPrice : optionPrice - dynamicPrice
    );
  };

  // Handle buy now action
  const handleBuyNow = async () => {
    let cartId=null;
    if(localStorage.getItem("cartId") && !token){
      cartId=JSON.parse(localStorage.getItem("cartId"));
    }
    setLoading(true);
    try {
      const token = getToken(); // Call the getToken function to get the token value

      // Prepare data for adding items to the cart
      const data = {
        serviceType: props.plans.serviceName, // Update with your service type
        service: {
          id: props.plans._id,
          // name: props.plans.serviceName,
          name: `${props.name} ${props.plans.serviceName}`,
        },
        plans: [
          {
            id: optionId, // Use the selected optionId
            price: optionPrice, // Use the updated option price
            coverLetterIncluded: includeCoverLetter,
          },
        ],
        cartId
      };

      // Send request to add item to the cart
      const addToCartRes = await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/cart/${
          token ? "addtocart" : "add-to-cart"
        }`,
        data,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      // Process response
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

  const location = useLocation();
  const ResumeType = location.pathname.includes("Visual") ? "Visual" : "Text";

  return (
    <>
      {serviceId && optionId && (
        <div className="justify-content-center xl:flex lg:w-[55%] xl:w-[40%] py-2">
          <div className="div flex flex-col">
            <div
              className="mx-auto text-black text-lg sm:text-xl max-w-screen-sm md:max-w-full self-start text-center font-semibold md:mb-2"
              style={{ fontFamily: "Poppins", fontWeight: 300 }}
            >
              {ResumeType} Resume
            </div>
            <Card className="md:mt-1 md:w-[100%] my-2 h-full">
              <div className="bg-white max-xl:h-6 xl:h-[10%]"></div>
              <Typography
                component="div"
                gutterBottom
                style={{
                  background: "#D2D2D263",
                  fontSize: 26,
                  color: "#444",
                  padding: "7px 0",
                  fontWeight: "500",
                }}
              >
                Rs. {optionPrice}/-
                <p
                  className="inclTxt"
                  style={{
                    lineHeight: 1,
                    fontSize: "11px",
                    marginBottom: "5px",
                    fontWeight: "500",
                  }}
                >
                  *Applicable taxes may apply
                </p>
              </Typography>
              <FormControl component="fieldset" sx={{ paddingX: "20px" }}>
                <RadioGroup
                  aria-label="plans"
                  name="plans"
                  value={optionId}
                  onChange={handlePlanChange}
                >
                  <FormControlLabel
                    value=""
                    control={
                      <Checkbox
                        checked={includeCoverLetter}
                        onChange={handleCoverLetterChange}
                      />
                    }
                    label="Including Cover letter"
                    labelPlacement="end"
                  />
                  {mapPlans.map((plan, index) => (
                    <div key={plans[index]._id} className="flex">
                      <FormControlLabel
                        value={plans[index]._id} // Changed value to plan._id
                        control={<Radio />}
                        label={plan.planName}
                        labelPlacement="end"
                      />
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>

              {serviceId && optionId && (
                <Box sx={{ textAlign: "center", padding: "10px" }}>
                  <Button
                    type="submit"
                    onClick={handleBuyNow}
                    variant="contained"
                    style={{ backgroundColor: "rgba(245, 134, 52, 1)" }}
                  >
                    Buy Now
                  </Button>
                </Box>
              )}
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
