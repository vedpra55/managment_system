import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TotalSalesPieChart({ sales }) {
  const salesValues = [
    sales.oxygen,
    sales.nitrogen,
    sales.fireExtinguisher,
    sales.acetyle,
    sales.co2,
  ];

  const data = {
    labels: ["Oxygen", "Nitrogen", "Fire Extinguisher", "Acetyle", "Co2"],
    datasets: [
      {
        label: "Sales",
        data: salesValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="w-96 p-5 bg-gray-50 rounded-lg shadow-md border">
      <p className="text-center pb-5 text-xl font-semibold">Total Sales</p>
      <Pie data={data} />
    </div>
  );
}
