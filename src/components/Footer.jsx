import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import payment1 from '../images/mastercard.jpg'
import payment2 from '../images/visa.png'
import payment3 from '../images/american-express.png'
import payment4 from '../images/maestro.png'
import payment5 from '../images/Rupay-Logo.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className=" w-[100%] flex flex-col gap-y-4 ">
        <hr className="h-[2px] text border-gray-400 bg-gray-400" />
        {/* Payment Section */}
        <div className="md:w-[70%] max-w-[1500px] mx-auto flex flex-col md:flex-row justify-evenly items-center max-md:p-1">
          <div className="flex flex-col w-full md:w-[60%]">
            <div className="w-full text-black leading-[31px] text-left tracking-wider xl:tracking-widest text-base max-md:text-center md:text-[15px]" style={{
              color: 'black',
              // fontSize: '22px',
              fontFamily: 'Inter,Arial,sans-serif',
              fontWeight: '700',
              // wordWrap: 'break-word',
              // border: '1px solid black'
            }}>
              Purchase securely with Doledgeindia.com
            </div>

            <div className="w-full text-black max-md:text-center md:text-[15px] text-left" style={{
              // fontSize: '20px',
              fontFamily: 'Inter,Arial,sans-serif',
              fontWeight: '300',
              letterSpacing: 1.60,
              // border: '1px solid black'
            }}>
              Support secure payment method
            </div>
          </div>

          <div className="flex justify-center items-center md:gap-3 bg-white max-sm:p-1">
            <img src={payment1} alt="" loading="lazy" className="h-[60px] w-[80px] sm:w-[90px] !bg-white border-r-2" />
            <img src={payment2} alt="" loading="lazy" className="h-[60px] w-[80px] sm:w-[90px] bg-white pr-2 " />
            <img src={payment3} alt="" loading="lazy" className="h-[60px] w-[80px] sm:w-[90px] bg-white px-2 border-r-2 border-l-2" />
            <img src={payment4} alt="" loading="lazy" className="h-[60px] w-[80px] sm:w-[90px] bg-white pr-3 border-r-2" />
            <img src={payment5} alt="" loading="lazy" className="h-[60px] w-[80px] sm:w-[90px] bg-white" />
          </div>
        </div>

        <hr className="h-[2px] text border-gray-400 bg-gray-400" />

        {/* Footer Information */}
        <div className="flex flex-row justify-evenly items-center px-0 pt-4 w-[70%] max-w-[1500px] mx-auto">
          {/* section 1 */}
          <div className="flex flex-col
          lg:flex lg:flex-row">
            {/* Col 1 */}
            <div className="m-2 p-2 text-black text-[15px] font-light font-['Inter'] leading-[31px] tracking-[2.55px] text-left
            h-[300px] md:text-[7px]" style={{
                color: 'black',
                fontSize: 13,
                fontFamily: 'Inter,Arial,sans-serif',
                fontWeight: '300',
                letterSpacing: 2.55,
                wordWrap: 'break-word',
                // border: '1px solid black'
              }}>
              <Link to="/Text-Resume-Entry-Level">Resume Writing</Link>
              <br />
              <Link to="/Text-Resume-Entry-Level">Text Resume</Link>
              <br />
              <Link to="/Visual-Resume-Entry-Level">Visual Resume</Link>
              <br />
              <Link to="/Resume-Critique">Resume Critique</Link>
              <br />
              <Link to="/resume-quality-score">Resume Quality Score</Link>
              <br />
              <Link to="/Cover-Letter">Resume Samples</Link>
              <br />
              <Link to="/Cover-Letter">Cover Letter Samples</Link>
              <br />
              <Link>Job Letter Samples</Link>
            </div>

            {/* Col 2 */}
            <div className="m-2 p-2 text-black text-[15px] font-light font-['Inter'] leading-[31px] tracking-[2.55px] text-left
            h-[300px]" style={{
                color: 'black',
                fontSize: 13,
                fontFamily: 'Inter,Arial,sans-serif',
                fontWeight: '300',
                letterSpacing: 2.55,
                wordWrap: 'break-word',
                // border: '1px solid black'
              }}>
              <Link>Recruiter Reach</Link>
              <br />
              <Link>Resume Display</Link>
              <br />
              <Link>RecruiterConnection</Link>
              <br />
              <Link>Priority Applicant</Link>
              <br />
              <Link>Certification Highlighter</Link>
            </div>
          </div>

          <div className="flex flex-col
          lg:flex lg:flex-row">
            {/* Col 3 */}
            <div className="m-2 p-2 text-black text-[15px] font-light font-['Inter'] leading-[31px] tracking-[2.55px] text-left
            h-[300px]" style={{
                color: 'black',
                fontSize: 13,
                fontFamily: 'Inter,Arial,sans-serif',
                fontWeight: '300',
                letterSpacing: 2.55,
                wordWrap: 'break-word',
                // border: '1px solid black'
              }}>
              <Link to="/register">Register / Login</Link>
              <br />
              <Link>Job Search</Link>
              <br />
              <Link>Create Free Job Alert</Link>
              <br />
              <Link to="/Job-Search-Assistant">Job Assistance Services</Link>
              <br />
              <Link>Courses</Link>
              <br />
              <Link>Fraud Alert</Link>
            </div>

            {/* Download */}
            <div className="m-2 p-2 h-[300px]" style={{ border: '0px solid black' }}>
              <div className="text-black text-lg font-light font-['Inter'] tracking-[3.06px]" style={{
                color: 'black',
                fontSize: 13,
                fontFamily: 'Inter,Arial,sans-serif',
                fontWeight: '700',
                letterSpacing: 2.55,
                wordWrap: 'break-word'
              }}>
                Download Doledge App:
              </div>

              <Link>
                <div className="flex items-center justify-center p-1 mt-2 bg-white rounded-[20px] border-2 border-[#ccc]">
                  <div className="text-black text-sm font-light font-['Inter']" style={{
                    color: 'black',
                    fontSize: 12,
                    fontFamily: 'Inter,Arial,sans-serif',
                    fontWeight: '300',
                    // lineHeight: 31;
                    letterSpacing: 2.38,
                    wordWrap: 'break-word'

                  }}>
                    <Link>Play Store</Link>
                  </div>
                  <img
                    className="h-[30px] w-[30px] ml-2"
                    alt="play"
                    src={require("../images/play.png")}
                  />
                </div>
              </Link>

              <Link>
                <div className="flex items-center justify-center p-1 mt-2 bg-white rounded-[20px] border-2 border-[#ccc]">
                  <div className="text-left text-sm font-light font-['Inter']" style={{
                    color: 'black',
                    fontSize: 12,
                    fontFamily: 'Inter,Arial,sans-serif',
                    fontWeight: '300',
                    // lineHeight: 31;
                    letterSpacing: 2.38,
                    wordWrap: 'break-word'
                  }}>
                    App Store
                  </div>
                  <img
                    className="h-[30px] w-[30px] ml-2"
                    alt="play"
                    src={require("../images/apple.png")}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <hr className="h-[2px] text border-gray-400 bg-gray-400" />

        {/* Social Networks */}
        <div className="flex justify-center items-center py-2">
          <img
            className="w-[25px] h-[25px] mx-1"
            src={require("../images/social-facebook.png")} />
          <img
            className="w-[25px] h-[25px] mx-1"
            src={require("../images/social-instagram.png")} />
          <img
            className="w-[25px] h-[25px] mx-1"
            src={require("../images/social-twitter.png")} />
        </div>

        <hr className="h-[2px] text border-gray-400 bg-gray-400" />

        <div className='text-[10px] text-left md:w-[63%] max-w-[1000px] mx-auto flex flex-col gap-y-2 text-gray-500 mb-4' style={{ fontFamily: 'inter' }}>
          <p>
            Disclaimer
          </p>
          <p>
            Our resume services selling website offers assistance in crafting professional resumes tailored to your skills and experiences. However, we do not guarantee job placement or assure any job offers or interview calls. While we strive to optimize your resume to enhance your job prospects, securing employment ultimately depends on various external factors beyond our control. We are not responsible for any outcomes resulting from the use of our services, including job offers or lack thereof. Users are encouraged to actively pursue job opportunities and utilize our services as one aspect of their job search strategy.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
