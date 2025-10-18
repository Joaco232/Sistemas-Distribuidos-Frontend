import React from "react";
import "./ContainerGlass.css";

export default function ContainerGlass({ children, className = "" }) {
    return (
        <div className={`container-glass ${className}`}>
            {children}
        </div>
    );
}