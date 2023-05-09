import { fetchCylinerSales } from "@/service/apiCalls";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

import useSwr from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CylinderSalesBarChart() {
  const [selectedCylinderType, setSelectedCylinderType] = useState("OXYGEN");
  const [selectedYear, setSelectedYear] = useState("2023");
  const { data } = useSwr(
    [selectedCylinderType, selectedYear, "cylinder-sales"],
    fetchCylinerSales
  );

  if (!data) {
    return <p className="p-10">Loading...</p>;
  }

  console.log(data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Cylinder Sales",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const datas = {
    labels,
    datasets: [
      {
        label: selectedCylinderType + "" + "Sales",
        data: data?.data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="flex gap-x-5">
        <div>
          <p className="text-[14px] font-medium pb-1">Cylinder Type :</p>
          <select
            className="bg-gray-100 px-5 py-2 rounded-md border  outline-none"
            value={selectedCylinderType}
            onChange={(e) => setSelectedCylinderType(e.target.value)}
          >
            <option value={"OXYGEN"}>OXYGEN</option>
            <option value={"CO2"}>CO2</option>
            <option value={"NITROGEN"}>NITROGEN</option>
            <option value={"FIREEXTINGUISHER"}>FIREEXTINGUISHER</option>
            <option value={"acetylene"}>acetylene</option>
          </select>
        </div>
        <div>
          <p className="text-[14px] font-medium pb-1">Year :</p>
          <select
            className="bg-gray-100 px-5 py-2 rounded-md  border  outline-none"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value={"2023"}>2023</option>
            <option value={"2025"}>2024</option>
            <option value={"2025"}>2025</option>
          </select>
        </div>
      </div>
      <Bar options={options} data={datas} />
    </div>
  );
}
