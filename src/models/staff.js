import { Schema, model, models } from "mongoose";

const staffSchema = Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Staff = models?.staff || model("staff", staffSchema);

export default Staff;
