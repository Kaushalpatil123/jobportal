import React, { useContext, useEffect, useState } from "react";
import contextAuth from "../ContextAPI/ContextAuth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../css/Dashboard.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { token, setLoading } = useContext(contextAuth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChangePassword = async () => {

    if(newPassword.length<8){
      toast.error("New password must be atleast 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/user/changePassword`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.status === "success") {
        toast.success("Password Change");
        navigate("/");
      } else {
        setError("Failed to change password");
      }
    } catch (err) {
      setError("fail to change password");
    }
    setLoading(false);
  };

  return (
    <div className="">
      <h1 className="font-semibold text-lg text-left mb-2 ml-3 mt-2">
        ChangePassword
      </h1>
      <div className="changepass w-96 h-60  xl:ml-20 mb-4 grid  gap-0 justify-center   ">
        <div className="logininputs  grid  gap-2 justify-center pt-5 xs:ml-4 ">
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              className="logininput w-64 h-10 outline-none pl-2"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={20} fill="#AFB2BF" />
              )}
            </span>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="logininput w-64 h-10 outline-none pl-2"
              placeholder="New Password (above 8 char)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={20} fill="#AFB2BF" />
              )}
            </span>
          </div>
          <button
            className="loginbtn  mt-3 w-64 h-10 bg-orange-400 text-white "
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
