import { Schema, model, models } from "mongoose";

const CylinderStockSchema = Schema({
  date: {
    type: Date,
    required: true,
  },
  cylinderType: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cylinderNumber: {
    type: String,
    required: true,
    index: true,
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
});

const CylinderStock =
  models?.cylinderStock || model("cylinderStock", CylinderStockSchema);

CylinderStockSchema.index({
  cylinderNumber: "text",
});

export default CylinderStock;
