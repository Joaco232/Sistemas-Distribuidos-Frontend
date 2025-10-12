import React from "react";
import "./ButtonGlass.css";

export default function ButtonGlass({ children, className = "", type = "button" }) {
    return (
        <button type={type} className={`button-glass ${className}`}>
            {children}
        </button >
    );
}