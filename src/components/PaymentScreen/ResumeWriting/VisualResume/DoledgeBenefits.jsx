import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import BuyNowServiceCard from "../BuyNowServiceCard";
import { SiSpeedtest } from "react-icons/si";
import icon1 from "../../../../images/Icons/1.jpg";
import icon2 from "../../../../images/Icons/2.jpg";

// import Slide from 'react-reveal/Slide';
export default function DoledgeBenefits({ plans }) {
  return (
    <div className="flex flex-col w-[93%] lg:w-[80%] xl:w-[70%] max-w-[1500px] mx-auto">
      <div className="div w-[100%] flex justify-center align-center mt-5">
        {/* <div className="flex justify-center align-center bg-green-500">
      Click me
    </div> */}
        <div className="bg-[#9DD49B] w-[250px] h-[60px] md:w-[400px] md:h-[100px] rounded-xl text-2xl md:text-4xl leading-10 flex justify-center items-center">
          Doledge Benefits
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-center items-center xl:justify-between xl:items-stretch gap-x-2 mt-5 w-full mx-auto">
        <div className="flex flex-col justify-center items-start  xl:w-[60%]">
          <div
            className="text-black text-base md:text-xl max-w-screen-sm md:max-w-full lg:max-w-2xl py-2 rounded-lg self-start text-center font-semibold mb-2 mx-auto"
            style={{
              fontFamily: "Poppins",
              fontWeight: 300,
              textAlign: "center",
            }}
          >
            Benefits of buying Visual Resume service from Doledge
          </div>

          <table className="table table-striped table-bordered table-auto">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-center !bg-[#4472c4] !text-white"
                >
                  Doledge Benefits
                </th>
                <th
                  scope="col"
                  className="text-center !bg-[#4472c4] !text-white"
                >
                  Free Resume
                </th>
                <th
                  scope="col"
                  className="text-center !bg-[#4472c4] !text-white"
                >
                  Doledge Text Resume
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="benefit text-left sm:px-5">
                  Instant Accessibility
                </td>
                <td className="text-center sm:px-5 benefitGiven">
                  {" "}
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green" }}
                    size="xl"
                  />
                </td>
                <td className="text-center sm:px-5 benefitGiven">
                  {" "}
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green" }}
                    size="xl"
                  />
                </td>
              </tr>
              <tr className="">
                <td className="text-left sm:px-5">Maximized Exposure</td>
                <td className="text-center sm:px-5">
                  {" "}
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "red" }}
                    size="xl"
                  />
                </td>
                <td className="text-center sm:px-5">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green" }}
                    size="xl"
                  />
                </td>
              </tr>
              <tr className="">
                <td className="text-left sm:px-5">Simplified Job Hunting</td>
                <td className="text-center sm:px-5 benefitGiven">
                  {" "}
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "red" }}
                    size="xl"
                  />
                </td>
                <td className="text-center sm:px-5">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green" }}
                    size="xl"
                  />
                </td>
              </tr>

              <tr className="">
                <td className="text-left sm:px-5">Swift Responses</td>
                <td className="text-center sm:px-5">
                  {" "}
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "red" }}
                    size="xl"
                  />
                </td>
                <td className="text-center sm:px-5 benefitGiven">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green" }}
                    size="xl"
                  />
                </td>
              </tr>

              <tr className="">
                <td className="text-left sm:px-5">Privacy and Security</td>
                <td className="text-center sm:px-5">
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "red" }}
                    size="xl"
                  />
                </td>
                <td className="text-center sm:px-5">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green" }}
                    size="xl"
                  />
                </td>
              </tr>

              <tr className="">
                <td className="text-left sm:px-5">Professional Guidance</td>
                <td className="text-center sm:px-5">
                  {" "}
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "red" }}
                    size="xl"
                  />
                </td>
                <td className="text-center sm:px-5 benefitGiven">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green" }}
                    size="xl"
                  />
                </td>
              </tr>

              <tr className="">
                <td className="text-left sm:px-5">Enhanced Efficiency</td>
                <td className="text-center sm:px-5">
                  {" "}
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "red" }}
                    size="xl"
                  />
                </td>
                <td className="text-center sm:px-5 benefitGiven">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green" }}
                    size="xl"
                  />
                </td>
              </tr>

              <tr className="">
                <td className="text-left sm:px-5">Results - Driven</td>
                <td className="text-center sm:px-5">
                  {" "}
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "red" }}
                    size="xl"
                  />
                </td>
                <td className="text-center sm:px-5 benefitGiven">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green" }}
                    size="xl"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <BuyNowServiceCard plans={plans} name={"Visual Resume"} />
      </div>

      {/* Experiencing benefit section */}

      <div className="flex md:flex-col w-full align-center justify-center">
        {/* red main */}
        <div className="stats-section w-full" style={{ margin: "25px auto" }}>
          <div
            className="text-opacity-60 text-center font-medium leading-[35px] sm:leading-[48.1px] mt-8 self-center w-[90%] sm:w-full mx-auto max-md:max-w-full text-lg sm:text-2xl"
            style={{
              color: "rgba(0, 0, 0, 0.56)",
              fontSize: 26,
              fontFamily: "Poppins",
              fontWeight: 500,
              wordWrap: "break-word",
            }}
          >
            Our customers are experiencing a host of benefits <br /> from our
            Visual Resume Services
          </div>
          <div className="flex flex-col md:flex-row justify-around items-center mt-12">
            <div className="w-48 h-48 border-1 border-[#62B01E] rounded-full flex flex-col place-items-center justify-center mb-4 md:mb-0">
              <div
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  marginTop: "-15px",
                }}
              >
                <SiSpeedtest className="mx-auto w-[33px] h-[28px]" />
                {/* <FontAwesomeIcon icon={faGaugeSimpleHigh} style={{ color: "royalblue", fontSize: 24 }} /> <br /> */}
                Speed & <br />
                efficiency
              </div>
              <p style={{ fontSize: 12, fontWeight: 400 }}>
                helping clients respond to opportunities in real-time
              </p>
            </div>
            <div className="w-48 h-48 border-1 border-[#F69A56] rounded-full flex flex-col justify-center items-center mb-4 md:mb-0">
              <div
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  marginTop: "-15px",
                }}
              >
                <img
                  src={icon1}
                  alt=""
                  width={30}
                  height={30}
                  className="mx-auto "
                />
                Affordability
              </div>
              <p style={{ fontSize: 12, fontWeight: 400 }}>
                cost-effective solutions for modernizing job applications
              </p>
            </div>
            <div className="w-48 h-48 border-1 border-[#62B01E] rounded-full flex flex-col justify-center items-center mb-4 md:mb-0">
              <div
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
              >
                {/* <FontAwesomeIcon icon={faGaugeSimpleHigh} style={{ color: "royalblue", fontSize: 24 }} /> <br /> */}
                <img
                  src={icon2}
                  width={30}
                  height={30}
                  alt=""
                  className="mx-auto"
                />
                Expert <br />
                Guidance
              </div>
              <p style={{ fontSize: 12, fontWeight: 400 }}>
                Helping clients make a lasting impression
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
