import FirePartsStock from "@/models/firePartsStock";
import StockUsage from "@/models/stockUsage";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { date, workOrder, product, quantity } = req.body;

    try {
      await FirePartsStock.updateOne(
        { spareType: product },
        { $inc: { quantity: -quantity } }
      );
    } catch (err) {
      return res.status(401).json({
        error: err.message,
      });
    }

    try {
      await StockUsage.create({
        date,
        workOrder,
        product,
        quantity,
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
    const { toDate, fromDate } = req.query;

    let stockUsage;

    if (toDate && fromDate) {
      stockUsage = await StockUsage.find({
        createdAt: { $gte: toDate, $lte: fromDate },
      }).lean();
    } else {
      stockUsage = await StockUsage.find({}).lean();
    }

    return res.status(200).json({
      stockUsage,
    });
  }
}
