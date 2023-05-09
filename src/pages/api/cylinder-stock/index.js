import CylinderStock from "@/models/cylinderStock";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { date, cylinderType, size, quantity, cylinderNumber } = req.body;

    if (!date || !cylinderType || !size || !quantity || !cylinderNumber) {
      return res.status(500).json({
        errorMessage: "Inavalid data",
      });
    }

    try {
      await CylinderStock.create({
        date,
        cylinderType,
        size,
        quantity: parseInt(quantity),
        cylinderNumber: parseInt(cylinderNumber),
      });

      res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  if (req.method === "GET") {
    const cylinderStocks = await CylinderStock.find({}).lean();

    return res.status(200).json({
      cylinderStocks,
    });
  }
}
