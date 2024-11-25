import React, { useContext, useEffect, useState } from "react";
import '../css/Register.css';

import InputElement from "../UI/InputElement/InputElement";
import axios from "axios";
import contextAuth from "../ContextAPI/ContextAuth";
import { useNavigate } from "react-router-dom";

const GoogleNewPassword = () => {
    const navigate = useNavigate();
    const Auth = useContext(contextAuth);
    
    let [overAllValid, setOverAllValid] = useState(false)
    let [user, setUser] = useState({});
    let [inputs, setInputs] = useState({
        password: {
            value: '',
            isValid: true,
        },
        confirmPassword: {
            value: '',
            isValid: true,
        },
    })

    useEffect(() => {
        // get user google data on redirect to app from google
        getGoogleAuthUser()
    }, [])

    const getGoogleAuthUser = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_SERVER_PRO_URL}/signup/success`, {withCredentials: true});
          if(data.status == 'success'){
              let userData = {
                  name: data.user._json.name,
                  email: data.user._json.email,
                  picture: data.user._json.picture,
                };
                setUser(userData)
                console.log(user)
          }
        } catch (err) {
          console.log(err)
        }
      }

    const changeHandler = (event, type) => {
        let value = event.target.value;
        let updatedInputs = {...inputs};
        
        if(!value || value.length == 0)
        updatedInputs[type].isValid = false;
        else
        updatedInputs[type].isValid = true;

        updatedInputs[type].value = value;
        setInputs(updatedInputs);
        overAllValidity()
    }

    const overAllValidity = () => {
        let {confirmPassword, password} = inputs;
        if(confirmPassword.value && password.value)
        setOverAllValid(true)
        else 
        setOverAllValid(false)
    }

    const submitFormHanadler = (event) => {
        event.preventDefault();
        const {confirmPassword, password} = inputs;
        
        if(password.value == confirmPassword.value){
            let data = {...user}
            data.password = password.value;
            
            axios.post(`${process.env.REACT_APP_SERVER_PRO_URL}/api/auth/signup`, data)
            .then(response => {
                console.log(response)
                let data = response.data;
                if(data.status == 'failed'){
                    console.log(data)
                    Auth.errorHandler({message: data.error, type: data.type})
                    navigate('/login');
                } else {
                    console.log(data)
                    Auth.login(data.user, data.token);
                    navigate('/');
                }
            })
            .catch(err => console.log(err))
            }
      }

    return (
        <div className='Register w-full h-full flex flex-col justify-center items-center' style={{
            position: 'fixed',
            top: '0px',
            backgroundColor: 'white',
            zIndex: '100',
        }}>
            {/* Form Inputs */}
            <form onSubmit={submitFormHanadler} className="reg-form w-[85%] flex flex-col py-4 px-4 m-5 
            sm:w-[65%]
            md:w-[55%]
            lg:w-[35%]">
                {/* User Data */}
                <div className="flex flex-col justify-center items-center mb-2">
                    <div className="bg-[#ccc] w-[80px] h-[80px] rounded-[50%] overflow-hidden">
                        <img src={user.picture}/>
                    </div>
                    <div className="my-1 text-[18px]">{user.name}</div>
                    <div className="py-1 px-2 border-[1px] rounded-[20px]">{user.email}</div>
                </div>
                {/* Inputs */}
                <div className="w-[80%]
                sm:w-[70%]">
                    <InputElement
                    field={'password'}
                    type={'password'}
                    label={'Password'}
                    placeholder={'Create a password for your account'}
                    error={'Password is required'}
                    value={inputs.password.value}
                    valid={inputs.password.isValid}
                    onChange={changeHandler}/>

                    <InputElement
                    field={'confirmPassword'}
                    type={'password'}
                    label={'Confirm Password'}
                    placeholder={'Confirm Password'}
                    error={'Must match you passwords'}
                    value={inputs.confirmPassword.value}
                    valid={inputs.confirmPassword.isValid}
                    onChange={changeHandler}/>

                </div>

                {/* Submit Button */}
                <div className="submitWrapper flex flex-col text-left mt-2">
                    <p className="gray13px">By clicking Sign in, you agree to the Terms and Conditions & Privacy Policy of Doledge.com</p>
                    <button
                    type="submit" 
                    className="submit text-left mt-2"
                    disabled={overAllValid ? false : true}
                    style={{backgroundColor: !overAllValid && '#ccc'}}>Continue</button>
                </div>
            </form>
        </div>
    )
}

export default GoogleNewPassword;