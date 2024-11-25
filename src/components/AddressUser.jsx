import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import countryData from '../countryData.json'
import contextAuth from '../ContextAPI/ContextAuth';
import { useState } from 'react'
import axios from 'axios';
import { MdOutlineEditLocation, MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    maxWidth: '90%',
    borderRadius: '8px'
};

export default function AddressUser() {
    const { setLoading, token } = React.useContext(contextAuth);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        if (edit) {
            setEdit(false);
        }
    };

    const [edit, setEdit] = React.useState(false);

    const [address, setAddress] = useState()

    // for creating new Address
    const [newAddress, setNewAddress] = useState({
        houseNo: "",
        society: "",
        area: "",
        city: "",
        state: "",
        zip: "",
        country: "India"
    })

    // for editing current Address
    const [editAddress, setEditAddress] = useState({
        houseNo: "",
        society: "",
        area: "",
        city: "",
        state: "",
        zip: "",
        country: "India"
    })

    const handleOnChange = (e) => {
        edit ? (
            setEditAddress((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }))
        ) : (
            setNewAddress((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }))
        )
    }

    const submitNewAddress = () => {
        if (newAddress.houseNo == "" || newAddress.society == "" || newAddress.area == "" || newAddress.city == "" || newAddress.state == "" || newAddress.zip == "") {
            toast.error("Please fill all fields");
            return;
        }
        newAddressApiCall();
        // getUserAddress();
        handleClose();
        // resetting values
        setNewAddress({
            houseNo: "",
            society: "",
            area: "",
            city: "",
            state: "",
            zip: "",
            country: "India"
        })
    }

    const newAddressApiCall = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_PRO_URL}/api/address/add-address`, newAddress, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status !== 201) {
                throw new Error("ERROR IN ADDING NEW ADDRESS.......");
            }
            toast.success('Address added successfully');
            setAddress(response.data?.user?.address);
        } catch (error) {
            console.log("ERROR IN ADDING NEW ADDRESS.......", error);
            toast.error("Unable to add address")
        }
        setLoading(false);
    }

    const handleEditAddress = () => {
        if (editAddress == address) {
            toast.error("No changes made");
            return;
        }
        editAddressApiCall();
        handleClose();
    }

    const editAddressApiCall = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_PRO_URL}/api/address/address`, editAddress, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status !== 200) {
                throw new Error("ERROR IN EDITING ADDRESS.......");
            }
            toast.success('Address edited successfully');
            setAddress(response.data?.user?.address);
        } catch (error) {
            console.log("ERROR IN EDITING ADDRESS.......", error);
            toast.error("Unable to edit address");
        }
        setLoading(false);
    }

    const deleteAddress = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_PRO_URL}/api/address/address`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status !== 200) {
                throw new Error("Error occured in address getting.");
            }
            toast.success("Address deleted successfully")
            setAddress(undefined);
        } catch (error) {
            console.log('ERROR IN DELETING ADDRESS.......', error);
            toast.error("Unable to delete");
        }
        setLoading(false);
    }

    async function getUserAddress() {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_PRO_URL}/api/address/address`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status !== 200) {
                throw new Error("Error occured in address getting.");
            }
            setAddress(response.data?.user?.address);
            // let tempaddress = address;
            // for (const key in response.data?.user?.address) {
            //     if (key in address) {
            //         tempaddress[key] = response.data?.user?.address[key];
            //     }
            // }
        } catch (error) {
            setAddress(undefined);
            console.log('ERROR IN FETCHING USER ADDRESS.......', error);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        getUserAddress();
    }, [])

    return (
        <div>
            <div className='flex flex-col gap-3 p-4'>
                <div className='flex justify-between'>
                    <h1 className='font-medium text-gray-600'>
                        Saved Address
                    </h1>
                    {
                        !address && (
                            <Button className='text-sm text-orange-500' style={{ fontFamily: 'poppins' }} onClick={handleOpen}>
                                Add new address
                            </Button>
                        )
                    }
                </div>
                <div className='flex flex-col'>
                    {
                        address ? (
                            <div className='flex justify-between shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] px-2 py-3' style={{ fontFamily: 'cursive' }}>
                                <div className='flex flex-col text-sm text-gray-500/80'>
                                    <p className='text-left'>
                                        {address?.houseNo + ", " + address?.society + ", " + address?.area + ", " + address?.city + ", " + address?.state + ", " + address?.country}
                                        <br />
                                        Pincode - {address?.zip}
                                    </p>
                                </div>
                                <div className='flex flex-col justify-between gap-y-2 items-center'>
                                    <button className='flex justify-center items-center gap-x-1 text-orange-500 text-[13px] font-medium' onClick={() => {
                                        setEditAddress(address);
                                        setEdit(true);
                                    }}>
                                        Edit
                                        <MdOutlineEditLocation />
                                    </button>
                                    <button className='text-red-500' onClick={deleteAddress}>
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className='text-sm text-gray-500'>No saved address found.</p>
                        )
                    }
                </div>
            </div>
            <Modal
                open={open || edit}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex flex-col text-[15px] gap-y-2'>
                        <div className='flex justify-between gap-3'>
                            <label htmlFor="houseNo">House No.</label>
                            <input type="text" name="houseNo" id="houseNo" placeholder='House No.' value={edit ? editAddress.houseNo : newAddress.houseNo} onChange={handleOnChange} className='outline-none border-[1.2px] rounded-md border-orange-400 py-1 pl-2 text-sm text-gray-500 w-[65%] max-w-[250px]' />
                        </div>
                        <div className='flex justify-between gap-3'>
                            <label htmlFor="society">Society</label>
                            <input type="text" name="society" id="society" placeholder='Society/Apartment' value={edit ? editAddress.society : newAddress.society} onChange={handleOnChange} className='outline-none border-[1.2px] rounded-md border-orange-400 py-1 pl-2 text-sm text-gray-500 w-[65%] max-w-[250px]' />
                        </div>
                        <div className='flex justify-between gap-3'>
                            <label htmlFor="area">Area</label>
                            <input type="text" name="area" id="area" placeholder='Area' value={edit ? editAddress.area : newAddress.area} onChange={handleOnChange} className='outline-none border-[1.2px] rounded-md border-orange-400 py-1 pl-2 text-sm text-gray-500 w-[65%] max-w-[250px]' />
                        </div>
                        <div className='flex justify-between gap-3'>
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" id="city" placeholder='City' value={edit ? editAddress.city : newAddress.city} onChange={handleOnChange} className='outline-none border-[1.2px] rounded-md border-orange-400 py-1 pl-2 text-sm text-gray-500 w-[65%] max-w-[250px]' />
                        </div>
                        <div className='flex justify-between gap-3'>
                            <label htmlFor="state">State</label>
                            <input type="text" name="state" id="state" placeholder='State' value={edit ? editAddress.state : newAddress.state} onChange={handleOnChange} className='outline-none border-[1.2px] rounded-md border-orange-400 py-1 pl-2 text-sm text-gray-500 w-[65%] max-w-[250px]' />
                        </div>
                        <div className='flex justify-between gap-3'>
                            <label htmlFor="zip">Pincode</label>
                            <input type="text" name="zip" id="zip" placeholder='Pincode' value={edit ? editAddress.zip : newAddress.zip} onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }} onChange={handleOnChange} maxLength={6} className='outline-none border-[1.2px] rounded-md border-orange-400 py-1 pl-2 text-sm text-gray-500 hide-arrow w-[65%] max-w-[250px]' />
                        </div>
                        <div className='flex justify-between gap-3'>
                            <label htmlFor="country">Country</label>
                            <select name="country" id="country" value={edit ? editAddress.country : newAddress.country} onChange={handleOnChange} className='outline-none border-[1.2px] rounded-md border-orange-400 py-1 pl-2 text-sm cursor-pointer w-[65%] max-w-[250px]'>
                                {
                                    countryData?.map((country) => (
                                        <option value={country?.name} key={country?.code} className=''>
                                            {country?.name} - {country?.code}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-end mt-2'>
                        <Button onClick={edit ? handleClose : () => {
                            handleClose();
                            // resetting values
                            setNewAddress({
                                houseNo: "",
                                society: "",
                                area: "",
                                city: "",
                                state: "",
                                zip: "",
                                country: "India"
                            })
                        }}>Cancel</Button>
                        <Button onClick={edit ? handleEditAddress : submitNewAddress}>Save</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
