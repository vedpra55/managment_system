import dbConnect from "@/lib/db";
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

    try {
      await WorkOrder.create({
        sNo,
        date,
        orderType,
        cylinderType,
        cylinderNumber: parseInt(cylinderNumber),
        quantity: parseInt(quantity),
        size,
        partyType,
        partyDetails,
        billAmount: parseFloat(billAmount),
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

    res.status(200).json({
      workOrders,
    });
  }
}
