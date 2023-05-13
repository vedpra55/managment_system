import User from "@/models/user";
import bcrypt from "bcrypt";
import * as jose from "jose";
import dbConnect from "@/lib/db";

dbConnect();

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { name, position, department, phoneNumber, role, email, password } =
      req.body;

    if (!email || !password) {
      return res.status(200).json({
        errorMessage: "Invalide Data",
      });
    }

    const userWithEmail = await User.findOne({ email: email });

    if (userWithEmail) {
      res.status(400).json({
        errorMessage: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      position,
      department,
      phoneNumber,
      role,
    });

    const secrent = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET
    );
    const alg = "HS256";

    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .sign(secrent);

    res.status(200).json({
      token,
    });
  }
}
