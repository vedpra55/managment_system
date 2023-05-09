import ProductPurchase from "@/models/productPurchase";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { date, spareItem, quantity, status, remark, supplier, amount } =
      req.body;

    try {
      await ProductPurchase.updateOne(
        { _id: id },
        {
          date,
          spareItem,
          quantity: parseInt(quantity),
          status,
          remark,
          supplier,
          amount: parseFloat(amount),
        }
      );
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
    const productPurchase = await ProductPurchase.findOne({
      _id: id,
    });

    return res.status(200).json({
      productPurchase,
    });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    await ProductPurchase.deleteOne({ _id: id });

    res.status(200).json({
      sucesss: true,
    });
  }
}
