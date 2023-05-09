import { Schema, model, models } from "mongoose";

const WorkOrderSchema = Schema({
  sNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  orderType: {
    type: String,
    required: true,
  },
  cylinderType: {
    type: String,
    required: true,
  },
  cylinderNumber: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  partyType: {
    type: String,
    required: true,
  },
  partyDetails: {
    type: String,
    required: true,
  },
  billAmount: {
    type: Number,
    required: true,
  },
  invoiceDate: {
    type: Date,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
  },
  modeOfPayment: {
    type: String,
    required: true,
  },
  workOfStatus: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const WorkOrder = models?.workOrder || model("workOrder", WorkOrderSchema);

export default WorkOrder;
