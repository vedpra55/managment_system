import { Schema, model, models } from "mongoose";

const FirePartStockSchema = Schema({
  date: {
    type: Date,
  },
  spareType: {
    type: String,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const FirePartsStock =
  models?.firePartStock || model("firePartStock", FirePartStockSchema);

export default FirePartsStock;
