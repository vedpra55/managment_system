import React from "react";
import Card from "./Card";

export default function AmountDisplay({ amounts }) {
  const totalExpense = amounts?.totalExpense;
  const totalSales = amounts?.totalSales;
  const totalPettyCash = amounts?.totalPettyCash;
  const totalPurchase = amounts?.totalPurchase;

  return (
    <div>
      <h2 className="pb-5 text-2xl font-semibold">Overview</h2>
      <div className="grid grid-cols-12 gap-10">
        <Card title="Total Sales" amount={totalSales} />
        <Card title="Total Expense" amount={totalExpense} />
        <Card title="Total Petty Cash" amount={totalPettyCash} />
        <Card title="Total Purchase" amount={totalPurchase} />
      </div>
    </div>
  );
}
