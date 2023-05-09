import { Schema, model, models } from "mongoose";

const ReportBillingSchema = Schema({
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
  amount: {
    type: Number,
    required: true,
  },
  modeOfPayment: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    required: true,
  },
});

const ReportBilling =
  models?.reportBilling || model("reportBilling", ReportBillingSchema);

export default ReportBilling;
