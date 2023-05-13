import ReportBilling from "@/models/reportBilling";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      sNo,
      date,
      cylinderType,
      description,
      amount,
      modeOfPayment,
      paymentStatus,
      remark,
    } = req.body;

    try {
      await ReportBilling.create({
        sNo,
        date,
        cylinderType,
        description,
        amount: parseFloat(amount),
        modeOfPayment,
        paymentStatus,
        remark,
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
    const { toDate, fromDate } = req.query;

    let reportBilling;

    if (toDate && fromDate) {
      stockUsage = await ReportBilling.find({
        createdAt: { $gte: toDate, $lte: fromDate },
      }).lean();
    }

    reportBilling = await ReportBilling.find({}).lean();

    return res.status(200).json({
      reportBilling,
    });
  }
}
