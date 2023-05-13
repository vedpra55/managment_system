import dbConnect from "@/lib/db";
import Staff from "@/models/staff";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fullName, gender, phoneNumber, address } = req.body;

    try {
      await Staff.create({
        fullName,
        gender,
        phoneNumber: parseInt(phoneNumber),
        address,
      });

      res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(401).json({
        sucess: false,
        errorMessage: "Invalide data",
      });
    }
  }

  if (req.method === "GET") {
    const { toDate, fromDate } = req.query;

    let staffs;

    if (toDate && fromDate) {
      staffs = await Staff.find({
        createdAt: { $gte: toDate, $lte: fromDate },
      }).lean();
    } else {
      staffs = await Staff.find({});
    }

    const totalStaffs = await Staff.count();

    res.status(200).json({
      staffs,
      totalStaffs,
    });
  }
}
