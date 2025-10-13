import React from "react";
import "./InputField.css";

const InputField = ({ label, type = "text", name, className = "" ,
                        required=false, value, onChange, minLength, maxLength
                        , pattern, min, max, step, disabled=false, autoFocus=false
                        , autoComplete="off" }) => {
    return (
        <div className={`group ${className}`}>
            <input type={type}  placeholder="" className="input" name={name} required={required} value={value}
                   onChange={onChange} maxLength={maxLength} minLength={minLength} pattern={pattern}
                     min={min} max={max} step={step} disabled={disabled} autoFocus={autoFocus} autoComplete={autoComplete}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{label}</label>
        </div>
    );
};

export default InputField;