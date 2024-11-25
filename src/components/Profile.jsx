import React, { useContext, useEffect, useState } from "react";
import contextAuth from "../ContextAPI/ContextAuth";
import { useNavigate } from "react-router-dom";
import InputElement from "../UI/InputElement/InputElement";
import SelectionCard from "../UI/Card/SelectionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faLock,faPaperclip, faTrash, faUnlock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Profile = (props) => {
    const Auth = useContext(contextAuth);
    const navigate = useNavigate();
    let [editMode, setEditMode] = useState(false);
    let [overAllValid, setOverAllValid] = useState(false)
    let [workStatus, setWorkStatus] = useState('');
    let [file, setFile] = useState(null);
    let [whatsApp, setWhatsApp] = useState(false);
    let [inputs, setInputs] = useState({
        text: {
        value: '',
        isValid: true,
        },
        email: {
        value: '',
        isValid: true,
        },
        tel: {
        value: '',
        isValid: true,
        },
    })
    
    // set profile data
    useEffect(() => {
        let updatedInputs = {...inputs};
        const user = props.user;
        updatedInputs.text.value = user.name;
        updatedInputs.email.value = user.email;
        updatedInputs.tel.value = user.phoneNumber;
        setWorkStatus(user.workStatus)
        setInputs(updatedInputs);
    }, []);

    // validate overall data on change
    useEffect(() => {
        overAllValidity()
        console.log(workStatus)
    }, [file, workStatus, inputs])

    const editModeHandler = () => {
        setEditMode(!editMode)
    }

    const selectHandler = (e) => {
        const value = e.target.value;  
        setWorkStatus(value);  

    }

    const fileHandler = async (event, action) => {
        const filePDF = await event?.target.files[0];

        if (action == 'add')
        setFile(filePDF)
        else
        setFile(false)
    }

    const checkBoxHandler = () => {
        setWhatsApp(!whatsApp);
    }

    const changeHandler = (event, type) => {
        let value = event.target.value;
        let updatedInputs = { ...inputs };

        if (!value || value.length == 0)
        updatedInputs[type].isValid = false;
        else
        updatedInputs[type].isValid = true;

        if (type == 'tel' && isNaN(value))
        return

        updatedInputs[type].value = value;
        setInputs(updatedInputs);
    }

    const overAllValidity = () => {
        let { text, email, tel, whatsApp } = inputs;
        if (text.value && email.value && tel.value && workStatus)
        setOverAllValid(true)
        else
        setOverAllValid(false)
    }

    const submitFormHanadler = (event) => {
        event.preventDefault();
        const {text, email, tel} = inputs;
        const work = workStatus;
        const whatsAppUpdates = whatsApp;
        const resume = file;

        // let data = new FormData();
        // data.append('name', text.value)
        // data.append('email', email.value)
        // data.append('tel', tel.value)
        // data.append('workStatus', work)
        // data.append('whatsApp', whatsAppUpdates)
        // data.append('resume', resume)

        let data = {}
        data._id = Auth.user._id;
        data.name = text.value;
        data.email = email.value;
        data.tel = tel.value;
        data.workStatus = work;
        data.whatsApp = whatsAppUpdates;

        axios.post(`${process.env.REACT_APP_SERVER_PRO_URL}/api/dashboard/update`, data, {withCredentials: true})
        .then(response => {
        const data = response.data;
        if(data.status == 'success')
            props.updateState()
        else
            Auth.errorHandler({message: data.error})
        })
        .catch(err => {
        Auth.errorHandler({message: data.error, type: ''});
        console.log(err)
        })
    }

    return (
        <div className="Dashboard h-full w-full flex flex-col">
            <div className="flex flex-row justify-between items-baseline">
                <h1 className="text-[25px] font-bold mb-4 text-[#333]">Profile Information</h1>
                <div className="editButton text-[22px] px-3 py-1 rounded-[10px]" onClick={editModeHandler}>
                    <FontAwesomeIcon icon={editMode ? faEdit : faLock} style={{color: '#333'}}/>
                </div>
            </div>
             {/* Form Inputs */}
            <form onSubmit={submitFormHanadler} className="reg-form w-full flex flex-col" style={{boxShadow: 'none'}}>
                <InputElement
                disabled={!editMode}
                field={'text'}
                type={'text'}
                label={'Full Name'}
                placeholder={'Whats your name?'}
                error={'Full name is required'}
                value={inputs.text.value}
                valid={inputs.text.isValid}
                onChange={changeHandler} 
                />

                <InputElement
                disabled={!editMode}
                field={'email'}
                type={'email'}
                label={'Email ID'}
                placeholder={'Tell us your Email ID'}
                error={'Email ID is required'}
                value={inputs.email.value}
                valid={inputs.email.isValid}
                onChange={changeHandler} 
                />

                <InputElement
                disabled={!editMode}
                field={'tel'}
                type={'tel'}
                label={'Mobile Number'}
                placeholder={'Mobile Number'}
                error={'Please enter your mobile number'}
                value={inputs.tel.value}
                valid={inputs.tel.isValid}
                onChange={changeHandler} 
                />

                {/* Work Status */}
                <div className="text-left m-1">
                    <p className="font-bold mb-1">Work Status</p>
                    <select 
                    disabled={!editMode} 
                    className="w-full py-2 px-2 m-0 rounded-[15px]" 
                    value={workStatus} onChange={selectHandler} 
                    style={{border: '1px solid #ccc'}}>
                        <option 
                        defaultValue={workStatus == 'experienced'} 
                        value='experienced'>
                            I'm Experienced
                        </option>
                        <option 
                        defaultValue={workStatus == 'fresher'} 
                        value='fresher'>
                            I'm Fresher
                        </option>
                    </select>
                </div>

                {/* File Upload */}
                {/* <div className="text-left mt-3">
                <p className="font-bold mb-1">Resume</p>
                {!file ? <div className="fileCard">
                    <div>
                    <button className="fileBtn">Upload Resume</button>
                    <input
                        className="fileInput"
                        type='file'
                        accept="image/*, .doc, .docx, .pdf, .rtf"
                        onChange={(e) => fileHandler(e, 'add')} 
                        />
                    </div>
                    <div>DOC, DOCx, PDF, RTF | Max: 2 MB</div>
                </div>
                    : <div className="selectedFile w-fit py-1 px-3 flex flex-row justify-between items-center text-[12px]
                            sm:text-[15px]">
                    <FontAwesomeIcon icon={faPaperclip} />
                    <div className="mr-5 ml-2">{file.name}</div>
                    <div className="cursor-pointer" onClick={() => fileHandler(null, 'remove')}>
                        <FontAwesomeIcon icon={faTrash} style={{ color: '#F58634' }} />
                    </div>
                    </div>}
                <p className="error">Recruiters give first preference to candidates who have a resume</p>
                </div> */}

                {/* WhatsApp Checkbox */}
                <div className="whatsappCheckbox flex flex-row items-center text-center ml-2 my-3">
                    <input type="checkbox" onClick={checkBoxHandler}/>
                    <p className="flex flex-row mt-0 ml-2">
                        Send me important updates on<img className="mx-1 w-[20px] h-[20px]" src={require('../images/whatsapp.png')} />WhatsApp
                    </p>
                </div>

                {/* Submit Button */}
                <div className="submitWrapper flex flex-col text-left mt-2">
                <button
                    type="submit"
                    className="submit text-left mt-2"
                    disabled={overAllValid && editMode ? false : true}
                    style={{ backgroundColor: !overAllValid || !editMode ? '#ccc': '#F58634'}}>Update Info</button>
                </div>
            </form>
        </div>
    )
}

export default Profile;