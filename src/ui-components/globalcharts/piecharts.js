import React, { useState } from "react";
//styles
import "./charts.scss";
//PrimeCharts
import { Chart } from "primereact/chart";

const PieCharts = () => {
  const [chartData] = useState({
    labels: [
      "No of Data",
      "No of Data",
      "No of Data",
      "No of Data",
      "No of Data",
      "No of Data",
    ],
    datasets: [
      {
        data: [100, 200, 300, 400, 100, 600],
        backgroundColor: [
          "#FAB55A",
          "#F0603A",
          "#34475A",
          "#C0C6CC",
          "#41C588",
          "#FDDDB3",
        ],
        // hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
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
    <div className={"charts_div"}>
      <Chart
        type="pie"
        data={chartData}
        options={lightOptions}
        style={{ position: "relative", width: "100%", height: "270px" }}
      />
    </div>
  );
};

export default PieCharts;
