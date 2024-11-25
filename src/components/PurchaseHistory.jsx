import React, { useContext, useEffect, useState } from "react";
import contextAuth from "../ContextAPI/ContextAuth";
import axios from "axios";
import toast from "react-hot-toast";

const PurchaseHistory = () => {
  const { token, setLoading } = useContext(contextAuth);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPurchaseHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_PRO_URL}/api/my-purchase-history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response.data)
      const { purchaseHistory } = response.data;
      // console.log(purchaseHistory);
      const purchaseHistoryData = [];

      purchaseHistory.forEach(history => {
        const { modeOfPayment, status, orderDate, cartDetails, vendorId } = history;

        const { purchaseDate, cartTotalaftergst, Discount, items, appliedCoupon } = cartDetails;

        items.forEach(item => {
          const { service, serviceType, plans } = item;

          plans.forEach(plan => {
            const { price, coverLetterIncluded } = plan;

            purchaseHistoryData.push({
              vendorId,
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
              PurchaseHistoryId: history._id,
              appliedCouponName: appliedCoupon ? appliedCoupon.name : "N/A",
            });
          });
        });
      });

      setPurchaseHistory(purchaseHistoryData);
    } catch (error) {
      console.log('ERROR IN FETCHING PURCHASE HISTORY......', error);
      toast.error("Failed to fetch Purchase History Data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, [token]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full">
      {purchaseHistory.length > 0 ? (
        <div>
          {purchaseHistory.map((purchaseData, index) => (
            <div className="flex justify-center items-center" key={index}>
              <div
                className="w-[90%] max-md:w-[60%] max-md:h-[90px] rounded-lg shadow-md flex items-center justify-around max-md:flex-col border-2 border-orange-300 p-2 md:gap-x-3 my-3 cursor-pointer"
                onClick={() => openModal(purchaseData)}
              >
                <div className="">
                  <p className="text-black text-sm">{purchaseData.service}</p>
                </div>
                <div className="flex items-center text-black">
                <p className="mr-1 text-sm">Price:</p>
                  <p className="text-sm">{purchaseData.price}/-</p>
                </div>
                <div className="flex items-center">
                <p className="mr-1 text-sm text-black">Status:</p>
                  <p className={`font-medium text-${purchaseData.status === 'pending' ? 'yellow-600' : purchaseData.status === 'success' ? 'green-700' : 'red-700'} text-sm`}>{purchaseData.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No purchaseDatas found</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content my-[50%] sm:my-[30%] md:my-[25%] lg:my-[20%] xl:my-[15%] mx-auto">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2 className="bg-orange-400 rounded-lg py-2 text-white md:text-lg">Detailed Purchase History</h2>
            <div className="grid lg:grid-cols-2 lg:gap-4 mt-3 shadow-lg ">
              {purchaseHistory.map((purchaseData, index) => (
                <React.Fragment key={index}>
                  {/* First Column for purchaseData Details */}
                  <div className="relative lg:py-3 flex justify-center text-black max-lg:pt-3 ">
                    <div className="text-left">
                      <div className="flex p-2">
                        <p className="mr-1  max-md:text-xs text-sm font-semibold">PurchaseId: </p>
                        <p className="text-sm max-md:text-xs">{purchaseData.PurchaseHistoryId}</p>
                      </div>
                      <div className="flex p-2">
                        <p className="mr-1  max-md:text-xs text-sm font-semibold">VendorId: </p>
                        <p className="text-sm max-md:text-xs">{purchaseData.vendorId}</p>
                      </div>
                      <div className="flex p-2">
                        <p className="mr-1 max-md:text-xs text-sm  font-semibold">Mode of Payment:</p>
                        <p className="text-sm max-md:text-xs">{purchaseData.modeOfPayment}</p>
                      </div>
                      <div className="flex p-2">
                        <p className="mr-1  max-md:text-xs text-sm font-semibold">Purchase Date: </p>
                        <p className="text-sm max-md:text-xs">{purchaseData.purchaseDate}</p>
                      </div>
                      <div className="flex p-2">
                        <p className="mr-1  max-md:text-xs text-sm font-semibold">Service Name: </p>
                        <p className="text-sm max-md:text-xs">{purchaseData.service}</p>
                      </div>
                      <div className="flex p-2">
                        <p className="mr-1 max-md:text-xs text-sm  font-semibold">Service Type: </p>
                        <p className="text-sm max-md:text-xs">{purchaseData.serviceType}</p>
                      </div>
                      <div className="flex p-2">
                        <p className="mr-1 max-md:text-xs text-sm  font-semibold">Plan Price: </p>
                        <p className="text-sm max-md:text-xs">{purchaseData.price}/-</p>
                      </div>


                    </div>
                  </div>

                  {/* Second Column for Cart Details */}
                  <div className="relative lg:py-3 flex justify-center text-black max-lg:pb-3 max-md:pr-16 md:max-lg:pr-[75px] ">
                    <div className="text-left">
                      <div className="flex p-2">
                        <p className="mr-1  max-md:text-xs text-sm font-semibold">Cover Letter Included:</p>
                        <p className="text-sm max-md:text-xs">{purchaseData.coverLetterIncluded ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="flex p-2">
                        <p className="mr-1  max-md:text-xs text-sm font-semibold">Coupon Name:</p>
                        <p className="text-sm max-md:text-xs">{purchaseData.appliedCouponName}</p>
                      </div>
                      <div className="flex p-2">
                        <p className="mr-1 max-md:text-xs text-sm  font-semibold">Discount Obtained: </p>
                        <p className="text-sm max-md:text-xs">{purchaseData.Discount}/-</p>
                      </div>
                      <div className="flex p-2">
                        <p className="mr-1 max-md:text-xs text-sm  font-semibold">Amount Paid:</p>
                        <p className="text-sm max-md:text-xs">{purchaseData.cartTotalaftergst.toFixed(2)}/-</p>
                      </div>

                      <div className="flex p-2">
                        <p className="mr-1  max-md:text-xs text-sm font-semibold">Order Date: </p>
                        <p className="text-sm max-md:text-xs">{purchaseData.orderDate}</p>
                      </div>
                      <div className="flex p-2">
                        <p className="mr-1  max-md:text-xs text-sm font-semibold">Status:</p>
                        <p className={`font-medium text-sm max-md:text-xs text-${purchaseData.status === 'pending' ? 'yellow-600' : purchaseData.status === 'success' ? 'green-700' : 'red-700'}`}>{purchaseData.status}</p>
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


export default PurchaseHistory;

