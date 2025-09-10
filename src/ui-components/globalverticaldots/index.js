import React, { useRef } from "react";
//styles
import "./verticaldots.scss"
//components
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { BsThreeDotsVertical } from "react-icons/bs";

const GlobalVerticalDots = (props) => {
    const {
        items,
        handleMenuOpen,
        isDisabled = false,
        btnclr = false,
    } = props;
    const menu = useRef(null);
    const renderMenuItem = (item, index) => {
        const isLastItem = index === items.length - 1;
        const menuClass = isLastItem ? "last_kebab_menu_item" : "kebab_menu_item";
        return (
            <div
                className={`${menuClass} ${item?.isDisabled || isDisabled ? "disabled_kebab_menu" : "cursor-pointer"
                    } `}
                onClick={() => (item.isDisabled ? null : handleChange(item.id))}
            >
                <div className="m-0 kebab_menu_item_font">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                </div>
            </div>
        );
    };
    const handleChange = (val) => {
        // console.log({ val });
        handleMenuOpen(val);
        // menu.current.hide();
    };
    const menuItems = items.map((item, index) => {
        return {
            label: item.title,
            template: () => renderMenuItem(item, index),
        };
    });

    return (
        <div className="kebab_menu">
            <Menu
                model={menuItems}
                popup
                ref={menu}
                id="popup_menu"
                className="kebab_menu_border"
            />
            <Button
                className={`${btnclr ? "taskbodybutton" : "taskheaderbutton"
                    }`}
                icon={<BsThreeDotsVertical />}
                onClick={(event) => menu.current.toggle(event)}
                aria-controls="popup_menu"
                aria-haspopup
                disabled={isDisabled}
            ></Button>
        </div>
    );
};

export default GlobalVerticalDots;
