import React from "react";
//styles
import "./globalinputdate.scss";
//P-Components
import { Calendar } from "primereact/calendar";
const GlobalInputdate = (props) => {
  const {
    style,
    id,
    name,
    value,
    onChange,
    mask,
    dateFormat,
    minDate,
    maxDate,
    placeholder,
    label,
    isRequired,
    small,
    showTime,
    showSeconds,
  } = props;
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
      <Calendar
        className={"date_select"}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        mask={mask}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        style={style}
        showIcon
        showTime={showTime}
        showSeconds={showSeconds}
        monthNavigator yearNavigator yearRange="1940:2090"
      />
    </>
  );
};

export default GlobalInputdate;
