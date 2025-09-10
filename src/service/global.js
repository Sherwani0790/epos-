import React from "react";
import {
    BsArrowRepeat,
    BsBarChartFill,
    BsCalendarCheck,
    BsCardChecklist,
    // BsCashStack,
    BsCurrencyDollar,
    BsCurrencyExchange,
    BsExclamationTriangleFill,
    BsFileEarmarkTextFill,
    BsGraphUp,
    BsGraphUpArrow,
    BsPeople,
    BsPieChartFill,
} from "react-icons/bs";
// import { CiSearch } from "react-icons/ci";
// import { CgFileDocument } from "react-icons/cg";
// import { BiUserCircle } from "react-icons/bi";
// import { MdOutlineCampaign } from "react-icons/md";
// import { GrTransaction } from "react-icons/gr";
export const REPORTS = {
    category: ["Invoices", "Clients"],
    data: {
        Invoices: [
            {
                id: 1,
                title: "Purchase Summary With Fee",
                icon: <BsPieChartFill />,

            },
            {
                id: 2,
                title: "Purchase Summary Without Fee",
                icon: <BsBarChartFill />,

            },
            {
                id: 3,
                title: "Invoice Summary Aging",
                icon: <BsFileEarmarkTextFill />,

            },
            {
                id: 4,
                title: "Payment History Detail",
                icon: <BsArrowRepeat />,

            },
            {
                title: "Reserve Detail",
                icon: <BsCardChecklist />,

            },
            {
                title: "Escrow Reserve",

                icon: <BsGraphUpArrow />,

            },
            {
                title: "Chargebacks",

                icon: <BsCurrencyDollar />,

            },
            {
                title: "Broker Commission Report",

                icon: <BsCurrencyExchange />,

            },
        ],
        Clients: [
            {
                title: "Credit Limit Warning",

                icon: <BsExclamationTriangleFill />,

            },
            {
                title: "Last Payment Date",

                icon: <BsCalendarCheck />,

            },
            {
                title: "Client Analysis",

                icon: <BsGraphUp />,

            },
            {
                title: "Client Risk Management Details",

                icon: <BsPeople />,

            }
            // {
            //     title: "Unapplied Cash Received",

            //     icon: <BsCashStack />,

            // },
            // {
            //     title: "Collection Efficiency Analysis",

            //     icon: <BsGraphUp />,

            // },
            // {
            //     title: "Cash Posting",

            //     icon: <BsCurrencyDollar />,

            // },
            // {
            //     title: "Debtor Aging",

            //     icon: <BsGraphUp />,

            // },
            // {
            //     title: "Transactions",
            //     icon: <GrTransaction />,

            // },
        ],
    },
};