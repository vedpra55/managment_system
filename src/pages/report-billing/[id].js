import React, { useRef } from "react";
import ReportBilling from ".";
import Sidebar from "@/components/Sidebar/sidebar";
import useSwr from "swr";
import { useRouter } from "next/router";
import { fetchSingleReportBilling } from "@/service/apiCalls";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import Form from "@/components/form";

export default function EditReportBilling() {
  const submitRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSwr([id, "report-billing"], fetchSingleReportBilling);
  const { updateItem } = useApiHandler();

  const fields = [
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
      values: ["PAID", "HOLD", "PARTIALLY PAID"],
      required: true,
    },
    {
      name: "remark",
      type: "text",
      placeholder: "Remark",
      required: true,
    },
  ];

  if (!data) return;

  const ids = data?.reportBilling._id;
  async function handleSumbitForm(data) {
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    await updateItem(`/api/report-billing/${ids}`, item);
  }

  return (
    <>
      <Head>
        <title>Edit Report Billing</title>
      </Head>
      <main className="my-container">
        <Form
          title={"Edit Report Billing"}
          fields={fields}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          defaultValues={data?.reportBilling}
        />
      </main>
    </>
  );
}

EditReportBilling.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
