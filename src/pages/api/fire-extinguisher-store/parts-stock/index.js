import FirePartsStock from "@/models/firePartsStock";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { date, spareType, size, quantity } = req.body;

    try {
      await FirePartsStock.create({
        date,
        spareType,
        size,
        quantity: parseInt(quantity),
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
    const partStocks = await FirePartsStock.find().lean();

    return res.status(200).json({
      partStocks,
    });
  }
}
