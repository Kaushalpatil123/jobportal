import React, { useState } from 'react';
import "../css/Callservice.css";
import axios from 'axios';
import "@fontsource/poppins"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone,faPhoneVolume,faHeadset,faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-hot-toast";
function Callme() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    Query: "",
  });
  // const handleInput = (event) => {
  //   setUser({
  //     ...user,
  //     [event.target.name]: event.target.value,
  //   });
  // };


  const { name, email, phoneNumber ,Query} = user;

  const handleOnChange = (e) => {
    if (
      e.target.type === "number" &&
      e.target.value.length > e.target.maxLength
    ) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
    setUser((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
    const [showCallback, setShowCallback] = useState(false);
    const handleCallbackClick = () => {
        setShowCallback(!showCallback);
      };


      const submitContactFormData = (e) => {
        e.preventDefault();
        console.log(user);
         
        axios.post("http://localhost:8800/api/contact-us/get-a-callback",user)
        .then(response=>{
          console.log(response);
          console.log("you data succcesfully submit")
          setUser({  // Reset the state values to empty strings
            name: "",
            email: "",
            phoneNumber: "",
            Query: ""
          });
          toast.success("Login Successful");
          navigate("/");
        })
        .catch(error=>{
          console.log("your data not submit")
          console.log(error);
          toast.error("Login Failed");
        })
       
        
      };







  return (
    <div className="widgetContnr mt-14" id="rightWidget" >
      <ul className="contactWidget fadeInRight">
        <li className="nopointr">
           {/* <i ></i> */}
          {/* <i className="widgtAr" ></i> */}
          <FontAwesomeIcon className="tollIc" icon={faHeadset} />
          <div className="cal">
            <p className="txtBlue"  > TALK TO US</p>
            <p className="txtRed font_16"  >+91 9311679499</p>
            <p className="font_normal" style= {{"paddingRight":"13px"}}  >Toll Free</p>
          </div>
        </li>
        <li id="calBack">
          <div className="widgtLi_2">
            {/* <em className="callIc"></em> */}
            <a id="callMeBack" onClick={handleCallbackClick}  style={{color:"#004276"}}> <FontAwesomeIcon  style= {{"paddingRight":"6px"}} icon={faPhoneVolume} />  {" "} CALL ME BACK</a>
          </div>
        </li>
      </ul>

      {showCallback &&
         <div className="calBackCont displayB zeroHt" id="calBackForm" >
         <div className="calMeForm" id="temp2">
           <div className="bgGreen p0 oh">
             <a  className="closeForm" id="closeForm" onClick={handleCallbackClick}><em> <FontAwesomeIcon   icon={faXmark} style={{"height": "1.8em",
    "color": "#6f5244"}} /></em></a>
             <p className="formHd">
               Confirm your call request
               <span className="font_small dspB">The information will only be used to reach out to you for Doledge related services.</span>
             </p>
           </div>
           <div className="formInputC" id="temp1">
             <p className="mandtory font_small">All fields are mandatory</p>
             <form name="oldContactUs" id="contactWidget"  onSubmit={submitContactFormData}>
               <div className="row">
                 <div className="txtWrap">
                   <input
                     type="text"
                     className="valid"
                     id="name"
                     name="name"
                     placeholder="Name"
                     required
                     rel="required:1000,alphaDS:1001,name:1000|blur"
                     maxLength="100"
                    //  value={user.name}
                    //  onChange={handleInput}
                    value={name}
                    onChange={handleOnChange}


                   /><em></em>
                 </div>
                 <small className="erLbl" id="name_err"></small>
               </div>
               <div className="row">
                 <div className="txtWrap">
                   <input
                     type="text"
                     className="valid"
                     id="email"
                     name="email"
                     required
                     placeholder="Email"
                     rel="required:1002,custom:emailWithHyphen|blur"
                     maxLength="100"
                    //  value={user.email}
                      // onChange={handleInput}
                      value={email}
                onChange={handleOnChange}
                   /><em></em>
                 </div>
                 <small className="erLbl" id="email_err"></small>
               </div>
               <div className="row">
                 <div className="txtWrap">
                   <input
                     type="text"
                     className="valid"
                     id="mobile"
                     name="phoneNumber"
                     placeholder="Mobile"
                     minLength="10"
                     maxLength="15"
                     rel="required:2000,charRange:2001,num:2001|blur"
                     value={phoneNumber}
                     required
                     onChange={handleOnChange}
                   /><em></em>
                 </div>
                 <small className="erLbl" id="mobile_err"></small>
               </div>
               <div className="row pb15">
                 <div className="txtWrap txtarea">
                   <textarea
                     placeholder="Type your query here.."
                     className="valid"
                     id="message"
                     name="Query"
                     rel="required:3000,custom:3001"
                     maxLength="600"
                     rows="3"
                     value={Query}
                     onChange={handleOnChange}
                     required
                   ></textarea><em></em>
                 </div>
                 <small className="erLbl" id="message_err"></small>
               </div>
               <div>
                 <input type="hidden" name="SOURCE_ID" value="2" />
                 <input
                   type="submit"
                   className="blue_btnBig"
                   id="submitQuery"
                   value="Call Me Back"
                   
                 />
               </div>
             </form>
           </div>
         </div>
         {/* <em className="formArr"><FontAwesomeIcon className="formArr" icon={faArrowRight} style={{color: "#ffffff",}} /></em> */}
       </div>
      }
          </div>



  );
}

export default Callme;
