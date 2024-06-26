import React, { useEffect, useState } from "react";
import "./LineChart.css";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    if (historicalData.prices) {
      const newData = [["Date", "Prices"]];
      historicalData.prices.forEach((item) => {
        newData.push([
          new Date(item[0]).toLocaleDateString().slice(0, -5),
          item[1],
        ]);
      });
      setData(newData);
    }
  }, [historicalData]);

  return <Chart chartType="LineChart" data={data} height="100%" legendToggle />;
};

export default LineChart;
