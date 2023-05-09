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
});

const StockUsage = models?.stockUsage || model("stockUsage", StockUsageSchema);

export default StockUsage;
