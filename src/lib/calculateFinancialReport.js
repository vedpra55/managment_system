import PettyCash from "@/models/pettyCash";
import ProductPurchase from "@/models/productPurchase";
import ReportBilling from "@/models/reportBilling";
import WorkOrder from "@/models/workOrder";

export async function CalculateAmounts() {
  const workOrderAmounts = await WorkOrder.find({}).select("billAmount");
  const reportBillingAmounts = await ReportBilling.find({}).select("amount");
  const pettyCashAmounts = await PettyCash.find({}).select("amount");
  const productPurchaseAmounts = await ProductPurchase.find({}).select(
    "amount"
  );

  let totalSales = 0;

  for (let i = 0; i < workOrderAmounts.length; i++) {
    totalSales += parseFloat(workOrderAmounts[i].billAmount);
  }

  let totalExpense = 0;

  for (let i = 0; i < reportBillingAmounts.length; i++) {
    totalExpense += parseFloat(reportBillingAmounts[i].amount);
  }

  let totalPettyCash = 0;

  for (let i = 0; i < pettyCashAmounts.length; i++) {
    totalPettyCash += parseFloat(pettyCashAmounts[i].amount);
  }

  let totalPurchase = 0;

  for (let i = 0; i < productPurchaseAmounts.length; i++) {
    totalPurchase += parseFloat(productPurchaseAmounts[i].amount);
  }

  return {
    totalExpense,
    totalSales,
    totalPurchase,
    totalPettyCash,
  };
}

export async function CalculateCylinderAmounts() {
  const {
    totalCo2Filling,
    totalCo2Sales,
    totalFeFilling,
    totalFeSales,
    totalFeTesting,
    totalNirogenFilling,
    totalNitrogenSales,
    totalOxygenFilling,
    totalOxygenSales,
    totalAcetyleFilling,
    totalAcetyleSales,

    oxygenSales,
    nitrogenSales,
    acetyleSales,
    co2Sales,
    fireExtinguisherSales,
  } = await CylinderA();

  const {
    totalAcetyleExpense,
    totalCo2Expense,
    totalNitogenExpense,
    totalOxygenExpense,
    totalfireExtinguisherExpense,
  } = await CylinderExpenses();

  const {
    totalAcetylePettyCash,
    totalCo2PettyCash,
    totalNitrogenPettyCash,
    totalOxygenPettyCash,
    totalfireExtinguisherPettyCash,
  } = await CylinderPettyCash();

  const totalPurchase = await fireExtinguisherPurchase();

  let oxygen =
    totalOxygenSales +
    totalOxygenFilling -
    (totalOxygenExpense + parseFloat(totalOxygenPettyCash));

  let nitrogen =
    totalNitrogenSales +
    totalNirogenFilling -
    (totalNitogenExpense + parseFloat(totalNitrogenPettyCash));

  let acetyle =
    totalAcetyleSales +
    totalAcetyleFilling -
    (totalAcetyleExpense + parseFloat(totalAcetylePettyCash));

  let co2 =
    totalCo2Sales +
    totalCo2Filling -
    (totalCo2Expense + parseFloat(totalCo2PettyCash));

  let fireExtinguisher =
    totalFeFilling +
    totalFeSales +
    totalFeTesting -
    (totalPurchase +
      parseFloat(totalfireExtinguisherPettyCash) +
      totalfireExtinguisherExpense);

  return {
    oxygen,
    nitrogen,
    co2,
    acetyle,
    fireExtinguisher,

    oxygenSales,
    nitrogenSales,
    acetyleSales,
    co2Sales,
    fireExtinguisherSales,
  };
}

