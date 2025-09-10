import React from "react";

//P-Components

import { Dialog } from "primereact/dialog";

const GlobalDialogIndex = (props) => {
  const {
    className,
    header,
    visible,
    onHide,
    style,
    component,
    showHeader = false,
    draggable,
    position,
    breakpoints,
  } = props;
  return (
    <>
      <Dialog
        position={position}
        draggable={draggable}
        blockScroll={true}
        header={header}
        visible={visible}
        onHide={onHide}
        breakpoints={breakpoints}
        showHeader={showHeader}
        style={style}
        className={className}
      >
        {component}
      </Dialog>
    </>
  );
};

export default GlobalDialogIndex;
