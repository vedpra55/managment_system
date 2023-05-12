import { Schema, model, models } from "mongoose";

const StockUsageSchema = Schema({
  date: {
    type: Date,
    required: true,
  },
  workOrder: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const StockUsage = models?.stockUsage || model("stockUsage", StockUsageSchema);

export default StockUsage;