async function CylinderA() {
  const oxygenSales = await WorkOrder.find({
    cylinderType: "OXYGEN",
    orderType: "SALE",
  }).select("billAmount");

  const oxygenFilling = await WorkOrder.find({
    cylinderType: "OXYGEN",
    orderType: "FILLING",
  }).select("billAmount");

  const nitrogenSales = await WorkOrder.find({
    cylinderType: "NITROGEN",
    orderType: "SALE",
  }).select("billAmount");

  const nitrogenFilling = await WorkOrder.find({
    cylinderType: "NITROGEN",
    orderType: "FILLING",
  }).select("billAmount");

  const acetyleSales = await WorkOrder.find({
    cylinderType: "acetylene",
    orderType: "SALE",
  }).select("billAmount");

  const acetyleFilling = await WorkOrder.find({
    cylinderType: "acetylene",
    orderType: "FILLING",
  }).select("billAmount");

  const co2Sales = await WorkOrder.find({
    cylinderType: "CO2",
    orderType: "SALE",
  }).select("billAmount");

  const co2Filling = await WorkOrder.find({
    cylinderType: "CO2",
    orderType: "FILLING",
  }).select("billAmount");

  const fireExtinguisherSales = await WorkOrder.find({
    cylinderType: "FIREEXTINGUISHER",
    orderType: "SALE",
  }).select("billAmount");

  const fireExtinguisherFilling = await WorkOrder.find({
    cylinderType: "FIREEXTINGUISHER",
    orderType: "FILLING",
  }).select("billAmount");

  const fireExtinguisherTesting = await WorkOrder.find({
    cylinderType: "FIREEXTINGUISHER",
    orderType: "TESTING",
  }).select("billAmount");

  let totalOxygenSales = 0;

  for (let i = 0; i < oxygenSales.length; i++) {
    totalOxygenSales += parseFloat(oxygenSales[i].billAmount);
  }

  let totalOxygenFilling = 0;

  for (let i = 0; i < oxygenFilling.length; i++) {
    totalOxygenFilling += parseFloat(oxygenFilling[i].billAmount);
  }

  let totalNitrogenSales = 0;

  for (let i = 0; i < nitrogenSales.length; i++) {
    totalNitrogenSales += parseFloat(nitrogenSales[i].billAmount);
  }

  let totalNirogenFilling = 0;

  for (let i = 0; i < nitrogenFilling.length; i++) {
    totalNirogenFilling += parseFloat(nitrogenFilling[i].billAmount);
  }

  let totalCo2Sales = 0;

  for (let i = 0; i < co2Sales.length; i++) {
    totalCo2Sales += parseFloat(co2Sales[i].billAmount);
  }

  let totalCo2Filling = 0;

  for (let i = 0; i < co2Filling.length; i++) {
    totalCo2Filling += parseFloat(co2Filling[i].billAmount);
  }

  let totalAcetyleSales = 0;

  for (let i = 0; i < acetyleSales.length; i++) {
    totalAcetyleSales += parseFloat(acetyleSales[i].billAmount);
  }

  let totalAcetyleFilling = 0;

  for (let i = 0; i < acetyleFilling.length; i++) {
    totalAcetyleFilling += parseFloat(acetyleFilling[i].billAmount);
  }

  let totalFeSales = 0;

  for (let i = 0; i < fireExtinguisherSales.length; i++) {
    totalFeSales += parseFloat(fireExtinguisherSales[i].billAmount);
  }

  let totalFeFilling = 0;

  for (let i = 0; i < fireExtinguisherFilling.length; i++) {
    totalFeFilling += parseFloat(fireExtinguisherFilling[i].billAmount);
  }

  let totalFeTesting = 0;

  for (let i = 0; i < fireExtinguisherTesting.length; i++) {
    totalFeTesting += parseFloat(fireExtinguisherTesting[i].billAmount);
  }

  return {
    totalOxygenFilling,
    totalOxygenSales,
    totalNirogenFilling,
    totalNitrogenSales,
    acetyleFilling,
    acetyleSales,
    totalFeFilling,
    totalFeSales,
    totalFeTesting,
    totalCo2Filling,
    totalCo2Sales,
    totalAcetyleFilling,
    totalAcetyleSales,

    oxygenSales,
    nitrogenSales,
    acetyleSales,
    co2Sales,
    fireExtinguisherSales,
  };
}

