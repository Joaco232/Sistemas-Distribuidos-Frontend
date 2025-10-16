import React from "react";
import "./RememberMeButton.css";

export default function RememberMeButton({ checked, onChange }) {
  return (
    <div className="cntr">
      <input
        type="checkbox"
        id="cbx"
        className="hidden-xs-up"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="cbx" className="cbx"></label>
    </div>
  );
}