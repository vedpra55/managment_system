import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import React, { useRef } from "react";

export default function ReportBillingDetails() {
  const submitRef = useRef(null);
  const { createItem } = useApiHandler();

  const fileds = [
    {
      name: "sNo",
      type: "text",
      placeholder: "S.NO",
      required: true,
    },
    {
      name: "date",
      type: "date",
      placeholder: "Date",
      required: true,
    },
    {
      name: "cylinderType",
      type: "select",
      placeholder: "Cylinder Type",
      values: [
        "Select",
        "OXYGEN",
        "CO2",
        "NITROGEN",
        "acetylene",
        "FIREEXTINGUISHER",
      ],
      required: true,
    },
    {
      name: "description",
      type: "text",
      placeholder: "Description",
      required: true,
    },
    {
      name: "amount",
      type: "Number",
      placeholder: "Amount",
      required: true,
    },
    {
      name: "modeOfPayment",
      type: "select",
      placeholder: "Mode Of Payment",
      values: ["Select", "UPI", "CASH", "CHEQE", "NEFT"],
      required: true,
    },
    {
      name: "paymentStatus",
      type: "select",
      placeholder: "Payment Status",
      values: ["PAID", "HOLD", "PARTIAL"],
      required: true,
    },
    {
      name: "remark",
      type: "text",
      placeholder: "Remark",
      required: true,
    },
  ];

  async function handleSumbitForm(data) {
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    await createItem("/api/report-billing", item);
  }

  return (
    <>
      <Head>
        <title>New Report Billing</title>
      </Head>
      <div className="my-container">
        <Form
          handleSumbitForm={handleSumbitForm}
          title={"New Report Billing"}
          fields={fileds}
          submitRef={submitRef}
        />
      </div>
    </>
  );
}

ReportBillingDetails.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
