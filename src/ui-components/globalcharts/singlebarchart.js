import React, { useState } from "react";
//styles
import  "./charts.scss";
//PrimeCharts
import { Chart } from "primereact/chart";

const SingleBarCharts = () => {
    const [basicData] = useState(
        {
            labels: ["Assigned", "On hold", "InProgress", "Not Started", "Completed","Assigned", "On hold", "InProgress", "Not Started", "Completed"],
            datasets: [
                {
                    label: 'Paid Amount',
                    data: [58, 300, 200, 21, 43, 54, 87, 99, 403, 237, 278, 333],
                    backgroundColor: [
                        "#3165cb",

                    ],
                }
            ],
        }
    );
    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        };
        return {
            basicOptions,
        };
    };
    const { basicOptions } = getLightTheme();
    return (
        <>
            <div className={"charts_div"}>
                <Chart
                    type="bar"
                    data={basicData}
                    options={basicOptions}
                    style={{ height: "300px" }}
                />
            </div>
        </>
    );
};

export default SingleBarCharts;
