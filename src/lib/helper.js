const { default: CylinderStock } = require("@/models/cylinderStock");

export async function GetCylinderStock(type) {
  const stock = await CylinderStock.find({ cylinderType: type, isEmpty: false })
    .select("quantity")
    .lean();

  let totalStock = 0;
  for (let i = 0; i < stock.length; i++) {
    totalStock += stock[i]?.quantity;
  }

  return totalStock;
}
