import { Schema, models, model } from "mongoose";

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "basic",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = models?.User || model("User", UserSchema);

export default User;
