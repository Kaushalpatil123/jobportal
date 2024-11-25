import React from "react";
import image1 from "../images/Rectangle 20.png";
import image2 from "../images/Rectangle 21.png";
import image3 from "../images/Rectangle 22.png";
import { Link } from "react-router-dom";

const Mheader = () => {
  const items = [
    {
      id: 1,
      src: image1,
      link: "Highlight-Your-Resume",
      title: "Highlight Your Resume",
    },
    {
      id: 2,
      src: image2,
      link: "Zap-Your-Resume",
      title: "Zap Your Resume",
    },
    {
      id: 3,
      src: image3,
      link: "Cover-Letter",
      title: "Cover Letter",
    },
  ];
  return (
    <div className="w-[70%] mx-auto max-w-[1500px] flex flex-col py-4">
      <div className=" items-center ">
        <h1 className=" text-center text-2xl font-sans">
          <br></br>
          Benefits of Buying Text <br></br> Resume Services with <br></br>{" "}
          Doledge India
        </h1>

        <br></br>

        <div className="px-5 w-full">
          <h2 className="text-center text-lg text-gray-500">
            Rank higher in recruiter searches, Get instant relevant Jobs and{" "}
            <br /> reach out to recruiters to increase your chances of getting a
            call
          </h2>
          <div className="font-bold font-sans pt-4 pb-4 sm:flex flex-row items-center justify-center gap-[2.1vw] md:flex md:flex-wrap md:justify-center">
            <button className="bg-gray-100 hover:bg-gray-200 text-black hover:text-white m-2 py-1 px-2 rounded-full mb-4 md:mr-4">
              Visibility
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-black hover:text-white m-2 py-1 px-2 rounded-full mb-4 md:mr-4">
              Professional
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-black hover:text-white m-2 py-1 px-2 rounded-full mb-4 md:mr-4">
              StandOut
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-black hover:text-white m-2 py-1 px-2 rounded-full mb-4 md:mr-4">
              Recruiter Friendly
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-black hover:text-white m-2 py-1 px-2 rounded-full mb-4 md:mr-4">
              Error Free
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-black hover:text-white py-1 px-2 rounded-full mb-3 md:mr-4">
              Assurity
            </button>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto py-4">
        <div className="md:flex items-center justify-between border-[3px] lg:rounded border-gray-200 md:h-411 md:flex-row flex-col">
          <div className=" w-full py-6 px-6  text-gray-900 text-center md:text-left">
            <h1 className="text-2xl md:text-2xl font-sans mb-4 text-left">
              {" "}
              Unlocking Career Opportunities: The Benefits of Text Resume
              Services
            </h1>
            <h1 className=" text-left text-xl md:text-base font-light mb-8 font-sans">
              Investing in text resume services offers a streamlined approach to
              enhancing your job search. Your qualifications are presented
              clearly, making it easier for employers to quickly assess your
              suitability for the role.
            </h1>
          </div>
          <div className="md:w-1/2 w-full flex-shrink-0 py-6 px-6 text-center md:text-right">
            <img
              src="https://img.freepik.com/premium-vector/recruitment-resume-head-hunting-concept_385073-350.jpg"
              className="mx-auto md:mx-0"
              width="350px"
              height="350px"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="mx-auto py-1 w-full">
        <div className="border-[3px] lg:rounded border-gray-200 h-411 w-1176 items-center justify-center text-center py-4">
          <h1 className="font-bold text-xl py-1 px-2 font-sans">
            Move ahead in Career, Faster
          </h1>

          <h2 className=" text-lg py-2 px-2 font-sans mb-2">
            Interactively transform magnetic growth strategies with our{" "}
            <br className="hidden lg:block" /> Outside the Box Thinking
          </h2>

          <div className="max-w-screen-md p-3 mx-auto flex flex-col justify-center w-full h-full">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:px-5">
              {items.map(({ id, src, link, title }) => (
                <Link to={link} key={id}>
                  <div className="rounded-lg">
                    <img
                      src={src}
                      alt=""
                      className="rounded-md duration-200 hover:scale-105"
                    />
                    <div className="flex items-center justify-center">
                      <h2 className="text-base p-2 font-serif">{title}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto py-4 border-[3px] border-gray-200 rounded-lg mt-4">
        <div className="h-411 md:w-[70%] mx-auto items-center justify-center text-center p-4">
          <h2 className="text-xl py-2 px-2 font-sans font-ligh max-md:text-center">
            View ready-made samples for Text Resume, Visual Resume, Cover
            Letters
          </h2>

          <br />
          <br></br>

          <div className="flex flex-row justify-evenly flex-wrap gap-y-4">
            <button className="w-30 bg-blue-700 text-white ml-2 py-2 px-4 sm:text-[15px] text-[12px] rounded-full">
              Text Resume
            </button>
            <button className="w-30 bg-blue-700 text-white ml-2 py-2 px-4 sm:text-[15px] text-[12px] rounded-full">
              Visual Resume
            </button>
            <button className="w-30 bg-blue-700 text-white ml-3 mr-2 py-2 px-4 sm:text-[15px] text-[12px] rounded-full">
              Cover Letter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mheader;
