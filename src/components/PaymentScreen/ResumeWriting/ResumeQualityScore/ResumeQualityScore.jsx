import React from "react";
import leftImage from "../../../../images/scoreLeftImage.png";
import { Link } from "react-router-dom";
import { MyDropzone } from "./Dropzone";
import work1 from "../../../../images/work1.png";
import work2 from "../../../../images/work2.png";
import work3 from "../../../../images/work3.png";
import Blog from "../../../Blog";
import bgImage from "../../../../images/Rectangle119.svg";

const ResumeQualityScore = () => {
  return (
    <div>
      <div>
        {/* blue image div */}
        <div className={`mx-auto`}>
          <div
            className="bg-no-repeat bg-cover bg-center !w-full absolute left-[50%] translate-x-[-50%] h-[300px] max-w-[1900px]"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
          <div className=" mx-auto sm:w-[90%] xl:w-fit relative pt-4">
            {/* header */}
            <h1 className="text-lg lg:text-2xl xl:text-4xl font-medium text-white break-normal">
              Know where your resume quality stands amongst others
            </h1>
            <p className="text-base xl:text-lg mt-3 text-white">
              Analyze your current resume and get a feedback to make it better
            </p>

            {/* box */}
            <div className="w-[80%] sm:w-[70%] max-w-[1500px] mx-auto flex flex-col items-center gap-y-8 xl:flex-row text-center px-4 sm:p-10 py-6 sm:pt-14 mt-4 bg-white drop-shadow-xl">
              {/* left section */}
              <div className="w-[100%] xl:w-[40%] text-xl font-medium flex flex-col gap-5">
                <h2 className="w-full xl:w-[75%] mx-auto">
                  Get resume feedback report and know what to improve
                </h2>
                <img
                  src={leftImage}
                  alt=""
                  width={315}
                  height={216}
                  className="mx-auto"
                />
                <div>
                  <h2 className="text-lg xl:text-[16px]">
                    Don’t you have resume?
                  </h2>
                  <Link className="text-[#4a90e2] text-base xl:text-sm">
                    Get your resume written by expert
                  </Link>
                </div>
              </div>

              {/* right section */}
              <div className="border-dashed border-2 border-gray-400 p-4 xl:p-8 xl:w-[60%]">
                <h2 className="text-lg lg:text-2xl font-medium">
                  Upload your resume to evaluate your score
                </h2>
                <p className="text-[#414c5f]">
                  Choose any of the methods from below
                </p>
                <MyDropzone />
              </div>
            </div>

            {/* how it works */}
            <div className="my-14 text-center lg:w-[70%] max-w-[1500px] mx-auto">
              <h1 className="text-3xl mb-7">How it works</h1>
              <div className="flex flex-col lg:flex-row max-lg:items-center lg:justify-center gap-10 xl:gap-3 w-full mx-auto">
                <div className="flex flex-col gap-2 p-3 py-5 shadow-[rgba(0,_0,_0,_0.14)_0px_0px_10px] w-[85%] sm:w-[70%] md:w-[50%] lg:w-full min-h-[300px]">
                  <img
                    src={work1}
                    alt=""
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                  <p className="md:text-[11px]">
                    1. Upload or fetch resume from doledge
                  </p>
                  <p className="md:text-[14.5px]">
                    Yes, thats all that is needed. Upload your resume no matter
                    what state it is in.
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-3 py-5 shadow-[rgba(0,_0,_0,_0.14)_0px_0px_10px] w-[85%] sm:w-[70%] md:w-[50%] lg:w-full min-h-[300px]">
                  <img
                    src={work2}
                    alt=""
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                  <p className="md:text-[11px]">
                    2. Our algorithm scores your resume
                  </p>
                  <p className="md:text-[14.5px]">
                    Our algorithm scores your resume on the basis of 25+
                    parameters & benchmarks against other job seekers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 p-3 py-5 shadow-[rgba(0,_0,_0,_0.14)_0px_0px_10px] w-[85%] sm:w-[70%] md:w-[50%] lg:w-full min-h-[300px]">
                  <img
                    src={work3}
                    alt=""
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                  <p className="md:text-[11px]">
                    3. Get instant Feedback on resume
                  </p>
                  <p className="md:text-[14.5px]">
                    You will get your resume score. If it’s high, great! If
                    Score is low, You can get detail feedback from our expert to
                    fix the issues.
                  </p>
                </div>
              </div>
            </div>
            {/* <Footer/> */}
          </div>
        </div>
      </div>
      <Blog />
    </div>
  );
};

export default ResumeQualityScore;
