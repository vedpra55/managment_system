import { Schema, model, models } from "mongoose";

const FromChennaiSchema = Schema({
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
});

const FromChennai =
  models?.fromChennai || model("fromChennai", FromChennaiSchema);

export default FromChennai;
