import React from "react";
import "../css/Banner.css";
import "@fontsource/sintony";

const Banner = () => {
  return (
    <>
      <br />

      <div
        className="Banner w-full flex flex-col 
      md:flex md:flex-row max-w-[1700px] mx-auto"
      >
        <div
          className="banner-title bg-[#fbad78] w-[100%] flex justify-center flex-col gap-y-10 pt-4
        sm:pt-0
        md:w-[50%]"
        >
          <div className="text-left  px-12 m-0">
            {/* <div className="first-header"></div> */}
            <div className="second-header !text-5xl !leading-[70px]">
              Enhance Your Resume to
              <span className="text-[#0f774c]"> Impress Recruiters</span>
            </div>
          </div>

          <p
            className=" text-base lg:text-lg text-left px-12 pb-2 sm:pb-0"
            style={{ fontFamily: "Sintony" }}
          >
            Showcase your skills & achievements with a Professionally written
            resume
          </p>
        </div>

        <div
          className="hidden md:block banner-image w-full  justify-center
        md:w-[50%]"
        >
          <img
            src={require("../images/banner.png")}
            alt="Banner"
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
