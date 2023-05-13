import { Schema, models, model } from "mongoose";

const UserSchema = Schema({
  name: {
    type: String,
  },
  position: {
    type: String,
  },
  department: {
    type: String,
  },
  phoneNumber: {
    type: Number,
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
