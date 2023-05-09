import Sidebar from "@/components/Sidebar/sidebar";
import { fetchSigleWorkOrder } from "@/service/apiCalls";
import { useRouter } from "next/router";
import useSwr from "swr";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Form from "@/components/form";

export default function WorkOrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const submitRef = useRef(null);

  const { updateItem } = useApiHandler();

  const { data } = useSwr([id, "work-order"], fetchSigleWorkOrder);
  const [invoice, setInvoice] = useState(data?.workOrder?.invoice);

  useEffect(() => {
    setInvoice(data?.workOrder?.invoice);
  }, [data]);

  if (!data) return;

  const fields = [
    {
      name: "sNo",
      type: "text",
      placeholder: "S.No",
      required: true,
    },
    {
      name: "date",
      type: "date",
      placeholder: "Date",
      required: true,
    },
    {
      name: "orderType",
      type: "select",
      placeholder: "Order Type",
      required: true,
      values: ["Select", "SALE", "TESTING", "FILLING"],
    },
    {
      name: "cylinderType",
      type: "select",
      placeholder: "Cylinder Type",
      required: true,
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
      type: "number",
      placeholder: "Cylinder Number",
      required: true,
    },
    {
      name: "quantity",
      type: "number",
      placeholder: "Quantity",
      required: true,
    },
    {
      name: "size",
      type: "select",
      placeholder: "Size",
      required: true,
      values: ["Select", "7 CBM", "2.5 CBM", "4.5 CBM", "6 CBM"],
    },
    {
      name: "partyType",
      type: "select",
      placeholder: "Party Type",
      required: true,
      values: ["Select", "PRIVATE", "GOVT", "SELF"],
    },
    {
      name: "partyDetails",
      type: "text",
      placeholder: "Party Details",
      required: true,
    },
    {
      name: "workOfStatus",
      type: "text",
      placeholder: "Work Status",
      values: ["Select", "IN PROGRESS", "HOLD", "PENDING", "COMPLETED"],
      required: true,
    },
    {
      name: "billAmount",
      type: "Number",
      placeholder: "Bill Amount",
      required: true,
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
      required: true,
    },
    {
      name: "modeOfPayment",
      placeholder: "Mode of Payment",
      required: true,
      values: ["Select", "UPI", "CASH", "CHEQE", "NEFT"],
    },
    {
      name: "paymentStatus",
      placeholder: "Payment Status",
      required: true,
      values: ["Select", "PENDING", "DONE"],
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

  const ids = data.workOrder._id;
  async function handleSumbitForm(data) {
    const item = {
      ...data,
      invoice: invoice,
      date: new Date(data.date).toISOString(),
      invoiceDate: new Date(data.invoiceDate).toISOString(),
      dueDate: data?.dueDate ? new Date(data.dueDate).toISOString() : "",
    };

    await updateItem(`/api/work-order/${ids}`, item);
  }

  return (
    <>
      <Head>
        <title>Work Order Edit</title>
      </Head>
      <main className="my-container">
        <Form
          title={"Edit Work Order"}
          setInvoice={setInvoice}
          invoice={invoice}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          fields={fields}
          isInvoice
          defaultValues={data?.workOrder}
        />
      </main>
    </>
  );
}

WorkOrderDetails.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
