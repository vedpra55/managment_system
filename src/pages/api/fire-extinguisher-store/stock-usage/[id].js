import StockUsage from "@/models/stockUsage";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const sockUsage = await StockUsage.findOne({ _id: id });

    res.status(200).json({
      sockUsage,
    });
  }

  if (req.method === "PUT") {
    const { date, workOrder, product, quantity } = req.body;

    try {
      await StockUsage.updateOne(
        { _id: id },
        {
          date,
          workOrder,
          product,
          quantity,
        }
      );
      res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(200).json({
        errorMessage: err.message,
      });
    }
  }

  if (req.method === "DELETE") {
    await StockUsage.deleteOne({ _id: id });

    res.status(200).json({
      sucess: true,
    });
  }
}
