import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppConfig } from "./AppConfig";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppTopbar } from "./AppTopbar";

import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "prismjs/themes/prism-coy.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import "./assets/demo/Demos.scss";
import "./assets/demo/flags/flags.css";
import "./assets/layout/layout.scss";

//coponent calling
import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import ForgotPass from "./pages/login/forgotpass";
import Login from "./pages/login/Login";
import POSMain from "./pages/posmain";
import productMain from "./pages/product";
import userMain from "./pages/users";
import salesMain from "./pages/sales";
import ConfigurationMain from "./pages/configuration";
import ColorMain from "./pages/configuration/color";
import GenderMain from "./pages/configuration/gender";
import SizeMain from "./pages/configuration/size";

const App = () => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
        {
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-th-large",
                    to: "/",
                },
            ],
        },
        {
            items: [
                {
                    label: "POS",
                    icon: "pi pi-fw pi-slack",
                    to: "/api/pos",
                },
            ],
        },
        {
            items: [
                {
                    label: "Sales",
                    icon: "pi pi-fw pi-shopping-bag",
                    to: "/api/sales",
                },
            ],
        },
        {
            items: [
                {
                    label: "Stock Management",
                    icon: "pi pi-fw pi-server",
                    to: "/api/stock",
                },
            ],
        },
        {
            items: [
                {
                    label: "Configuration",
                    icon: "pi pi-fw pi-sliders-h",
                    items: [
                        { label: "Color Management", icon: "pi pi-fw pi-palette", to: "/api/color" },
                        { label: "Size Management", icon: "pi pi-fw pi-stop-circle", to: "/api/size" },
                        { label: "Gender Management", icon: "pi pi-fw pi-bookmark", to: "/api/gender" },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: "User Management",
                    icon: "pi pi-fw pi-users",
                    to: "/api/user",
                },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
        "layout-theme-light": layoutColorMode === "light",
    });
    const loginUser = useSelector((state) => state.loginUser);
    const { user } = loginUser;
    return (
        <>
            {user !== undefined ? (
                <>
                    <ToastContainer />
                    <Route path="/api/forgotpass" exact={true} component={ForgotPass} />
                    <Route path="/" exact component={Login} />
                    {/* <Route path='*' component={Login} /> */}
                </>
            ) : (
                <div className={wrapperClass} onClick={onWrapperClick}>
                    <ToastContainer />
                    <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                    <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                    <div className="layout-sidebar" onClick={onSidebarClick}>
                        <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                    </div>
                    <div className="layout-main-container">
                        <div className="layout-main">
                            <Switch>
                                {/* //Dashboard */}
                                <Route path="/" exact component={Dashboard} />
                                {/* Management */}
                                <Route path="/api/pos" exact component={POSMain} />
                                <Route path="/api/sales" exact component={salesMain} />
                                <Route path="/api/stock" exact component={productMain} />
                                <Route path="/api/color" exact component={ColorMain} />
                                <Route path="/api/gender" exact component={GenderMain} />
                                <Route path="/api/size" exact component={SizeMain} />
                                <Route path="/api/user" exact component={userMain} />
                            </Switch>
                        </div>
                        <AppFooter layoutColorMode={layoutColorMode} />
                    </div>

                    <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

                    <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                        <div className="layout-mask p-component-overlay"></div>
                    </CSSTransition>
                </div>
            )}
        </>
    );
};

export default App;
