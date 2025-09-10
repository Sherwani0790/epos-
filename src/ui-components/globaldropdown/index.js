import React from "react";
//styles
import "./globaldropdown.scss";

import { Dropdown } from "primereact/dropdown";
const GlobalDropdown = (props) => {
    const { value, options, onChange, optionLabel, placeholder, name, id, editable = false, label, isRequired, isDependent, disabled, ...remainingProps } = props;

    // console.log({ value, optionLabel });
    return (
        <>
            {label && (
                <div className="d-flex">
                    <label>
                        <b>{label}</b>
                        {(isRequired || isDependent) && <span className={`${isDependent ? "clr_green" : "clr_red"}  `}>*</span>}
                    </label>
                </div>
            )}
            <Dropdown value={value} options={options} onChange={onChange} optionLabel={optionLabel} placeholder={placeholder} className={"filterbar_dropdown"} name={name} id={id} editable={editable} disabled={disabled} {...remainingProps} />
        </>
    );
};

export default GlobalDropdown;
