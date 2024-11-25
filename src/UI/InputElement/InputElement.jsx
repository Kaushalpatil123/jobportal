import React from "react";
import '../../css/Register.css';

const InputElement = (props) => {
    return (
        <div className="InputElement flex flex-col text-left m-1">
            <label className="font-bold">{props.label}</label>
            
            <input disabled={props.disabled} className="px-3 py-2 my-1" style={{border: props.valid ? '1px solid #ccc' : '1px solid #F58634'}}
            type={props.type} 
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => props.onChange(e, props.field)}/>
            
            <p className="error" style={{
                visibility: props.valid ? 'hidden' : 'visible',
            }}>
                {props.error}
            </p>
        </div>
    )
}

export default InputElement;