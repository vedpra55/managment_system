import { Schema, model, models } from "mongoose";

const TrackingSchema = Schema({
  fromPortBlair: {
    type: Schema.Types.ObjectId,
    ref: "fromPortBlair",
  },
  fromChennai: {
    type: Schema.Types.ObjectId,
    ref: "fromChennai",
  },
  remark1: {
    type: String,
  },
  remark2: {
    type: String,
  },
  fillingStatus: {
    type: Boolean,
  },
  receivedStatus: {
    type: Boolean,
  },
  createdAt: { type: Date, default: Date.now },
});

const TransportationTracking =
  models?.transportationTracking ||
  model("transportationTracking", TrackingSchema);

export default TransportationTracking;
