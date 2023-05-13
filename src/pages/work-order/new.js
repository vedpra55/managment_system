import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import React, { useRef, useState } from "react";

export default function NewWorkOrderPage() {
  const submitRef = useRef(null);
  const [invoice, setInvoice] = useState("No Invoice");
  const { createItem } = useApiHandler();

  const fields = [
    {
      name: "sNo",
      type: "text",
      placeholder: "S.No",
      required: false,
    },
    {
      name: "date",
      type: "date",
      placeholder: "Date",
      required: false,
    },
    {
      name: "orderType",
      type: "select",
      placeholder: "Order Type",
      required: false,
      values: ["Select", "SALE", "TESTING", "FILLING"],
    },
    {
      name: "cylinderType",
      type: "select",
      placeholder: "Cylinder Type",
      required: false,
      values: [
        "Select",
        "OXYGEN",
        "CO2",
        "NITROGEN",
        "acetylene",
        "FIREEXTINGUISHER",
      ],
    },
    {
      name: "cylinderNumber",
      type: "textArea",
      placeholder: "Cylinder Number",
      required: false,
      search: true,
    },
    {
      name: "quantity",
      type: "textArea",
      placeholder: "Quantity",
      required: false,
    },
    {
      name: "size",
      type: "select",
      placeholder: "Size",
      required: false,
      values: ["Select", "7 CBM", "2.5 CBM", "4.5 CBM", "6 CBM"],
    },
    {
      name: "partyType",
      type: "select",
      placeholder: "Party Type",
      required: false,
      values: ["Select", "PRIVATE", "GOVT", "SELF"],
    },
    {
      name: "partyDetails",
      type: "text",
      placeholder: "Party Details",
      required: false,
    },
    {
      name: "workOfStatus",
      type: "text",
      placeholder: "Work Status",
      values: ["Select", "IN PROGRESS", "HOLD", "PENDING", "COMPLETED"],
      required: false,
    },
    {
      name: "billAmount",
      type: "Number",
      placeholder: "Bill Amount",
      required: false,
    },
    {
      name: "invoice",
      type: "autoID",
      placeholder: "Invoice#",
    },
    {
      name: "invoiceDate",
      type: "date",
      placeholder: "Invoice Date",
      required: false,
    },
    {
      name: "modeOfPayment",
      placeholder: "Mode of Payment",
      required: false,
      values: ["UPI", "CASH", "CHEQE", "NEFT"],
    },
    {
      name: "paymentStatus",
      placeholder: "Payment Status",
      required: false,
      values: ["PENDING", "PARTIAL ", "DONE"],
    },
    {
      name: "dueDate",
      type: "date",
      placeholder: "Due Date",
      required: false,
      optional: true,
    },
    {
      name: "remark",
      type: "text",
      placeholder: "Remark",
      required: false,
    },
  ];

  async function handleSumbitForm(data) {
    const item = {
      ...data,
      invoice: invoice,
      date: data?.date ? new Date(data.date).toISOString() : "",
      invoiceDate: data?.invoiceDate
        ? new Date(data.invoiceDate).toISOString()
        : "",
      dueDate: data?.dueDate ? new Date(data.dueDate).toISOString() : "",
    };

    await createItem("/api/work-order", item);
  }

  return (
    <>
      <Head>
        <title>New Work Order</title>
      </Head>
      <div className="my-container">
        <Form
          title={"Create Work Order"}
          setInvoice={setInvoice}
          invoice={invoice}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          fields={fields}
          isInvoice
        />
      </div>
    </>
  );
}

NewWorkOrderPage.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
