import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
// import { Card, CardHeader, CardContent } from "@mui/material"
import { Input } from "@mui/material";
import { Box } from "@mui/material";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Avatar, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MyProfile from "./MyProfile";
import MyPlans from "./MyPlans";
import ChangePassword from "./ChangePassword";
import PurchaseHistory from "./PurchaseHistory";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import contextAuth from "../ContextAPI/ContextAuth";
import AddressUser from "./AddressUser";

export default function Component() {
  const { user } = useContext(contextAuth);

  const [selectedComponent, setSelectedComponent] = useState("MyProfile");

  const handleLinkClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className="bg-[#f9fcff] relative z-0">
      <div className="w-[90%] sm:w-[70%] mx-auto max-w-[1500px] flex flex-col py-4">
        <div className="bg-white p-6 shadow-md rounded-md">
          <div className="flex items-center space-x-4">
            <div className="relative">

              {user?.picture ? <div className='w-[51px] h-[50px] overflow-hidden m-0'>
                <img src={user.picture} style={{ objectFit: 'contain' }} className='rounded-full' />
              </div>
                : <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16" >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" className='' />
                </svg>
              }
            </div>
            <div className="flex-grow border-r pl-5 pr-4">
              <h1 className="flex items-center space-x-2 text-2xl font-semibold">
                {user.name}
              </h1>
              {/* <p className="flex items-center space-x-2 text-sm text-gray-500">
                Profile last updated - Today
              </p>
              <div className="mt-2 space-y-2">
                
                <div className="flex items-center space-x-2">
                  <WorkIcon fontSize="10" className="text-orange-500" />
                  <span>{user?.workStatus?.split(" ").at(-1)}</span>
                </div>
              </div> */}
            </div>
            <div className="flex-grow pl-4 max-md:hidden">
              <div className="flex items-center space-x-2">
                <CallIcon fontSize="10" className="text-orange-500" />
                <span>{user.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <MailIcon fontSize="10" className="text-orange-500" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid w-full lg:grid-cols-[280px_1fr]">
          {/* <div className="hidden border-r-2 lg:block"> */}

          <Box className="bg-white mt-4 p-6 shadow-md rounded-md max-sm:w-[90vw]">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid gap-3 items-start text-sm font-medium">
                  {/* <h1 className="font-bold size[90px] flex items-center gap-3 rounded-lg px-3 py-2 text-black-500 transition-all hover:text-black-900 dark:text-black-400 dark:hover:text-black-500"> */}
                    {/* <HomeIcon className="h-4 w-4" /> */}
                    {/* Quick Links
                  </h1> */}
                  <button
                    className={`${selectedComponent === "MyProfile" ? "active-link" : ""
                      } font-semibold flex items-center gap-3 h-[2.3rem]  rounded-lg px-3 py-3 text-black-500 transition-all hover:text-black-900 dark:text-black-400 dark:hover:text-gray-500`}
                    onClick={() => handleLinkClick("MyProfile")}
                  >
                    My Profile
                  </button>
                  <button
                    className={`${selectedComponent === "MyPlans" ? "active-link" : ""
                      } font-semibold flex items-center gap-3 h-[2.3rem] rounded-lg px-3 py-3 text-black-500 transition-all hover:text-black-900 dark:text-black-400 dark:hover:text-gray-500`}
                    onClick={() => handleLinkClick("MyPlans")}
                  >
                    My Plans
                  </button>

                  <button
                    className={` ${selectedComponent === "PurchaseHistory"
                      ? "active-link"
                      : ""
                      } font-semibold flex items-center gap-3 h-[2.3rem] rounded-lg px-3 py-3 text-black-500 transition-all hover:text-black-900 dark:text-black-400 dark:hover:text-gray-500`}
                    onClick={() => handleLinkClick("PurchaseHistory")}
                  >
                    Purchase History
                  </button>
                  <button
                    className={` ${selectedComponent === "ChangePassword"
                      ? "active-link"
                      : ""
                      } font-semibold flex items-center gap-3 h-[2.3rem] rounded-lg px-3 py-3 text-black-500 transition-all hover:text-black-900 dark:text-black-400 dark:hover:text-gray-500`}
                    onClick={() => handleLinkClick("ChangePassword")}
                  >
                    Change password
                  </button>
                  <button
                    className={` ${selectedComponent === "UserAddress"
                      ? "active-link"
                      : ""
                      } font-semibold flex items-center gap-3 h-[2.3rem] rounded-lg px-3 py-3 text-black-500 transition-all hover:text-black-900 dark:text-black-400 dark:hover:text-gray-500`}
                    onClick={() => handleLinkClick("UserAddress")}
                  >
                    Address
                  </button>
                </nav>
              </div>
            </div>
          </Box>
          {/* </div> */}

          <div className=" flex flex-col shadow-sm bg-white mt-4 lg:ml-4 max-sm:w-[90vw]">
            {/* <main className="pl-2 flex flex-1 flex-col gap-4 md:gap-8 md:p-6  bg-red-400"> */}
            <div className="sections">
              {selectedComponent === "MyProfile" && <MyProfile />}
              {selectedComponent === "MyPlans" && <MyPlans />}
              {selectedComponent === "PurchaseHistory" && <PurchaseHistory />}
              {selectedComponent === "ChangePassword" && <ChangePassword />}
              {selectedComponent === "UserAddress" && <AddressUser/>}
            </div>

            {/* <header className="flex h-auto items-center border-b">
                {/* <Link className="lg:hidden" href="#">
                {/* <Package2Icon className="h-6 w-6" /> */}
            {/* <span className="sr-only">Home</span>
              </Link>  */}

            {/* <div className="flex">
                  <h1 className="font-semibold text-lg text-left mb-2">
                    My Profile
                  </h1>
                </div>
              </header> */}

            {/* <div className="flex flex-col gap-4">
                <div className="">
                  {/* <div className="pb-0 font-semibold">
                <p>Personal Information</p>
                <Box>Your personal information is never shared with employers</Box>
              </div > */}
            {/* <div className="pt-0 border-[1px] rounded-md">
                    <div className="flex flex-row justify-between p-4">
                      <div className="flex flex-col w-full gap-2 gap-2 sm:text-left xsm:text-left">
                        <p className="text-[#717B9E]">Full Name</p>
                        <p>asdbmdnbamsnbda Olivia Martin</p>
                      </div>
                      <div className="flex flex-col w-full gap-2 sm:text-left xsm:text-left">
                        <p className="text-[#717B9E]">Email</p>
                        <p>olivia.martin@example.com</p>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between p-4">
                      <div className="flex flex-col w-full gap-2 gap-2 sm:text-left xsm:text-left">
                        <p className="text-[#717B9E]">Phone Number</p>
                        <p>9494949494</p>
                      </div>
                      <div className="flex flex-col w-full gap-2 sm:text-left xsm:text-left">
                        <p className="text-[#717B9E]">State</p>
                        <p>Uttar Pradesh</p>
                      </div>
                    </div>
                  </div>
                </div> */}
            {/* <div className="pt-0 border-[1px] rounded-md">
                  <div className="flex flex-row justify-between p-4">
                    <p>Education</p>
                    <Box>Add your educational background</Box>
                  </div>
                  <div className="pt-0">
                    <p>No education added yet</p>
                  </div>
                </div> */}
            {/* </div>  */}

            {/* </main> */}
          </div>
        </div>
      </div>
    </div>
  );
}
