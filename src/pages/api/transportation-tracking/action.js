import FromChennai from "@/models/fromChennai";
import FromPortBlair from "@/models/fromPortBlair";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;

    const {
      sNo,
      date,
      cylinderType,
      agentPortBlair,
      ewayBill,
      tcl,
      agentChennai,
      remark,
      fillingStatus,
      from,
    } = req.body;

    if (from === "chennai") {
      await FromChennai.updateOne(
        { _id: id },
        {
          sNo,
          date,
          cylinderType,
          agentPortBlair,
          ewayBill,
          tcl,
          agentChennai,
          remark,
          fillingStatus,
        }
      );
      return res.status(200).json({
        sucess: true,
      });
    }

    try {
      await FromPortBlair.updateOne(
        { _id: id },
        {
          sNo,
          date,
          cylinderType,
          agentPortBlair,
          ewayBill,
          tcl,
          agentChennai,
          remark,
          fillingStatus,
        }
      );

      return res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(200).json({
        errorMessage: err.mesaage,
      });
    }
  }
}
