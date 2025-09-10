import React from "react";
//styles
import "./searchinputcomponent.scss";
//components
import { InputText } from "primereact/inputtext";

const SearchInputComponent = (props) => {
    const { placeholder, value, isClassWidth = false } = props;
    return (
        <div className={isClassWidth ? "custom_search_width" : "search_input_width"}>
            <span className="p-input-icon-right text ">
                <InputText type="text" maxLength={30} value={value} placeholder={placeholder} className={`p-3 ${"border_class"}`} />
                <i className="pi pi-search" />
            </span>
        </div>

    );
};
// onChange={handleInput}

export default SearchInputComponent;
