import React, { useState } from "react";
import "./InputField.css";

const InputField = ({
                        label,
                        type = "text",
                        name,
                        className = "",
                        required = false,
                        value,
                        onChange,
                        onBlur: onBlurProp,
                        minLength,
                        maxLength,
                        pattern,
                        min,
                        max,
                        step,
                        disabled = false,
                        autoFocus = false,
                        autoComplete = "off",
                        error = "",
                    }) => {
    const [inputType, setInputType] = useState(type === "date" ? "text" : type);

    const formatToDisplay = (isoDate) => {
        if (!isoDate) return "";
        const [y, m, d] = isoDate.split("-");
        return `${d}/${m}/${y}`;
    };

    const formatToISO = (displayDate) => {
        if (!displayDate) return "";
        const parts = displayDate.split(/[\/\-]/);
        if (parts.length === 3) {
            const [d, m, y] = parts;
            return `${y}-${m}-${d}`;
        }
        return displayDate;
    };

    const handleFocus = () => {
        if (type === "date") {
            setInputType("date");

            // Si no hay valor aún, se coloca la fecha de hoy automáticamente
            if (!value) {
                const today = new Date();
                today.setDate(today.getDate() - 1); // 👈 resta un día (ayer)
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, "0");
                const dd = String(today.getDate()).padStart(2, "0");
                const yesterdayISO = `${yyyy}-${mm}-${dd}`;
                onChange({ target: { name, value: yesterdayISO } });
                }
        }
    };

    const handleBlur = (e) => {
        if (type === "date") setInputType("text");
        if (onBlurProp) onBlurProp(e);
    };

    const handleChange = (e) => {
        let newValue = e.target.value;
        if (type === "date" && inputType === "text") {
            newValue = formatToISO(newValue);
        }
        onChange({ target: { name, value: newValue } });
    };

    return (
        <div className={`group ${className}`}>
            <div className="relative">
                <input
                    type={inputType}
                    placeholder=""
                    className={`input ${type === "date" ? "date-input" : ""} ${error ? "input-error" : ""}`}
                    name={name}
                    required={required}
                    value={
                        type === "date" && inputType === "text"
                            ? formatToDisplay(value)
                            : value || ""
                    }
                    onChange={handleChange}
                    maxLength={maxLength}
                    minLength={minLength}
                    pattern={pattern}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {type === "date" && (
                    <svg
                        className="calendar-icon-right"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10m-12 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                    </svg>
                )}
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className={error ? "label-error" : ""}>{label}</label>
            </div>
            {error && (
                <div className="error-message">
                    <svg 
                        className="error-icon" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default InputField;
