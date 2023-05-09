import FirePartsStock from "@/models/firePartsStock";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;

    const { date, spareType, size, quantity } = req.body;

    try {
      await FirePartsStock.updateOne(
        { _id: id },
        {
          date,
          spareType,
          size,
          quantity: parseInt(quantity),
        }
      );

      return res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(200).json({
        errorMessage: err.message,
      });
    }
  }

  if (req.method === "GET") {
    const { id } = req.query;

    const partStock = await FirePartsStock.findOne({ _id: id });

    return res.status(200).json({
      partStock,
    });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    await FirePartsStock.deleteOne({ _id: id });

    res.status(200).json({
      sucesss: true,
    });
  }
}
