import User from "@/models/user";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";

dbConnect();

export default async function handler(req, res) {
  const bearerToken = req.headers["authorization"];

  const token = bearerToken.split(" ")[1];

  const secrent = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

  try {
    jose.jwtVerify(token, secrent);
  } catch (err) {
    return res.status(401).josn({
      errorMessage: "Unauthorize request",
    });
  }

  const payload = jwt.decode(token);

  if (!payload.email) {
    return res.status(401).josn({
      errorMessage: "Unauthorize request",
    });
  }

  const user = await User.findOne({ email: payload.email });

  res.status(200).json({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    department: user.department,
    position: user.position,
  });
}
