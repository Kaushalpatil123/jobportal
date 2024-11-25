import axios from "axios";
import React, { useContext, useEffect } from "react";
import { BarLoader, HashLoader } from "react-spinners";
import contextAuth from "../../ContextAPI/ContextAuth";
import { useNavigate } from "react-router-dom";

const DataLoading = () => {
    const Auth = useContext(contextAuth);
    const navigate = useNavigate();

    useEffect(() => {
        // get login user data on redirect to app from google
        getGoogleAuthUser(data => {
            if(!data.error){
                Auth.login(data.user, data.token);
                navigate('/');
            } else {
                Auth.errorHandler({message: data.error, type: data.type});
                navigate('/register');
            }
        })
    }, [])

    const getGoogleAuthUser = async (cb) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_PRO_URL}/signin/success`, {withCredentials: true});
            let newData = {};
            if(data.status == 'success'){
                newData = {
                    user: {
                        _id: data.user._id,
                        name: data.user.name,
                        email: data.user.email,
                        picture: data.user.picture,
                    },
                    token: data.token,
                };
                cb(newData);
            } else {
                newData.error = data.error;
                cb(newData)
            }

        } catch (err) {
            navigate('/register')
        }
    }


    return (
        <div className="w-full h-full flex justify-center items-center" style={{
            position: 'fixed',
            top: '0px',
            backgroundColor: 'white',
            zIndex: '100',
        }}>
            <HashLoader color="#F58634" />
        </div>
    )
}

export default DataLoading;