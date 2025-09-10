import React from "react";
//Styles
import "./globalinputfield.scss";
//P-Components
import { InputText } from "primereact/inputtext";
const GlobalInputField = (props) => {
    const { type, name, id, placeholder, onClick, onChange, style, iconField, label, isRequired, small, disabled, ...remainingProps } = props;
    return (
        <>
            {label && (
                <div className="d-flex">
                    <label>
                        <b>{label}</b>
                        {isRequired ? <span className="clr_red">*</span> : ""}
                        <span className={"small_text"}>{small}</span>
                    </label>
                </div>
            )}
            {iconField ? (
                <div className="p-input-icon-right d-block">
                    <i className="pi pi-search" />
                    <InputText className={"input_styles"} placeholder={placeholder} onChange={onChange} onClick={onClick} id={id} name={name} style={style} disabled={disabled} {...remainingProps} />
                </div>
            ) : (
                <InputText className={"input_styles"} placeholder={placeholder} onChange={onChange} onClick={onClick} id={id} name={name} style={style} type={type} disabled={disabled} {...remainingProps} />
            )}
        </>
    );
};
export default GlobalInputField;
