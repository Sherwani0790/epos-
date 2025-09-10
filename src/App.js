import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, useLocation, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";


import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//coponent calling
import Dashboard from "./components/Dashboard";
import Login from "./pages/login/Login";
import UserManagement from "./pages/usermanagement";
import SupportView from "./pages/support";
import InvoicesView from "./pages/transaction/invoices";
import ScheduleOfAssignment from "./pages/transaction/scheduleofassignment";
import ClientRequest from "./pages/creditrequest/clientrequest";
import DebtorRequest from "./pages/creditrequest/debtorrequest";
import { useSelector } from "react-redux";
import ClientsScreen from "./pages/managment/clients";
import DebtorScreen from "./pages/managment/debtor";
import UserProfile from "./pages/userprofile";
import ClientDetails from "./pages/managment/clients/clientdetails";
import Reports from "./pages/reports";
import ReportDetails from "./pages/reports/reportdetails";
import Document from "./pages/document";
import ForgotPass from "./pages/login/forgotpass";
// import ProfileClient from "./pages/managment/clients/clientdetails/component/profile";

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
                    icon: "pi pi-fw pi-home",
                    to: "/",
                },
            ],
        },
        {
            items: [
                {
                    label: "Management",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        { label: "Clients", icon: "pi pi-fw pi-bookmark", to: "/api/clients" },
                        { label: "Debtor", icon: "pi pi-fw pi-bookmark", to: "/api/debtor" },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: "Transactions",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        { label: "Invoices", icon: "pi pi-fw pi-bookmark", to: "/api/invoices" },
                        { label: "Schedule of Assignment", icon: "pi pi-fw pi-bookmark", to: "/api/scheduleofassignment" },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: "Credit Request",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        { label: "Clients Request", icon: "pi pi-fw pi-bookmark", to: "/api/clientrequest" },
                        { label: "Debtor Request", icon: "pi pi-fw pi-bookmark", to: "/api/debtorrequest" },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: "Support",
                    icon: "pi pi-fw pi-home",
                    to: "/api/support",
                },
            ],
        },
        {
            items: [
                {
                    label: "User Management",
                    icon: "pi pi-fw pi-home",
                    to: "/api/usermanagement",
                },
            ],
        },
        {
            items: [
                {
                    label: "Reports",
                    icon: "pi pi-fw pi-home",
                    to: "/api/reports",
                },
            ],
        },
        {
            items: [
                {
                    label: "Document",
                    icon: "pi pi-fw pi-home",
                    to: "/api/document",
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
            {
                user === undefined ?
                    <>
                        <ToastContainer />
                        <Route path="/api/forgotpass" exact={true} component={ForgotPass} />
                        <Route path="/" exact component={Login} />
                        {/* <Route path='*' component={Login} /> */}
                    </>
                    : <div className={wrapperClass} onClick={onWrapperClick}>
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
                                    <Route path="/api/clients" exact component={ClientsScreen} />
                                    <Route path="/api/clientdetails:id" exact component={ClientDetails} />
                                    <Route path="/api/debtor" exact component={DebtorScreen} />
                                    {/* Transactions */}
                                    <Route path="/api/invoices" exact component={InvoicesView} />
                                    <Route path="/api/scheduleofassignment" exact component={ScheduleOfAssignment} />
                                    {/* Credit Request */}
                                    <Route path="/api/clientrequest" exact component={ClientRequest} />
                                    <Route path="/api/debtorrequest" exact component={DebtorRequest} />

                                    {/* UserManagement */}
                                    <Route path="/api/usermanagement" exact component={UserManagement} />
                                    {/* Support */}
                                    <Route path="/api/support" exact component={SupportView} />
                                    {/* UserProfile */}
                                    <Route path="/api/userprofile" exact component={UserProfile} />
                                    {/* Reports*/}
                                    <Route path="/api/reports" exact component={Reports} />
                                    <Route path="/api/reports:reportId" exact component={ReportDetails} />
                                    {/* document */}
                                    <Route path="/api/document" exact component={Document} />
                                </Switch>
                            </div>
                            <AppFooter layoutColorMode={layoutColorMode} />
                        </div>

                        <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

                        <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                            <div className="layout-mask p-component-overlay"></div>
                        </CSSTransition>
                    </div >

            }
        </>

    );
};

export default App;
