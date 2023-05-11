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
    const { cylinderNumber } = req.query;

    const searchQuery = {
      cylinderNumber: { $regex: cylinderNumber }, // search for first name containing 'j'
    };

    if (cylinderNumber?.length > 3) {
      const cylinderStock = await CylinderStock.find(searchQuery).lean();

      return res.status(200).json({
        cylinderStock,
      });
    }

    const cylinderStocks = await CylinderStock.find({}).lean();

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

    return res.status(200).json({
      cylinderStocks,
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
