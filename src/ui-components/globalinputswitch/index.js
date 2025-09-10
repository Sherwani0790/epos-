import React from "react";
import "./globalinputswitch.scss";
//P-Component
import { InputSwitch } from "primereact/inputswitch";

const GlobalInputSwitch = (props) => {
  const { checked, onChange, tooltip, onClick, style } = props;
  return (
    <>
      <InputSwitch
        checked={checked}
        style={style}
        onChange={onChange}
        tooltip={tooltip}
        onClick={onClick}
      />
    </>
  );
};

export default GlobalInputSwitch;
