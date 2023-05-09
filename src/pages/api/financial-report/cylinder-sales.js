import WorkOrder from "@/models/workOrder";

const { default: dbConnect } = require("@/lib/db");

dbConnect();

export default async function handler(req, res) {
  const { cylinderType, year } = req.query;

  const result1 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 1] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result2 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 2] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result3 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 3] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result4 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 4] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result5 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 5] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result6 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 6] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result7 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 7] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result8 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 8] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result9 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 9] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result10 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 10] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result11 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 11] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  const result12 = await WorkOrder.find({
    cylinderType,
    orderType: "SALE",
    $expr: {
      $and: [
        { $eq: [{ $month: "$createdAt" }, 12] },
        { $eq: [{ $year: "$createdAt" }, year] },
      ],
    },
  }).select("sNo");

  res.status(200).json({
    data: [
      result1.length,
      result2.length,
      result3.length,
      result4.length,
      result5.length,
      result6.length,
      result7.length,
      result8.length,
      result9.length,
      result10.length,
      result11.length,
      result12.length,
    ],
  });
}
