import dbConnect from "@/lib/db";
import Staff from "@/models/staff";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const staff = await Staff.findOne({ _id: id });

    res.status(200).json({
      staff,
    });
  }
  if (req.method === "PUT") {
    const { id } = req.query;
    const { fullName, gender, phoneNumber, address } = req.body;

    try {
      await Staff.updateOne(
        { _id: id },
        { fullName, gender, phoneNumber, address }
      );

      res.status(200).json({ sucess: true });
    } catch (err) {
      return res.status(401).json({
        errorMessage: "Something goes wrong",
      });
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      await Staff.deleteOne({ _id: id });

      res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(401).json({
        errorMessage: err.message,
      });
    }
  }
}
