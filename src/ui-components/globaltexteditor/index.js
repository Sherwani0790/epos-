import React from "react";

import { Editor } from "primereact/editor";

const GlobalTextEditor = (props) => {
  const { value, setValue } = props;
  return (
    <div>
      <Editor
        value={value}
        onTextChange={(e) => setValue(e.htmlValue)}
        style={{ height: "320px" }}
      />
    </div>
  );
};

export default GlobalTextEditor;
