import React from "react";

import payment1 from "../images/mastercard.jpg";
import payment2 from "../images/visa.png";
import payment3 from "../images/american-express.png";
import payment4 from "../images/maestro.png";
import payment5 from "../images/Rupay-Logo.png";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";

const Footer2 = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex w-[100%] h-[100%] flex-col gap-y-2">
        <hr className="h-[2px] text border-gray-400 bg-gray-400 -z-10" />
        {/* Payment Section */}
        <div className="md:w-[70%] max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center max-md:p-1">
          <div className="flex flex-col">
            <div
              className="w-full text-black leading-[31px] text-left tracking-wider xl:tracking-widest text-base max-md:text-center md:text-[15px]"
              style={{
                color: "black",
                // fontSize: '22px',
                fontFamily: "Inter,Arial,sans-serif",
                fontWeight: "700",
                // wordWrap: 'break-word',
                // border: '1px solid black'
              }}
            >
              Purchase securely with Doledgeindia.com
            </div>

            <div
              className="w-full text-black max-md:text-center md:text-[15px] text-left"
              style={{
                // fontSize: '20px',
                fontFamily: "Inter,Arial,sans-serif",
                fontWeight: "300",
                letterSpacing: 1.6,
                // border: '1px solid black'
              }}
            >
              Support secure payment method
            </div>
          </div>

          <div className="flex justify-center items-center md:gap-3 bg-white max-sm:p-1">
            <img
              src={payment1}
              alt=""
              loading="lazy"
              className="h-[60px] w-[80px] sm:w-[90px] !bg-white border-r-2"
            />
            <img
              src={payment2}
              alt=""
              loading="lazy"
              className="h-[60px] w-[80px] sm:w-[90px] bg-white pr-2 "
            />
            <img
              src={payment3}
              alt=""
              loading="lazy"
              className="h-[60px] w-[80px] sm:w-[90px] bg-white px-2 border-r-2 border-l-2"
            />
            <img
              src={payment4}
              alt=""
              loading="lazy"
              className="h-[60px] w-[80px] sm:w-[90px] bg-white pr-3 border-r-2"
            />
            <img
              src={payment5}
              alt=""
              loading="lazy"
              className="h-[60px] w-[80px] sm:w-[90px] bg-white"
            />
          </div>
        </div>

        <hr className="h-[2px] text border-gray-400 bg-gray-400 -z-10" />

        {/* section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center max-lg:gap-3 lg:gap-5 lg:pt-3 md:w-[70%] max-w-[1500px] mx-auto">
          {/* <div className="md:text-start max-lg:mx-auto max-lg:w-[90%]">
            <p className=" text-black font-bold text-base pt-3">About Us</p>

            <div className="lg:mt-6 max-md:mx-auto">
              <img
                src={require("../images/Icons/Doledge-Logo-Final.webp")}
                alt="Rectangle105"
                className="w-full"
              />
            </div>
            <div className=" text-black lg:text-left text-base font-semibold lg:w-[95%]">
              <h1 className="text-black text-base lg:pb-4">
                {" "}
                We focus on the needs of small to middle market businesses to
                improve and grow their return.
              </h1>

              <h1 className=" text-black text-base lg:pb-2">
                Phone: <a href="tel:9311679499">+91-931-167-9499</a>
              </h1>

              <h1 className="text-black text-base lg:pb-24">
                Email:{" "}
                <button
                  onClick={() =>
                    (window.location = "mailto:support@doledgeindia.com")
                  }
                >
                  support@doledgeindia.com
                </button>
              </h1>
            </div>
          </div> */}
          <div
            className=" text-black text-[15px] font-['Inter'] leading-[30px] md:text-left"
            style={{
              color: "black",
              fontSize: 13,
              fontFamily: "Inter,Arial,sans-serif",

              letterSpacing: 1,
              wordWrap: "break-word",
              // border: '1px solid black'
            }}
          >
            <h1 className="text-black pt-3 text-base font-bold pb-4">
              Useful Links
            </h1>
            <Link to="/">Home</Link>
            <br />
            <Link to="/register">Register Now</Link>
            <br />
            <Link to="/about-us">About us</Link>
            <br />
            <Link to="/contact-us">Contact us</Link>
            <br />
            <Link to="/disclaimer">Disclaimer</Link>
            <br />
            <Link to="/terms-conditions">Terms & Conditions</Link>
            <br />
            <Link to="/privacy-policy">Privacy Policy</Link>
            <br />
            <Link to="/refund-cancellation-policy">
              Refund & Cancellation Policy
            </Link>
            <br />
            <Link to="/fraud-alert">Fraud Alert</Link>
            <br />
          </div>
          <div
            className=" text-black text-[15px] font-['Inter'] leading-[30px] md:text-left"
            style={{
              color: "black",
              fontSize: 13,
              fontFamily: "Inter,Arial,sans-serif",

              letterSpacing: 1,
              wordWrap: "break-word",
              // border: '1px solid black'
            }}
          >
            <h1 className="text-black pt-3 text-base font-bold pb-4">
              Screening Services
            </h1>
            <Link to="/Document-Verification">
              <ChevronRightIcon fontSize="xs" />
              Aadhar Card Verification
            </Link>
            <br />
            <Link to="/Document-Verification">
              <ChevronRightIcon fontSize="xs" />
              PAN Card Verification
            </Link>
            <br />
            <Link to="/Employee-Background-Verification">
              <ChevronRightIcon fontSize="xs" />
              Address Verification (Digital)
            </Link>
            <br />
            <Link to="/Employee-Background-Verification">
              <ChevronRightIcon fontSize="xs" />
              Current Employment Verification
            </Link>
            <br />
            <Link to="/Employee-Background-Verification">
              <ChevronRightIcon fontSize="xs" />
              Previous Employment Verification
            </Link>
            <br />
            <Link to="/Employee-Background-Verification">
              <ChevronRightIcon fontSize="xs" />
              Education Verification
            </Link>
            <br />
            <Link to="/Employee-Background-Verification">
              <ChevronRightIcon fontSize="xs" />
              Criminal/Court Check
            </Link>
            <br />
            <Link to="/Employee-Background-Verification">
              <ChevronRightIcon fontSize="xs" />
              Global Database Check
            </Link>
            <br />
            <Link to="/Employee-Background-Verification">
              <ChevronRightIcon fontSize="xs" />
              Web Screening Service
            </Link>
            <br />
          </div>
          <div
            className=" text-black text-[15px]  font-['Inter'] leading-[30px] md:text-left"
            style={{
              color: "black",
              fontSize: 13,
              fontFamily: "Inter,Arial,sans-serif",

              letterSpacing: 1,
              wordWrap: "break-word",
              // border: '1px solid black'
            }}
          >
            <h1 className="text-black pt-3 text-base font-bold pb-4">
              Jobseeker Services
            </h1>
            <Link to="/">
              <ChevronRightIcon fontSize="xs" />
              Home
            </Link>
            <br />
            <Link to="/register">
              <ChevronRightIcon fontSize="xs" />
              Register Now
            </Link>
            <br />
            <Link to="/Zap-Your-Resume">
              <ChevronRightIcon fontSize="xs" />
              Zap Your Resume
            </Link>
            <br />
            <Link to="/Highlight-Your-Resume">
              <ChevronRightIcon fontSize="xs" />
              Highlight Your Resume
            </Link>
            <br />
            <Link to="/Job-Search-Assistant">
              <ChevronRightIcon fontSize="xs" />
              Job Search Assistant-3 Months
            </Link>
            <br />
            <Link to="/Job-Search-Assistant">
              <ChevronRightIcon fontSize="xs" />
              Job Search Assistant-6 Months
            </Link>
            <br />
            <Link to="/Social-Profiler">
              <ChevronRightIcon fontSize="xs" />
              Social Profiler
            </Link>
            {/* <br />
            <Link to="/Personal-Portfolio">
              <ChevronRightIcon fontSize="xs" />
              Personal Portfolio
            </Link> */}
            <br />
            <Link to="/Interview-Preparation">
              <ChevronRightIcon fontSize="xs" />
              Interview Preparation
            </Link>
            <br />
          </div>
          <div
            className=" text-black text-[15px]  font-['Inter'] leading-[30px] md:text-left h-full w-full"
            style={{
              color: "black",
              fontSize: 13,
              fontFamily: "Inter,Arial,sans-serif",

              letterSpacing: 1,
              wordWrap: "break-word",
              // border: '1px solid black'
            }}
          >
            <h1 className="text-black pl-3 pt-3 text-base font-bold leading-tight">Connect With us through Our Application </h1>
            <p className="text-sm py-2 pl-3">Coming Soon..</p>
            <div className="max-md:flex mx-md:justify-between ">
              <Link to="https://play.google.com/store/apps">
                <img
                  src={require("../images/playstore.png")}
                  alt="playstore image"
                  loading="lazy"
                  className=" h-[60px] "
                />
              </Link>
              <Link to="https://www.apple.com/app-store/">
                <img
                  src={require("../images/appstore6.png")}
                  alt="app store image"
                  loading="lazy"
                  className=" pl-1 h-[66px]"
                />
              </Link>
            </div>

          </div>
        </div>
        <div className=" text-black flex md:flex-col md:w-[70%] max-w-[1500px] mx-auto md:pt-4 pb-7">
          <div className="flex justify-between items-center sm:text-xs text-[10px]  max-md:flex-col">
            <div className="">
              © {currentYear} DoledgeIndia || All rights reserved. Design by
              <Link className="font-semibold" to="/">
                {" "}
                DoledgeIndia
              </Link>
            </div>
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="text-[10px] sm:text-xs text-green-700 font-bold "
            >
              Back to top
              <ArrowDropUpRoundedIcon fontSize="large" />
            </button>
          </div>
        </div>

        <hr className="h-[2px] text border-gray-400 bg-gray-400 -z-10" />
        {/* Social Networks */}
        <div className="flex justify-center items-center py-2">
          <Link to="https://www.facebook.com/profile.php?id=100087562683334&mibextid=LQQJ4d" target="_blank">
            <img
              className="w-[25px] h-[25px] mx-1"
              src={require("../images/social-facebook.png")}
            />
          </Link>
          <Link to="https://www.instagram.com/doledgeindia?igsh=MWEzMXljb2w4b3I0aA==" target="_blank">
            <img
              className="w-[25px] h-[25px] mx-1"
              src={require("../images/social-instagram.png")}
            />
          </Link>
          <Link to="https://x.com/doledgeindia?s=11" target="_blank">
            <img
              className="w-[25px] h-[25px] mx-1"
              src={require("../images/social-twitter.png")}
            />
          </Link>
        </div>

        <hr className="h-[2px] text border-gray-400 bg-gray-400 -z-10" />

        <div
          className="text-[10px] text-left md:w-[63%] max-w-[1000px] mx-auto flex flex-col gap-y-2 text-gray-500 mt-4 mb-12  max-md:px-4"
          style={{ fontFamily: "inter" }}
        >
          <p>Disclaimer</p>
          <p>
            Our resume services selling website offers assistance in crafting
            professional resumes tailored to your skills and experiences.
            However, we do not guarantee job placement or assure any job offers
            or interview calls. While we strive to optimize your resume to
            enhance your job prospects, securing employment ultimately depends
            on various external factors beyond our control. We are not
            responsible for any outcomes resulting from the use of our services,
            including job offers or lack thereof. Users are encouraged to
            actively pursue job opportunities and utilize our services as one
            aspect of their job search strategy.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer2;
