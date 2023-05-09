import StockUsage from "@/models/stockUsage";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { date, workOrder, product } = req.body;

    try {
      await StockUsage.create({
        date,
        workOrder,
        product,
      });

      res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(200).json({
        errorMessage: err.message,
      });
    }
  }

  if (req.method === "GET") {
    const stockUsage = await StockUsage.find({}).lean();

    return res.status(200).json({
      stockUsage,
    });
  }
}
