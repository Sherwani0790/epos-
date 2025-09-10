import React from "react";
//Styles
import "./globalinputnumber.scss";
//P-Components
import { InputNumber } from "primereact/inputnumber";

const GlobalInputNumber = (props) => {
  const {
    name,
    id,
    mode,
    placeholder,
    onClick,
    onValueChange,
    style,
    locale,
    minFractionDigits,
    showButtons,
    maxLength,
    useGrouping,
    label,
    isRequired,
  } = props;
  return (
    <>
      {label && (
        <div className="d-flex">
          <label>
            <b>{label}</b>
            {isRequired ? <span className="clr_red">*</span> : ""}
          </label>
        </div>
      )}
      <InputNumber
        className={"number_styles"}
        placeholder={placeholder}
        onValueChange={onValueChange}
        onClick={onClick}
        id={id}
        name={name}
        style={style}
        useGrouping={useGrouping}
        mode={mode}
        // incrementButtonClassName={styles.increment_btn}
        // decrementButtonClassName={styles.decrement_btn}
        locale={locale}
        minFractionDigits={minFractionDigits}
        maxLength={maxLength}
        showButtons={showButtons}
      />
    </>
  );
};

export default GlobalInputNumber;
