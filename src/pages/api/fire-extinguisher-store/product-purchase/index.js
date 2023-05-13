import ProductPurchase from "@/models/productPurchase";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { date, spareItem, supplier, amount, quantity, status, remark } =
      req.body;

    try {
      await ProductPurchase.create({
        date,
        spareItem,
        quantity: parseInt(quantity),
        status,
        remark,
        supplier,
        amount: parseInt(amount),
      });
      return res.status(200).json({
        sucesss: true,
      });
    } catch (err) {
      return res.status(500).json({
        errorMessage: err.message,
      });
    }
  }

  if (req.method === "GET") {
    const { toDate, fromDate } = req.query;

    let productPurchases;

    if (toDate && fromDate) {
      productPurchases = await ProductPurchase.find({
        createdAt: { $gte: toDate, $lte: fromDate },
      }).lean();
    } else {
      productPurchases = await ProductPurchase.find({}).lean();
    }

    res.status(200).json({
      productPurchases,
    });
  }
}