async function CylinderExpenses() {
  const oxygenExpense = await ReportBilling.find({
    cylinderType: "OXYGEN",
  }).select("amount");

  let totalOxygenExpense = 0;

  for (let i = 0; i < oxygenExpense.length; i++) {
    totalOxygenExpense += oxygenExpense[i].amount;
  }

  const nitrogenExpense = await ReportBilling.find({
    cylinderType: "NITROGEN",
  }).select("amount");

  let totalNitogenExpense = 0;

  for (let i = 0; i < nitrogenExpense.length; i++) {
    totalNitogenExpense += nitrogenExpense[i].amount;
  }

  const acetyleExpense = await ReportBilling.find({
    cylinderType: "acetylene",
  }).select("amount");

  let totalAcetyleExpense = 0;

  for (let i = 0; i < acetyleExpense.length; i++) {
    totalAcetyleExpense += acetyleExpense[i].amount;
  }

  const fireExtinguisherExpense = await ReportBilling.find({
    cylinderType: "FIREEXTINGUISHER",
  }).select("amount");

  let totalfireExtinguisherExpense = 0;

  for (let i = 0; i < fireExtinguisherExpense.length; i++) {
    totalfireExtinguisherExpense += fireExtinguisherExpense[i].amount;
  }

  const co2Expense = await ReportBilling.find({
    cylinderType: "CO2",
  }).select("amount");

  let totalCo2Expense = 0;

  for (let i = 0; i < co2Expense.length; i++) {
    totalCo2Expense += co2Expense[i].amount;
  }

  return {
    totalAcetyleExpense,
    totalCo2Expense,
    totalNitogenExpense,
    totalOxygenExpense,
    totalfireExtinguisherExpense,
  };
}

async function CylinderPettyCash() {
  const oxygenPettyCash = await PettyCash.find({
    cashType: "cashOut",
    cylinderType: "OXYGEN",
  }).select("amount");

  let totalOxygenPettyCash = 0;

  for (let i = 0; i < oxygenPettyCash.length; i++) {
    totalOxygenPettyCash += parseFloat(oxygenPettyCash[i].amount);
  }

  const nitrogenPettyCash = await PettyCash.find({
    cashType: "cashOut",
    cylinderType: "NITROGEN",
  }).select("amount");

  let totalNitrogenPettyCash = 0;

  for (let i = 0; i < nitrogenPettyCash.length; i++) {
    totalNitrogenPettyCash += parseFloat(nitrogenPettyCash[i].amount);
  }

  const co2PettyCash = await PettyCash.find({
    cashType: "cashOut",
    cylinderType: "CO2",
  }).select("amount");

  let totalCo2PettyCash = 0;

  for (let i = 0; i < co2PettyCash.length; i++) {
    totalCo2PettyCash += parseFloat(co2PettyCash[i].amount);
  }

  const acetylePettyCash = await PettyCash.find({
    cashType: "cashOut",
    cylinderType: "acetylene",
  }).select("amount");

  let totalAcetylePettyCash = 0;

  for (let i = 0; i < acetylePettyCash.length; i++) {
    totalAcetylePettyCash += parseFloat(acetylePettyCash[i].amount);
  }

  const fireExtinguisherPettyCash = await PettyCash.find({
    cashType: "cashOut",
    cylinderType: "FIREEXTINGUISHER",
  }).select("amount");

  let totalfireExtinguisherPettyCash = 0;

  for (let i = 0; i < fireExtinguisherPettyCash.length; i++) {
    totalfireExtinguisherPettyCash += parseFloat(
      fireExtinguisherPettyCash[i].amount
    );
  }

  return {
    totalAcetylePettyCash,
    totalCo2PettyCash,
    totalNitrogenPettyCash,
    totalOxygenPettyCash,
    totalfireExtinguisherPettyCash,
  };
}

async function fireExtinguisherPurchase() {
  const purchase = await ProductPurchase.find({
    cylinderType: "FIREEXTINGUISHER",
  }).select("amount");

  let totalPurchase = 0;

  for (let i = 0; i < purchase.length; i++) {
    totalPurchase += parseFloat(purchase[i].amount);
  }

  return totalPurchase;
}
