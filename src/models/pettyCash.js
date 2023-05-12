import { Schema, model, models } from "mongoose";

const PettyCashSchema = Schema({
  sNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cylinderType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  cashType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PettyCash = models?.pettyCash || model("pettyCash", PettyCashSchema);

export default PettyCash;
