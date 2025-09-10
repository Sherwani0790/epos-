import React from "react";
import { Button } from "primereact/button";
import "./primarybutton.scss";
const PrimaryButton = (props) => {
  const {
    label,
    onClick,
    type,
    placeholder,
    style,
    disabled,
    icon,
    iconPos,
    name,
    id,
  } = props;
  return (
    <>
      <Button
        className={"primary_button"}
        type={type}
        placeholder={placeholder}
        onClick={onClick}
        label={label}
        style={style}
        disabled={disabled}
        icon={icon}
        iconPos={iconPos}
        name={name}
        id={id}
      />
    </>
  );
};

export default PrimaryButton;
