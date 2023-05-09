import {
  CalculateAmounts,
  CalculateCylinderAmounts,
} from "@/lib/calculateFinancialReport";
import WorkOrder from "@/models/workOrder";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { totalExpense, totalPettyCash, totalSales, totalPurchase } =
      await CalculateAmounts();

    const {
      oxygen,
      nitrogen,
      co2,
      fireExtinguisher,
      acetyle,
      oxygenSales,
      nitrogenSales,
      acetyleSales,
      co2Sales,
      fireExtinguisherSales,
    } = await CalculateCylinderAmounts();

    res.status(200).json({
      amounts: {
        totalExpense,
        totalPettyCash,
        totalSales,
        totalPurchase,
      },
      cylinderAmounts: {
        oxygen,
        nitrogen,
        co2,
        fireExtinguisher,
        acetyle,
      },
      sales: {
        oxygen: oxygenSales.length,
        nitrogen: nitrogenSales.length,
        acetyle: acetyleSales.length,
        co2: co2Sales.length,
        fireExtinguisher: fireExtinguisherSales.length,
      },
    });
  }
}
