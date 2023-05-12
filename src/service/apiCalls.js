export async function fetchWorkOrder(arg) {
  const res = await fetch("/api/work-order");
  return res.json();
}

export async function fetchWorkOrderCategory(arg) {
  const res = await fetch(`/api/work-order?category=${arg[0]}`);
  return res.json();
}

export async function fetchWorkOrderType(arg) {
  const res = await fetch(`/api/work-order?orderType=${arg[0]}`);
  return res.json();
}

export async function fetchSigleWorkOrder(arg) {
  const res = await fetch(`/api/work-order/${arg[0]}`);
  return res.json();
}

export async function fetchSingleCylinderStock(arg) {
  const res = await fetch(`/api/cylinder-stock/${arg[0]}`);
  return res.json();
}

export async function fetchCylinderStocks() {
  const res = await fetch("/api/cylinder-stock");
  return res.json();
}

export async function fetchReportBilling() {
  const res = await fetch("/api/report-billing");
  return res.json();
}

export async function fetchSingleReportBilling(arg) {
  const res = await fetch(`/api/report-billing/${arg[0]}`);
  return res.json();
}

export async function fetchUnTransportationTracking() {
  const res = await fetch("/api/transportation-tracking?unCom=true");
  return res.json();
}

export async function fetchTransportationTracking() {
  const res = await fetch("/api/transportation-tracking?unCom=false");
  return res.json();
}

export async function fetchSingleUnTransportationTracking(arg) {
  const res = await fetch(`/api/transportation-tracking/${arg[0]}`);
  return res.json();
}

export async function fetchPettyCash(arg) {
  const res = await fetch(`/api/petty-cash?cashType=${arg[0]}`);
  return res.json();
}

export async function fetchSinglePettyCash(arg) {
  const res = await fetch(`/api/petty-cash/${arg[0]}`);
  return res.json();
}

export async function fetchPartsStocks() {
  const res = await fetch(`/api/fire-extinguisher-store/parts-stock`);
  return res.json();
}

export async function fetchSinglePartStock(arg) {
  const res = await fetch(`/api/fire-extinguisher-store/parts-stock/${arg[0]}`);
  return res.json();
}

export async function fetchProductPurchase() {
  const res = await fetch(`/api/fire-extinguisher-store/product-purchase`);
  return res.json();
}

export async function fetchSingleProductPurchase(arg) {
  const res = await fetch(
    `/api/fire-extinguisher-store/product-purchase/${arg[0]}`
  );
  return res.json();
}

export async function fetchStaff() {
  const res = await fetch(`/api/staff`);
  return res.json();
}

export async function fetchSingleStaff(arg) {
  const res = await fetch(`/api/staff/${arg[0]}`);
  return res.json();
}

export async function fetchStockUsage() {
  const res = await fetch(`/api/fire-extinguisher-store/stock-usage`);
  return res.json();
}

export async function fetchSingleStockUsage(arg) {
  const res = await fetch(`/api/fire-extinguisher-store/stock-usage/${arg[0]}`);
  return res.json();
}

export async function fetchFinancialReport() {
  const res = await fetch(`/api/financial-report`);
  return res.json();
}

export async function fetchCylinerSales(arg) {
  const res = await fetch(
    `/api/financial-report/cylinder-sales?cylinderType=${arg[0]}&year=${arg[1]}`
  );
  return res.json();
}
