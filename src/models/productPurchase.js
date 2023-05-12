import { Schema, model, models } from "mongoose";

const ProductPurechaseSchema = Schema({
  date: {
    type: Date,
    required: true,
  },
  spareItem: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ProductPurchase =
  models?.productPurchase || model("productPurchase", ProductPurechaseSchema);

export default ProductPurchase;
