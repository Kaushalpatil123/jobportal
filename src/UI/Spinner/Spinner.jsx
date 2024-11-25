import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = () => {
    return (
        <div className="w-full h-full flex justify-center items-center " style={{
            position: 'fixed',
            top: '0px',
            backgroundColor: 'white',
            zIndex: '100',
        }}>
            <HashLoader color="#F58634" />
        </div>
    )
}

export default Spinner;