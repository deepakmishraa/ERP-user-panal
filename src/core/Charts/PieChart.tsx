import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const PieChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: ["America", "Asia", "Europe", "Africa"], // Labels for the pie chart
    colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63"], // Colors used in the pie chart
    legend: {
      position: "bottom", // Position of the legend
    },
    dataLabels: {
      enabled: true, // Enables the data labels on the chart
      formatter: function (val: number) {
        return val.toFixed(1) + "%"; // Format the label to show percentage with 1 decimal
      },
    },
    title: {
      text: "", // Title of the chart
      align: "left", // Aligns the title to the left
    },
    responsive: [
      {
        breakpoint: 100,
        options: {
          chart: {
            width: 200, // Adjusts the chart width on small screens
          },
          legend: {
            position: "bottom", // Adjusts the legend position on small screens
          },
        },
      },
    ],
  };

  // Series data (percentage for each region)
  const series = [28.4, 27.7, 9.2, 34.7]; // Replace with actual data

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      width={"100%"} // Width of the chart
      height={"100%"}
    />
  );
};

export default PieChart;
