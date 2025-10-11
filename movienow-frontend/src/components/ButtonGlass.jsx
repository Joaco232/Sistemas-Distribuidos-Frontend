import React from "react";
import "./ButtonGlass.css";

export default function ButtonGlass({ children, className = "" }) {
    return (
        <div className={`button-glass ${className}`}>
            {children}
        </div>
    );
}