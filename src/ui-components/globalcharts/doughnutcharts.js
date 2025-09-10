import React, { useState } from "react";
//styles
import "./charts.scss";
//PrimeCharts
import { Chart } from "primereact/chart";

const DoughnutCharts = () => {
  const [chartData] = useState({
    labels: [
      "No of Data",
      "No of Data",
      "No of Data",
      "No of Data",
      "No of Data",
    ],
    datasets: [
      {
        data: [200, 350, 400, 100, 600],
        backgroundColor: [
          "#FAB55A",
          "#F0603A",
          "#34475A",
          "#C0C6CC",
          "#41C588",
        ],
        // hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
          font: {
            size: 11, // Set the font size to 11px
          },
        },
      },
    },
  });

  return (
    <>
      <div className={"charts_div"}>
        {/* <div className="card flex justify-content-center"> */}
        <Chart
          type="doughnut"
          data={chartData}
          options={lightOptions}
          style={{ position: "relative", width: "100%", height: "270px" }}
        />
        {/* </div> */}
      </div>
    </>
  );
};

export default DoughnutCharts;
