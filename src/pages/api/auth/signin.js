import User from "@/models/user";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";
import dbConnect from "@/lib/db";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const errors = [];
    const { email, password } = req.body;

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "Email is invalid",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({
        errorMessage: errors[0],
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        errorMessage: "Email or password is invalid",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        errorMessage: "Password is invalid",
      });
    }

    const secrent = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET
    );
    const alg = "HS256";

    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .sign(secrent);

    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    res.status(200).json({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      department: user.department,
      position: user.position,
    });
  }
}
