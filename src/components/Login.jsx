import React, { useContext, useState } from "react";
import "../css/Register.css";

import InputElement from "../UI/InputElement/InputElement";
import axios from "axios";
import contextAuth from "../ContextAPI/ContextAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const Auth = useContext(contextAuth);
  let [overAllValid, setOverAllValid] = useState(false);
  let [inputs, setInputs] = useState({
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });

  const changeHandler = (event, type) => {
    let value = event.target.value;
    let updatedInputs = { ...inputs };

    if (type == "email") {
      if (!value.includes("@gmail.com")) {
        updatedInputs[type].isValid = false;
      } else updatedInputs[type].isValid = true;
    } else {
      if (value.length < 1) {
        updatedInputs[type].isValid = false;
      } else updatedInputs[type].isValid = true;
    }

    updatedInputs[type].value = value;
    setInputs(updatedInputs);
    overAllValidity();
  };

  const overAllValidity = () => {
    let { email, password } = inputs;
    if (email.isValid && password.isValid) setOverAllValid(true);
    else setOverAllValid(false);
  };

  const submitFormHanadler = (event) => {
    event.preventDefault();
    Auth.loadingHandler(true);
    const { email, password } = inputs;

    let data = {};
    data.email = email.value;
    data.password = password.value;
    data.cartid = JSON.parse(localStorage.getItem("cartId"));

    axios
      .post(`${process.env.REACT_APP_SERVER_PRO_URL}/api/auth/login`, data)
      .then((response) => {
        let data = response.data;
        if (data.status == "success") {
          Auth.login(data.user, data.token);
          Auth.getCartItems(data.token);
          toast.success("Login Successful");
          // Check if there's an intended destination in local storage
          const intendedDestination = localStorage.getItem(
            "intendedDestination"
          );
          if (intendedDestination) {
            navigate(intendedDestination);
            // Clear the intended destination from local storage
            localStorage.removeItem("intendedDestination");
          }else{
            navigate("/");
          }
        } else {
          Auth.loadingHandler(false);
          Auth.errorHandler({ message: data.error, type: data.type });
          toast.error("Login Failed");
        }
      })
      .catch((err) => console.log(err));
    Auth.loadingHandler(false);
  };

  const googleLogin = async (credential) => {
    let cartid = null;
    cartid = JSON.parse(localStorage.getItem("cartId"));
    Auth.loadingHandler(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/auth/google`,
        {
          credential,
          cartid,
        }
      );
      // console.log('GOOGLE LOGIN API RESPONSE.........', res);
      if (res.data.status !== "success") {
        Auth.errorHandler({ message: res.data.error, type: res.data.type });
        throw new Error(res.data.error);
      }
      Auth.login(res.data.user, res.data.token);
      Auth.getCartItems(res.data.token);
      toast.success("Login Successful");
      // Check if there's an intended destination in local storage
      const intendedDestination = localStorage.getItem(
        "intendedDestination"
      );
      if (intendedDestination) {
        navigate(intendedDestination);
        // Clear the intended destination from local storage
        localStorage.removeItem("intendedDestination");
      }else{
        navigate("/");
      }
    } catch (error) {
      console.log("ERROR IN GOOGLE SIGNIN.......", error);
      toast.error("Login Failed");
    }
    Auth.loadingHandler(false);
  };

  return (
    <div className="Register w-full flex flex-col justify-center items-center max-w-[1500px] mx-auto">
      <form
        className="reg-form w-[85%] flex flex-col py-4 px-4 m-5 
            sm:w-[80%]
            md:w-[70%]
            lg:w-[55%]"
      >
        {/* Form Inputs */}
        <h4 className="mb-5 mt-1 text-left">Find a job & grow your career</h4>
        <div
          className="w-full flex flex-col
                md:flex-row md:justify-around max-md:items-center max-md:gap-y-4 gap-x-2"
        >
          <div
            className="w-[100%] mr-3
                    md:w-[60%]"
          >
            <InputElement
              field={"email"}
              type={"email"}
              label={"Email ID"}
              placeholder={"Tell us your Email ID"}
              error={"Please enter a valid gmail."}
              value={inputs.email.value}
              valid={inputs.email.isValid}
              onChange={changeHandler}
            />

            <InputElement
              field={"password"}
              type={"password"}
              label={"Password"}
              placeholder={"Enter you password"}
              error={""}
              value={inputs.password.value}
              valid={inputs.password.isValid}
              onChange={changeHandler}
            />

            {/* Submit Button */}
            <div className="submitWrapper flex flex-col text-left mt-2">
              <p className="gray13px">
                By clicking Sign in, you agree to the Terms and Conditions &
                Privacy Policy of Doledge.com
              </p>
              <button
                className="submit text-left mt-2"
                disabled={overAllValid ? false : true}
                style={{ backgroundColor: !overAllValid && "#ccc" }}
                onClick={submitFormHanadler}
              >
                Sign in
              </button>
            </div>
          </div>

          <div className="flex md:flex-col justify-center items-center md:gap-6 max-md:w-[80%] md:w-5 md:h-48 mx-auto ">
            <hr className="w-full md:rotate-90 md:w-16" />
            <p className="p-2 text-lg text-gray-500/70 bg-white">or</p>
            <hr className="w-full md:rotate-90 md:w-16" />
          </div>

          {/* Google Register */}
          <div className="md:translate-y-[28%] lg:translate-y-[30%]">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                googleLogin(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              shape="pill"
              useOneTap
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
