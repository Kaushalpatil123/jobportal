import React from "react";
// import { Button } from "@/components/ui/button"

const Plans = () => {
  return (
    <div className="Dashboard h-full w-full flex flex-col">
      <div className="flex flex-row justify-between items-baseline">
        <h1 className="text-[25px] font-bold mb-4 text-[#333]">My Plans</h1>
        {/* <div className="editButton text-[22px] px-3 py-1 rounded-[10px]" onClick={editModeHandler}>
            <FontAwesomeIcon icon={editMode ? faEdit : faLock} style={{color: '#333'}}/>
        </div> */}
      </div>
      {/* Form Inputs */}
      <form
        className="reg-form w-full flex flex-col"
        style={{ boxShadow: "none" }}
      >
        <div className="border rounded-lg p-4 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-left">Text Resume Service</h2>
            <div className="flex space-x-4">
            <p className="text-sm font-semibold">
             Price
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
             <b>Rs.</b> 3000
            </p>
            </div>
            <div className="flex space-x-4">


            <p className="text-sm font-semibold">
             Validity
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              3 Months
            </p>
            </div>

           
           

          </div>
          {/* <div className="flex flex-row items-center justify-end gap-2 md:gap-4">
            <button size="sm">Start</button>
            <button size="sm">Stop</button>
            <button size="sm">Restart</button>
          </div> */}
        </div>

        {/* Submit Button */}
        <div className="submitWrapper flex flex-col text-left mt-2">
          {/* <button
            type="submit"
            className="submit text-left mt-2"
            // disabled={overAllValid && editMode ? false : true}
            style={{ backgroundColor: !overAllValid || !editMode ? '#ccc': '#F58634'}}>Update Info</button> */}
        </div>
      </form>
    </div>
  );
};

export default Plans;
