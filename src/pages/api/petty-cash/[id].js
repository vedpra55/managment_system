import PettyCash from "@/models/pettyCash";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { sNo, date, cylinderType, description, remark, amount, cashType } =
      req.body;

    try {
      await PettyCash.updateOne(
        { _id: id },
        {
          sNo,
          date,
          cylinderType,
          description,
          remark,
          amount: parseFloat(amount),
          cashType,
        }
      );

      return res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(500).json({
        errorMessage: err.message,
      });
    }
  }

  if (req.method === "GET") {
    const { id } = req.query;

    const pettyCash = await PettyCash.findOne({ _id: id });

    res.status(200).json({
      pettyCash,
    });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    await PettyCash.deleteOne({ _id: id });

    res.status(200).json({
      sucess: true,
    });
  }
}
