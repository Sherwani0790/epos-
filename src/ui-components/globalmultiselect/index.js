import React from "react";
//Styles
import "./globalmultiselect.scss";
//P-Components
import { MultiSelect } from "primereact/multiselect";
const GlobalMultiSelect = (props) => {
  const {
    style,
    maxSelectedLabels,
    placeholder,
    optionLabel,
    onChange,
    onClick,
    options,
    value,
  } = props;
  return (
    <>
      <MultiSelect
        className={"input_styles"}
        value={value}
        options={options}
        onChange={onChange}
        onClick={onClick}
        optionLabel={optionLabel}
        placeholder={placeholder}
        maxSelectedLabels={maxSelectedLabels}
        style={style}
      />
    </>
  );
};

export default GlobalMultiSelect;
