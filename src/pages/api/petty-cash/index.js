import PettyCash from "@/models/pettyCash";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sNo, date, cylinderType, description, remark, amount, cashType } =
      req.body;

    try {
      await PettyCash.create({
        sNo,
        date,
        cylinderType,
        description,
        remark,
        amount: parseFloat(amount),
        cashType,
      });

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
    const { cashType, toDate, fromDate } = req.query;

    if (cashType) {
      let pettyCash;
      if (toDate && fromDate) {
        pettyCash = await PettyCash.find({
          cashType,
          createdAt: { $gte: toDate, $lte: fromDate },
        }).lean();
      } else {
        pettyCash = await PettyCash.find({ cashType }).lean();
      }

      let amount = 0;

      for (let i = 0; i < pettyCash?.length; i++) {
        amount += parseFloat(pettyCash[i].amount);
      }

      return res.status(200).json({
        pettyCash,
        amount,
      });
    }
  }
}
