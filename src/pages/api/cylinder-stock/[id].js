import CylinderStock from "@/models/cylinderStock";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    let cylinderStock = await CylinderStock.findOne({ _id: id }).lean();

    res.status(200).json({
      cylinderStock,
    });
  }
  if (req.method === "PUT") {
    const { id } = req.query;
    const { date, cylinderType, size, quantity, cylinderNumber } = req.body;

    try {
      await CylinderStock.updateOne(
        { _id: id },
        {
          date,
          cylinderType,
          size,
          quantity: parseInt(quantity),
          cylinderNumber: parseInt(cylinderNumber),
        }
      );

      res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      await CylinderStock.deleteOne({ _id: id });
      return res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.json(500).json({
        errorMessage: err.message,
      });
    }
  }
}
