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
    type: Number,
    required: true,
  },
});

const CylinderStock =
  models?.cylinderStock || model("cylinderStock", CylinderStockSchema);

export default CylinderStock;
