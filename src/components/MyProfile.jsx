import React, { useContext, useEffect, useState } from "react";
import "../css/Dashboard.css";
import contextAuth from "../ContextAPI/ContextAuth";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const MyProfile = () => {
  const [editForm, setEditform] = useState(false);

  const { user, setUser, setLoading, token } = useContext(contextAuth);

  async function getUserDetails() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("MYPROFILE RESPONSE......", response);
      if (response.data?.status !== "success") {
        throw new Error(response.data?.message);
      }

      setUser(response.data.user);
    } catch (error) {
      console.log("ERROR IN MYPROFILE......", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  const toggleEditForm = () => {
    setEditform(!editForm);
  };

  // update profile
  const [profileData, setProfileData] = useState({
    name: `${user.name}`,
    email: user.email,
    phoneNumber: user.phoneNumber,
    workStatus: user.workStatus,
    resume: null
  });
  const { name, email, phoneNumber, workStatus, resume } = profileData;

  const handleOnChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const isFormUpdated = () => {
    if (name !== user.name ||
      email !== user.email ||
      phoneNumber !== user.phoneNumber ||
      workStatus !== user.workStatus ||
      resume !== null
    ) {
      return true;
    } else {
      return false;
    }
  }

  // update-profile-handler
  const submitUpdateProfile = async (e) => {
    e.preventDefault();
    if (!isFormUpdated()) {
      toast.error("No changes made to the form");
      return;
    }

    const formData = {
    };
    if (name !== user.name) {
      formData.name = name;
    }
    if (email !== user.email) {
      formData.email = email;
    }
    if (phoneNumber !== user.phoneNumber) {
      formData.phoneNumber = phoneNumber;
    }
    if (workStatus !== user.workStatus) {
      formData.workStatus = workStatus;
    }
    if (resume) {
      formData.resume = resume;
    }
    setLoading(true);
    try {
      const response = await axios.patch(`${process.env.REACT_APP_SERVER_PRO_URL}/api/user/updateCurrent`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      // console.log("UPDATE PROFILE......", response);
      if (response.data?.status !== "success") {
        throw new Error(response.data?.message);
      }
      toast.success('Profile updated successfully');
      setUser(response.data.user);
    } catch (error) {
      console.log("ERROR IN UPDATING PROFILE......", error);
      toast.error('Error in updating profile')
    }
    setEditform(false);
    setLoading(false);
  }

  return (
    <div className="z-0">
      <div className="profiledivmain text-left p-3">
        <h1 className="font-semibold text-lg text-left mb-2 ml-3 mt-2">
          My Profile
        </h1>
        <div className="profilediv mt-4 grid max-xl:gap-2 xl:gap-4 ">
          <div className="flex max-md:flex-col lg:max-xl:flex-col gap-2">
            <div className=" user-details flex  w-60  h-7 ml-3 ">
              <p className="font-semibold mr-2">Full Name :-</p>
              <p>{user.name} </p>
            </div>
            <div className=" user-details flex  h-7 ml-3 ">
              <p className="font-semibold mr-2">Email ID :-</p>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="flex max-md:flex-col lg:max-xl:flex-col gap-2 ">
            <div className=" user-details flex  w-60  h-7 ml-3 ">
              <p className="font-semibold mr-2">Mobile Number :-</p>
              <p>{user.phoneNumber}</p>
            </div>
            <div className=" user-details flex  h-7 ml-3 ">
              <p className="font-semibold mr-2">Work Status :-</p>
              <p>{user?.workStatus?.split(" ").at(-1)}</p>
            </div>
          </div>
          <div>
            <div className="flex  h-7 ml-3 ">
              <p className="font-semibold mr-2">Resume :-</p>
              <p>
                <a
                  href={user.resume}
                  target="_blank"
                  className="underline text-orange-700"
                >
                  My Resume
                </a>
              </p>
            </div>
          </div>
        </div>
        <button
          className="bg-orange-500 w-28 h-9 rounded-md font-semibold mt-3 ml-3 text-white"
          onClick={toggleEditForm}
        >
          Edit
        </button>
      </div>

      {editForm && (
        <div className="edit-profile-container">
          <div className="editprofile absolute top-[50%] translate-y-[-50%] bg-white z-[100] p-4 rounded-md max-sm:w-[80vw]">
            <div className="flex items-center w-full mt-2">
              <h3 className="font-semibold text-xl mx-auto">Edit Your Profile</h3>
              <button className="mr-3 text-xl" onClick={() => setEditform(false)}>
                <RxCross2 />
              </button>
            </div>
            <form className="inputs" onSubmit={e => submitUpdateProfile(e)}>
              <div className="justify-start text-left  mt-4">
                <label htmlFor="name" className="mr-12">
                  Full Name :-
                </label>
                <input
                  type="text"
                  placeholder="Update your name"
                  className="rounded-md bg-[#eeeff2] px-2 py-1 outline-none max-sm:w-full w-[70%] logininput"
                  value={name}
                  name="name"
                  onChange={handleOnChange}
                />
              </div>
              <div className=" justify-start text-left  mt-4">
                <label htmlFor="name" className="mr-3">
                  Phone Number :-
                </label>
                <input
                  type="text"
                  placeholder="Update your Phone Number"
                  className="rounded-md bg-[#eeeff2] px-2 py-1 max-sm:w-full w-[70%] logininput outline-none"
                  value={phoneNumber}
                  name="phoneNumber"
                  onChange={handleOnChange}
                />
              </div>
              <div className="justify-start text-left  mt-4">
                <label htmlFor="workStatus" className="mr-9">
                  Work Status :-
                </label>
                <select name="workStatus" id="workStatus" className="rounded-md bg-[#eeeff2]  px-2 py-1 max-sm:w-full w-[70%] logininput outline-none" value={workStatus} onChange={handleOnChange}>
                  <option value="I'm fresher">I'm fresher</option>
                  <option value="I'm experienced">I'm experienced</option>
                </select>
              </div>
              <div className="flex max-sm:flex-col max-sm:gap-y-5 justify-start text-left mt-4 ">
                <label htmlFor="resume" className="mr-3 w-15">
                  Resume :-
                </label>
                <input type="file" name="resume" className=" sm:ml-14 outline-none rounded-md" onChange={(e) => setProfileData((prevData) => ({
                  ...prevData,
                  [e.target.name]: e.target.files[0],
                }))} />
                <button
                  className="bg-orange-500 w-28 h-9 rounded-md font-semibold  text-white block ml-14"
                  // onClick={submitUpdateProfile}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
