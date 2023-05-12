import { GetCylinderStock } from "@/lib/helper";
import CylinderStock from "@/models/cylinderStock";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { date, cylinderType, size, quantity, cylinderNumber } = req.body;

    if (!date || !cylinderType || !size || !quantity || !cylinderNumber) {
      return res.status(500).json({
        errorMessage: "Inavalid data",
      });
    }

    try {
      await CylinderStock.create({
        date,
        cylinderType,
        size,
        quantity: parseInt(quantity),
        cylinderNumber: parseInt(cylinderNumber),
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
    const { cylinderNumber, toDate, fromDate } = req.query;

    const searchQuery = {
      isEmpty: false,
      cylinderNumber: { $regex: cylinderNumber }, // search for first name containing 'j'
    };

    if (cylinderNumber?.length > 1) {
      const cylinderStock = await CylinderStock.find(searchQuery).lean();

      return res.status(200).json({
        cylinderStock,
      });
    }

    let cylinderStocks;
    if (toDate && fromDate) {
      cylinderStocks = await CylinderStock.find({
        isEmpty: false,
        date: { $gte: toDate, $lte: fromDate },
      }).lean();
    } else {
      cylinderStocks = await CylinderStock.find({ isEmpty: false }).lean();
    }

    let totalStock = 0;
    for (let i = 0; i < cylinderStocks.length; i++) {
      totalStock += cylinderStocks[i]?.quantity;
    }

    const totalOxygenStock = await GetCylinderStock("OXYGEN");
    const totalNitrogenStock = await GetCylinderStock("NITROGEN");
    const totalCo2Stock = await GetCylinderStock("CO2");
    const totalFireExtinguisherStock = await GetCylinderStock(
      "FIREEXTINGUISHER"
    );
    const totalAcetyleStock = await GetCylinderStock("acetylene");

    const emptyStocks = await CylinderStock.find({ isEmpty: true });

    return res.status(200).json({
      cylinderStocks,
      emptyStocks,
      amounts: [
        totalStock,
        totalOxygenStock,
        totalNitrogenStock,
        totalCo2Stock,
        totalFireExtinguisherStock,
        totalAcetyleStock,
      ],
    });
  }
}
