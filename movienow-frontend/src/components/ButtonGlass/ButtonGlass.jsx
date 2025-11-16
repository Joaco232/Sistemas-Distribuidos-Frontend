import React from "react";
import "./ButtonGlass.css";

export default function ButtonGlass({ children, className = "", onClick, disabled = false}) {
    return (
        <button
            className={`button-glass ${className}`}
            onClick={onClick}
            disabled={disabled}

        >
            {children}
        </button>
    );
}