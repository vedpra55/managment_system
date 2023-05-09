import ReportBilling from "@/models/reportBilling";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
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
      await ReportBilling.updateOne(
        { _id: id },
        {
          sNo,
          date,
          cylinderType,
          description,
          amount: parseFloat(amount),
          modeOfPayment,
          paymentStatus,
          remark,
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
    const reportBilling = await ReportBilling.findOne({ _id: id });

    res.status(200).json({
      reportBilling,
    });
  }

  if (req.method === "DELETE") {
    await ReportBilling.deleteOne({ _id: id });

    res.status(200).json({
      sucess: true,
    });
  }
}
