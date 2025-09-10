import React, { useState } from "react";
//styles
import "./charts.scss";
//PrimeCharts
import { Chart } from "primereact/chart";

const BarCharts = () => {
  const [basicData] = useState(
    {
      labels: ["Assigned", "On hold", "InProgress", "Not Started", "Completed"],
      datasets: [
        {
          label: 'Paid Amount',
          data: [58, 300, 200, 100, 330],
          backgroundColor: [
            "#3165cb",

          ],
        },
        {
          label: 'Debt Amount',
          data: [50, 30, 10, 20, 90],
          backgroundColor: [
            "#FAB55A",

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
          // display: false,
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

export default BarCharts;
