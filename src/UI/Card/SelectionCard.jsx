import React from "react";
import '../../css/Register.css';

const SelectionCard = (props) => {
    return (
        <div className="SelectionCard flex flex-row justify-center items-center px-3 py-3 m-2 w-[75%]
        sm:w-[70%]
        md:w-[45%]" 
        onClick={() => props.onClick(props.title)}
        style={{border: props.workStatus == props.title && '2px solid black'}}>
            <div className="InfoSection flex-col justify-between text-left w-[75%]">
                <div className="font-bold">{props.title}</div>
                <div>{props.description}</div>
            </div>
            <div className="ImageSection flex justify-center items-center w-[25%]"><img src={props.src}/></div>
        </div>
    )
}

export default SelectionCard;