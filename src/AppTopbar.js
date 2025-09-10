import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import classNames from "classnames";
import { Avatar } from "primereact/avatar";
import { SplitButton } from "primereact/splitbutton";
import { useDispatch } from "react-redux";
import { logout } from "./redux/auth_slice/login_user_slice";
import {  confirmPopup } from 'primereact/confirmpopup';
// import profileimg from "../../../images/avatar/profile.jpg";
export const AppTopbar = (props) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const logoutUser = () => {
        confirmPopup({
            message: 'Do you want to logout?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => {
                dispatch(logout());
                history.push('/');
            },
            reject: () => {
                // Do nothing if the user rejects
            }
        });
    }
    const items = [
        {
            label: "User Profile",
            icon: "pi pi-user",
            command: () => {
                history.push("./userprofile");
            },
        },

        {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => {

                logoutUser();
            },
        },
    ];

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === "light" ? "assets/layout/images/teek_logo.svg" : "assets/layout/images/teek_logo.svg"} alt="logo" />
            </Link>
            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>
            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>
            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>

                <li className="flex ml-2" onClick={props.onMobileSubTopbarMenuClick}>
                    <button className="p-link layout-topbar-button user-image">
                        {/* <Avatar image={user?.profile_pic} className="mr-1" size="3rem" shape="circle" /> */}
                        <Avatar image="assets/layout/images/amyelsner.png" className="mr-3" size="3rem" shape="circle" />
                        <span>Profile</span>
                    </button>
                    <SplitButton model={items} className="p-button-text custom-button-css"></SplitButton>
                </li>

                {/* <li>
                    <button className="p-link layout-topbar-button" onClick={logoutUser}>
                        <i className="pi pi-user-minus" />
                        <span>Logout</span>
                    </button>
                </li> */}

            </ul>
        </div>
    );
};
