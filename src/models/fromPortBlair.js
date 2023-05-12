import { Schema, model, models } from "mongoose";

const FromPortBlairSchema = Schema({
  sNo: {
    type: String,
  },
  date: {
    type: Date,
  },
  cylinderType: {
    type: String,
  },
  agentPortBlair: {
    type: String,
  },
  ewayBill: {
    type: String,
  },
  tcl: {
    type: String,
  },
  agentChennai: {
    type: String,
  },
  remark: {
    type: String,
  },
  fillingStatus: {
    type: String,
  },
  from: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const FromPortBlair =
  models?.fromPortBlair || model("fromPortBlair", FromPortBlairSchema);

export default FromPortBlair;
