import React from "react";

/// prime react component
import { Checkbox } from "primereact/checkbox";

export default function GlobalCheckbox(props) {
  const { checked, onChange, label, name, value } = props;

  return (
    <div className="flex justify-content-center">
      <div className="d-flex align-items-center gap-2">
        <Checkbox
          inputId="ingredient1"
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <label htmlFor="ingredient1" className="m-0">
          {label}
        </label>
      </div>
    </div>
  );
}
