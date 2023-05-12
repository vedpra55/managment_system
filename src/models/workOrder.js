import { Schema, model, models } from "mongoose";

const WorkOrderSchema = Schema({
  sNo: {
    type: String,
  },
  date: {
    type: Date,
  },
  orderType: {
    type: String,
  },
  cylinderType: {
    type: String,
  },
  cylinderNumber: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  size: {
    type: String,
  },
  partyType: {
    type: String,
  },
  partyDetails: {
    type: String,
  },
  billAmount: {
    type: Number,
  },
  invoiceDate: {
    type: Date,
  },
  invoice: {
    type: String,
  },
  modeOfPayment: {
    type: String,
  },
  workOfStatus: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
  remark: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  returnCylinderNumber: {
    type: String,
  },
});

const WorkOrder = models?.workOrder || model("workOrder", WorkOrderSchema);

export default WorkOrder;
