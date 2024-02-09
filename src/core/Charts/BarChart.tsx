import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const Barchart: React.FC = () => {
  // This is the options and data for the chart
  const options: ApexOptions = {
    chart: {
      type: "line", // or 'bar' for the bars
      height: 450,
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#00E396", "#FEB019", "#008FFB"], // Colors for Team A, B, and C
    stroke: {
      width: [1, 1, 4],
    },
    title: {
      text: "Website Visits",
      align: "left",
      offsetX: 110,
    },
    xaxis: {
      categories: [
        "2003",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#008FFB",
        },
        labels: {
          style: {
            colors: "#008FFB",
          },
        },
        title: {
          text: "Team A",
          style: {
            color: "#008FFB",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Team B",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        labels: {
          style: {
            colors: "#FEB019",
          },
        },
        title: {
          text: "Team B",
          style: {
            color: "#FEB019",
          },
        },
      },
      {
        seriesName: "Team C",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#00E396",
        },
        labels: {
          style: {
            colors: "#00E396",
          },
        },
        title: {
          text: "Team C",
          style: {
            color: "#00E396",
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  // Series data
  const series = [
    {
      name: "Team A",
      type: "column",
      data: [23, 44, 55, 21, 67, 43, 77, 28, 56, 76],
    },
    {
      name: "Team B",
      type: "area",
      data: [44, 76, 78, 13, 43, 62, 80, 52, 59, 36],
    },
    {
      name: "Team C",
      type: "line",
      data: [30, 65, 33, 49, 76, 52, 69, 53, 41, 67],
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={400}
      />
    </div>
  );
};
export default Barchart;