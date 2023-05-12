import User from "@/models/user";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import dbConnect from "@/lib/db";

dbConnect();

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { name, position, department, phoneNumber, role, email, password } =
      req.body;

    const errors = [];

    const validatorSchema = [
      {
        valid: validator.isLength(name, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Name is invalid",
      },
      {
        valid: validator.isLength(position, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Position is invalid",
      },

      {
        valid: validator.isMobilePhone(phoneNumber),
        errorMessage: "Phone number is invalid",
      },
      {
        valid: validator.isLength(password, {
          min: 5,
          max: 20,
        }),
        errorMessage: "Password is invalid",
      },
      {
        valid: validator.isEmail(email, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Email is invalid",
      },
    ];

    validatorSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({
        errorMessage: errors[0],
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
