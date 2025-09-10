import React from "react";

const GlobalRadioButton = (props) => {
  const { label, name, value, id } = props;
  return (
    <div className="d-flex align-items-center gap-1">
      <input type="radio" name={name} id={id} value={value} />
      <label className="m-0" htmlFor="">
        {label}
      </label>
    </div>
  );
};

export default GlobalRadioButton;
