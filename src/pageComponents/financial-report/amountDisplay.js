import React from "react";
import NumberDisplay from "../../components/NumberDisplay";

export default function AmountDisplay({ amounts }) {
  const totalExpense = amounts?.totalExpense;
  const totalSales = amounts?.totalSales;
  const totalPettyCash = amounts?.totalPettyCash;
  const totalPurchase = amounts?.totalPurchase;

  return (
    <div>
      <h2 className="pb-5 text-2xl font-semibold">Overview</h2>
      <div className="grid grid-cols-12 gap-10">
        <NumberDisplay title="Total Sales" amount={totalSales} />
        <NumberDisplay title="Total Expense" amount={totalExpense} />
        <NumberDisplay title="Total Petty Cash" amount={totalPettyCash} />
        <NumberDisplay title="Total Purchase" amount={totalPurchase} />
      </div>
    </div>
  );
}
