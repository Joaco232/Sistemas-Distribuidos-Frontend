import React from "react";
import "./RememberMeButton.css";

export default function RememberMeButton({ checked, onChange, id = "remember-me" }) {
  return (
    <div className="cntr">
      <input
        type="checkbox"
        id={id}
        className="hidden-xs-up"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="cbx"></label>
    </div>
  );
}
