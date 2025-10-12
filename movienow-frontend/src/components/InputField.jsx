import React from "react";
import "./InputField.css";

const InputField = ({ label, type = "text", name, className = "" , required = false}) => {
    return (
        <div className={`group ${className}`}>
            <input required={required} type={type} className="input" name={name}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{label}</label>
        </div>
    );
};

export default InputField;