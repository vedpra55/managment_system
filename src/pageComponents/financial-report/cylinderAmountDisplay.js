import React from "react";
import NumberDisplay from "../../components/NumberDisplay";

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
        <NumberDisplay title="Total Oxygen" amount={totalOxygen} />
        <NumberDisplay title="Total Nitrogen" amount={totalNitrogen} />
        <NumberDisplay title="Total Co2" amount={totalCo2} />
        <NumberDisplay title="Total Fire Extinguisher" amount={totalFe} />
        <NumberDisplay title="Total Acetyle" amount={totalAcetyle} />
      </div>
    </div>
  );
}
