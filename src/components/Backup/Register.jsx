import React, { useState } from "react";
import Customcss from "./Customcss";
import axios from "axios";
import swal from "sweetalert";
const Register = () => {
  const [signUpMode, setSignUpMode] = useState(false);
  const [showSmallDeviceContent, setShowSmallDeviceContent] = useState(false);



  const toggleSignUpMode = () => {
    setSignUpMode(!signUpMode);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const handleSignIn = async (event) => {
    event.preventDefault();
    console.log("button clicked");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/auth/login`,
        {
          email: user.email,
          password: user.password,
        }
      );
      // console.group(response)
      console.log("Mai response hu dekho jra", response);
      // if (response.data.success) {
      if (response) {
        // console.log(response)
        if (response.status === 400 || response.status === 401) {
          swal("Invalid Credentials", "Please try again", "error");
        } else {
          swal("Congratulations! Sign in successful", "Enjoy", "success");
        }
      }
    } catch (error) {
      if (error.response) {
        // console.log('errorrr hai yr')
        // Display the server's response data and status code
        swal("Invalid Credentials Or User Does Not Exists", "Please try again", "error");
      } else {
        // Handle other request errors
        console.error("API error:", error.message);
      }
    }
  };


  // SignUp Form
  const [user1, setUser1] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  const handleInput1 = (event) => {
    setUser1({
      ...user1,
      [event.target.name]: event.target.value,
    });
  };



  const handleSignUp = async (event) => {
    event.preventDefault();
    console.log("button clicked");
    try {
      const response = await axios.post(
        "https://rk80csg.srv-01.purezzatechnologies.com/api/auth/signup",
        {
          firstName: user1.firstName,
          lastName: user1.lastName,
          email: user1.email,
          phoneNumber: user1.phoneNumber,
          phoneNumber: user1.phoneNumber,
          password: user1.password,
          confirmPassword: user1.confirmPassword,
          provider: "local"
        }
      );
      // console.group(response)
      console.log("Mai response signup se aara hu", response);
      // if (response.data.success) {
      if (response) {
        // console.log('mai response hu signup se',response)
        if (response.status === 400 || response.status === 401) {
          swal("Already Exists", "Please Login", "error");
        } else {
          swal("Congratulations! Signup successful", "Enjoy", "success");
        }
      }
    } catch (error) {
      if (error.response) {
        // console.log('errorrr hai yr')
        // Display the server's response data and status code
        console.log("API error:", error.message);
      } else {
        // Handle other request errors
        console.error("API error:", error.message);
      }
    }
  };

  const handleGoogleAuth  = async (e) => {
    e.preventDefault();
    window.location.href = `${process.env.REACT_APP_SERVER_PRO_URL}/api/google`
  };

  const handleFacebookAuth  = async (e) => {
    e.preventDefault();
    window.location.href = `${process.env.REACT_APP_SERVER_PRO_URL}/api/facebook`
  };



  return (
    <>
      <Customcss />
      <div className="w-full h-full flex justify-center items-center">
      <div className={`new-container ${signUpMode ? "new-sign-up-mode" : ""}`}>
        <div className="new-signin-signup">
          {/* Sign In Form */}

          <form
            className={`new-form new-sign-in-form ${signUpMode ? "visible" : ""
              }`}
               onSubmit={handleSignUp}
          >
            <h2 className="new-title">Register</h2>
            <div className="new-input-field">
              <i className="fas fa-user" />
              <input type="text"
                 placeholder="First Name"
                 name="firstName" // Change this to "firstName1"
                 value={user1.firstName}
                 onChange={handleInput1}/>
            </div>
            <div className="new-input-field">
              <i className="fas fa-envelope" />
              <input type="text"
                 placeholder="Last Name"
                 name="lastName" // Change this to "firstName1"
                 value={user1.lastName}
                 onChange={handleInput1}/>
            </div>

            <div className="new-input-field">
              <i className="fas fa-envelope" />
              <input type="email"
                 placeholder="Enter Your Email"
                 name="email" // Change this to "firstName1"
                 value={user1.email}
                 onChange={handleInput1}/>
            </div>

            <div className="new-input-field">
              <i className="fas fa-envelope" />
              <input type="text"
                 placeholder="Phone Number"
                 name="phoneNumber" // Change this to "firstName1"
                 value={user1.phoneNumber}
                 onChange={handleInput1}/>
            </div>

            <div className="new-input-field">
              <i className="fas fa-envelope" />
              <input type="password"
                 placeholder="Enter Your Password"
                 name="password" // Change this to "firstName1"
                 value={user1.password}
                 onChange={handleInput1}/>
            </div>

            <div className="new-input-field">
              <i className="fas fa-envelope" />
              <input type="password"
                 placeholder="Confirm Password"
                 name="confirmPassword" // Change this to "firstName1"
                 value={user1.confirmPassword}
                 onChange={handleInput1}/>
            </div>
            <input type="submit" defaultValue="Sign up" className="new-btn" id="signin"/>
            <p className="new-social-text">Or Sign in with social platform</p>
            <div className="new-social-media">
              <a href="#" className="new-social-icon">
                <i className="fab fa-facebook" />
              </a>
              <a href="" className="new-social-icon">
                <i className="fab fa-twitter" />
              </a>
              <a href="" className="new-social-icon">
                <i className="fab fa-google" />
              </a>
              <a href="" className="new-social-icon">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <p className="new-account-text">
              Already have an account?{" "}
              <a href="#" id="new-sign-in-btn">
                Login 
              </a>
            </p>
          </form>
         

          {/* Sign Up Form */}



          <form
            className={`new-form new-sign-in-form ${!signUpMode ? "visible" : ""
              }`}
               onSubmit={handleSignIn} 
          >
            <h2 className="new-title">Login</h2>
            <div className="new-input-field">
              <i className="fas fa-user" />
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email" // Add the name attribute
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div className="new-input-field">
              <i className="fas fa-lock" />
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password" // Add the name attribute
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <input type="submit" defaultValue="Register" className="new-btn" />
            <p className="new-social-text">Or Sign in with social platform</p>
            <div className="new-social-media">
              <div className="new-social-icon" onClick={handleGoogleAuth}>
                <i className="fab fa-google" />
              </div>
              <div href="" className="new-social-icon" onClick={handleFacebookAuth}>
                <i className="fab fa-twitter" />
              </div>
              <a href="" className="new-social-icon">
                <i className="fab fa-google" />
              </a>
              <a href="" className="new-social-icon">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <p className="new-account-text">
              Don't have an account?{" "}
              <a href="#" id="new-sign-up-btn">
                Register
              </a>
            </p>
          </form>
        </div>

        {/* Panels */}
        <div className="new-panels-container">
          <div className="new-panel new-left-panel">
            <div className="new-content">
              <h3>Member of Brand?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                accusantium dolor, eos incidunt minima iure?
              </p>
              <button
                className="new-btn"
                id="new-sign-in-btn"
                onClick={toggleSignUpMode}
              >
                Register
              </button>
            </div>
            <img src="signin.svg" alt="" className="new-image" />
          </div>
          <div className="new-panel new-right-panel">
            <div className="new-content">
              <h3>New to Brand?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                accusantium dolor, eos incidunt minima iure?
              </p>
              <button
                className="new-btn"
                id="new-sign-up-btn"
                onClick={toggleSignUpMode}
              >
                Login
              </button>
            </div>
            <img src="signup.svg" alt="" className="new-image" />
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default Register;
