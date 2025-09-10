import React from "react";
//Styles
import "./globaltextarea.scss";
// P-Components
import { InputTextarea } from "primereact/inputtextarea";

const GlobalTextarea = (props) => {
  const { value, onChange, rows, cols, style, placeholder, label, isRequired, disabled, name, id ,...remainingProps} =
    props;
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
      <InputTextarea
        name={name}
        id={id}
        className={"textarea_style"}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        autoResize
        style={style}
        placeholder={placeholder}
        disabled={disabled}
        {...remainingProps} 
      />
    </>
  );
};

export default GlobalTextarea;
