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
    const { sparePart, toDate, fromDate } = req.query;

    let partStocks;
    if (sparePart) {
      partStocks = await FirePartsStock.find({
        $text: { $search: sparePart },
      });
    } else {
      partStocks = await FirePartsStock.find().lean();
    }

    if (toDate && fromDate) {
      partStocks = await FirePartsStock.find({
        createdAt: { $gte: toDate, $lte: fromDate },
      }).lean();
    }

    return res.status(200).json({
      partStocks,
    });
  }
}
