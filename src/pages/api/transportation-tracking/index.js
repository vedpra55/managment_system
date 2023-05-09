import FromChennai from "@/models/fromChennai";
import FromPortBlair from "@/models/fromPortBlair";
import TransportationTracking from "@/models/tracking";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const portBlair = new FromPortBlair();

      const portData = await portBlair.save();

      const chennai = new FromChennai();

      const chennaiData = await chennai.save();

      const tracking = new TransportationTracking();

      tracking.fromPortBlair = portData._id;
      tracking.fromChennai = chennaiData._id;
      tracking.fillingStatus = false;
      tracking.receivedStatus = false;

      const trackingData = await tracking.save();

      res.status(200).json({
        trackingData,
      });
    } catch (err) {
      return res.status(200).json({
        errorMessage: err.message,
      });
    }
  }
  if (req.method === "PUT") {
    const { id } = req.query;
    const {
      fillingStatus,
      fromChennai,
      fromPortBlair,
      receivedStatus,
      remark1,
      remark2,
      createdAt,
    } = req.body;

    try {
      await TransportationTracking.updateOne(
        { _id: id },
        {
          fillingStatus,
          fromChennai,
          fromPortBlair,
          receivedStatus,
          remark1,
          remark2,
          createdAt,
        }
      );

      res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(500).json({
        errorMessage: err.message,
      });
    }
  }
  if (req.method === "GET") {
    const { unCom } = req.query;

    if (unCom == true) {
      const tracking = await TransportationTracking.find({
        receivedStatus: false,
      });

      return res.status(200).json({
        tracking,
      });
    } else {
      const tracking = await TransportationTracking.find({}).sort({
        createdAt: "desc",
      });

      return res.status(200).json({
        tracking,
      });
    }
  }
}
