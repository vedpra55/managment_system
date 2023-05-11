import dbConnect from "@/lib/db";
import CylinderStock from "@/models/cylinderStock";
import WorkOrder from "@/models/workOrder";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
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
    } = req.body;

    if (orderType === "SALE") {
      const numbers = cylinderNumber.split(/[\n\r]+/);
      for (let i = 0; i < numbers?.length; i++) {
        await CylinderStock.updateOne(
          { cylinderNumber: numbers[i] },
          { $inc: { quantity: -1 } }
        );
      }
    }

    try {
      await WorkOrder.create({
        sNo,
        date,
        orderType,
        cylinderType,
        cylinderNumber,
        quantity: parseInt(quantity) || 0,
        size,
        partyType,
        partyDetails,
        billAmount: parseFloat(billAmount) || 0,
        invoiceDate,
        invoice,
        modeOfPayment,
        modeOfStatus,
        dueDate,
        remark,
        workOfStatus,
        paymentStatus,
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
    const { category, orderType } = req.query;

    const query = {
      cylinderType: category || "",
    };

    let workOrders;

    if (category) {
      workOrders = await WorkOrder.find(query).lean();
    } else if (orderType) {
      workOrders = await WorkOrder.find({ orderType: orderType }).lean();
    } else {
      workOrders = await WorkOrder.find().lean();
    }

    const totalWorkOrder = await WorkOrder.find({}).count();

    res.status(200).json({
      workOrders,
      totalWorkOrder,
    });
  }
}
