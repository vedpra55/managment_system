import User from "@/models/user";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { name, position, department, phoneNumber, role } = req.body;

    try {
      await User.updateOne(
        { _id: id },
        {
          name,
          position,
          department,
          phoneNumber,
          role,
        }
      );

      res.status(200).json({
        sucess: true,
      });
    } catch (err) {
      return res.status(401).json({
        errorMessage: err.message,
      });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    await User.deleteOne({ _id: id });

    res.status(200).json({
      sucess: true,
    });
  }
}
