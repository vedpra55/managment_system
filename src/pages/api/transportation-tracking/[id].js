import FromChennai from "@/models/fromChennai";
import FromPortBlair from "@/models/fromPortBlair";
import TransportationTracking from "@/models/tracking";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (id) {
      const tracking = await TransportationTracking.findOne({
        _id: id,
      });

      const fromPortBlair = await FromPortBlair.findOne({
        _id: tracking?.fromPortBlair,
      });

      const fromChennai = await FromChennai.findOne({
        _id: tracking?.fromChennai,
      });

      return res.status(200).json({
        tracking,
        fromPortBlair,
        fromChennai,
      });
    }
  }

  if (req.method === "DELETE") {
    const { id, fromPortBlairId, fromChennaiId } = req.query;

    try {
      await TransportationTracking.deleteOne({ _id: id });
      await FromPortBlair.deleteOne({ _id: fromPortBlairId });
      await FromChennai.deleteOne({ _id: fromChennaiId });

      res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(200).json({
        errorMessage: err.message,
      });
    }
  }
}
