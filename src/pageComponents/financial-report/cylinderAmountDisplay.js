import React from "react";
import Card from "./Card";

export default function CylinderAmountDisplay({ amounts }) {
  const totalOxygen = amounts?.oxygen;
  const totalNitrogen = amounts?.nitrogen;
  const totalCo2 = amounts?.co2;
  const totalFe = amounts?.fireExtinguisher;
  const totalAcetyle = amounts?.acetyle;

  return (
    <div>
      <h2 className="pb-5 text-2xl font-semibold">Cylinder</h2>
      <div className="grid grid-cols-12 gap-10">
        <Card title="Total Oxygen" amount={totalOxygen} />
        <Card title="Total Nitrogen" amount={totalNitrogen} />
        <Card title="Total Co2" amount={totalCo2} />
        <Card title="Total Fire Extinguisher" amount={totalFe} />
        <Card title="Total Acetyle" amount={totalAcetyle} />
      </div>
    </div>
  );
}
