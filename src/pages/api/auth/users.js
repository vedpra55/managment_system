import User from "@/models/user";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await User.find({}).lean();

    res.status(200).json({
      users,
    });
  }
}
