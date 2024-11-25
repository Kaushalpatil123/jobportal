import React, { useContext, useEffect, useState } from "react";
import "../css/Dashboard.css";
import contextAuth from "../ContextAPI/ContextAuth";
import toast from "react-hot-toast";
import axios from "axios";

const MyPlans = () => {

    const { user, setLoading, token } = useContext(contextAuth);
    // console.log(token)
    const [myPlans, setMyPlans] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const userId = user._id;
    // console.log(userId)


    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const fetchPlans = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_PRO_URL}/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response);
            const { orders } = response.data;
            const plansData = [];

            orders.forEach(order => {
                const { modeOfPayment, status, orderDate, cartDetails } = order;

                const { purchaseDate, cartTotalaftergst, Discount, items, appliedCoupon } = cartDetails;

                items.forEach(item => {
                    const { service, serviceType, plans } = item;

                    plans.forEach(plan => {
                        const { price, coverLetterIncluded } = plan;

                        plansData.push({
                            modeOfPayment,
                            status,
                            orderDate,
                            purchaseDate,
                            cartTotalaftergst,
                            service: service.name,
                            serviceType,
                            price,
                            Discount,
                            coverLetterIncluded,
                            OrderId: order._id,
                            appliedCouponName: appliedCoupon ? appliedCoupon.name : "N/A",
                        });
                    });
                });
            });

            setMyPlans(plansData);
        } catch (error) {
            console.log('ERROR IN FETCHING MYPLANS......', error);
            toast.error("No plans found");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, [setLoading, token])


    return (
        <div className="w-full">
            {myPlans.length > 0 ? (
                <div>
                    {myPlans.map((plan, index) => (
                        <div className="flex justify-center items-center" key={index}>
                            <div
                                className="w-[90%] max-md:w-[60%] max-md:h-[90px] rounded-lg shadow-md flex items-center justify-around max-md:flex-col border-2 border-orange-300 p-2 md:gap-x-3 my-3 cursor-pointer"
                                onClick={() => openModal(plan)}
                            >
                                <div className=" ">
                                    <p className="text-black text-sm">{plan.service}</p>
                                </div>
                                <div className="flex items-center text-black">
                                    <p className="mr-1 text-sm">Price:</p>
                                    <p className=" text-sm">{plan.price}/-</p>
                                </div>
                                <div className="flex items-center ">
                                    <p className="mr-1 text-sm text-black">Status:</p>
                                    <p className={`font-medium text-${plan.status === 'pending' ? 'yellow-600' : plan.status === 'success' ? 'green-700' : 'red-700'} text-sm`}>{plan.status}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No plans found</p>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content my-[50%] sm:my-[30%] md:my-[25%] lg:my-[20%] xl:my-[15%] mx-auto">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2 className="bg-orange-400 rounded-lg py-2 text-white md:text-lg">Detailed Plan History</h2>
                        <div className="grid lg:grid-cols-2 lg:gap-4 mt-3 shadow-lg ">
                            {myPlans.map((plan, index) => (
                                <React.Fragment key={index}>
                                    {/* First Column for Plan Details */}
                                    <div className="relative lg:py-3 flex justify-center text-black max-lg:pt-3 ">
                                        <div className="text-left">
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Service Name: </p>
                                                <p className="text-sm max-md:text-xs">{plan.service}</p>
                                            </div>
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Service Type: </p>
                                                <p className="text-sm max-md:text-xs">{plan.serviceType}</p>
                                            </div>
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Plan Price: </p>
                                                <p className="text-sm max-md:text-xs">{plan.price}/-</p>
                                            </div>
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Cover Letter Included:</p>
                                                <p className="text-sm max-md:text-xs">{plan.coverLetterIncluded ? 'Yes' : 'No'}</p>
                                            </div>
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Cart Total:</p>
                                                <p className="text-sm max-md:text-xs">{plan.cartTotalaftergst.toFixed(2)}/-</p>
                                            </div>
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Purchase Date: </p>
                                                <p className="text-sm max-md:text-xs">{plan.purchaseDate}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second Column for Cart Details */}
                                    <div className="relative lg:py-3 flex justify-center text-black max-lg:pb-3 max-md:pr-8 md:max-lg:pr-9 ">
                                        <div className="text-left max-md:text-xs">
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Coupon Name:</p>
                                                <p className="text-sm max-md:text-xs">{plan.appliedCouponName}</p>
                                            </div>
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Discount Obtained: </p>
                                                <p className="text-sm max-md:text-xs">{plan.Discount}/-</p>
                                            </div>
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Mode of Payment:</p>
                                                <p className="text-sm max-md:text-xs">{plan.modeOfPayment}</p>
                                            </div>
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">OrderId: </p>
                                                <p className="text-sm max-md:text-xs">{plan.OrderId}</p>
                                            </div>
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Order Date: </p>
                                                <p className="text-sm max-md:text-xs">{plan.orderDate}</p>
                                            </div>
                                            <div className="flex p-2">
                                                <p className="mr-1 font-semibold max-md:text-xs text-sm">Status:</p>
                                                <p className={`font-semibold text-sm max-md:text-xs text-${plan.status === 'pending' ? 'yellow-600' : plan.status === 'success' ? 'green-700' : 'red-700'}`}>{plan.status}</p>
                                            </div>

                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default MyPlans;
