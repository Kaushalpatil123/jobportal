import React, { useContext, useState } from "react";
import '../../css/Modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import contextAuth from "../../ContextAPI/ContextAuth";


const Modal = (props) => {
    const Auth = useContext(contextAuth);
    return (
        <>
            <div className='Modal sm:w-[400px] flex flex-col'>
            <div className="header w-full p-2"><FontAwesomeIcon icon={faTriangleExclamation} /> Error</div>
            {/* <div className="sub-header w-full flex text-left py-2">
                <div className="error-type ml-3">Type:</div>
                <div className="error-bubble ml-2">{props.type}</div>
            </div> */}
            <div className="content w-full text-left py-3 px-3">
                {Array.isArray(props.error) ? (
                    <ul>
                        {props.content.map(element => {
                            return <li key={element}>{element}</li>
                        })}
                    </ul>
                ) : props.error
                }
            </div>
            <div className="action w-full text-right py-2 px-3">
                <button onClick={() => Auth.errorHandler(null)}>Ok</button>
            </div>
            </div>
            <div className="backdrop w-full h-full" onClick={() => Auth.errorHandler(null)}></div>
        </>
    ) 
}

export default Modal;