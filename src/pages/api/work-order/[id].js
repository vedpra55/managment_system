import CylinderStock from "@/models/cylinderStock";
import WorkOrder from "@/models/workOrder";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    let workOrder = await WorkOrder.findOne({ _id: id }).lean();

    res.status(200).json({
      workOrder,
    });
  }
  if (req.method === "PUT") {
    const { id } = req.query;
    const {
      sNo,
      date,
      orderType,
      cylinderType,
      cylinderNumber,
      quantity,
      size,
      partyType,
      partyDetails,
      billAmount,
      invoiceDate,
      invoice,
      modeOfPayment,
      modeOfStatus,
      dueDate,
      remark,
      workOfStatus,
      paymentStatus,
      returnCylinderNumber,
    } = req.body;

    if (returnCylinderNumber) {
      const numbers = returnCylinderNumber.split(/[\n\r]+/);
      console.log(numbers);
      for (let i = 0; i < numbers?.length; i++) {
        try {
          await CylinderStock.updateOne(
            { cylinderNumber: numbers[i] },
            { isEmpty: true }
          );
        } catch (err) {
          return res.status(401).json({
            errorMessage: err.message,
          });
        }
      }
    }

    try {
      await WorkOrder.updateOne(
        { _id: id },
        {
          sNo,
          date,
          orderType,
          cylinderType,
          cylinderNumber,
          quantity: parseInt(quantity) || 0,
          size,
          partyType,
          partyDetails,
          billAmount: parseInt(billAmount) || 0,
          invoiceDate,
          invoice,
          modeOfPayment,
          modeOfStatus,
          dueDate,
          remark,
          workOfStatus,
          paymentStatus,
          returnCylinderNumber,
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
      await WorkOrder.deleteOne({ _id: id });
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
