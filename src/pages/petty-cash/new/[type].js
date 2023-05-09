import useApiHandler from "@/hooks/useApiHandler";
import { useRouter } from "next/router";
import Form from "@/components/form";

import Head from "next/head";
import React, { useRef } from "react";
import Sidebar from "@/components/Sidebar/sidebar";

export default function NewPettyCash() {
  const submitRef = useRef(null);
  const router = useRouter();
  const { type } = router.query;

  const { createItem } = useApiHandler();

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
      name: "description",
      type: "text",
      placeholder: "Description",
      required: true,
    },
    {
      name: "remark",
      type: "text",
      placeholder: "Remark",
      required: true,
    },
    {
      name: "amount",
      type: "number",
      placeholder: "Amount",
      required: true,
    },
  ];

  async function handleSumbitForm(data) {
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
      cashType: type,
    };

    await createItem("/api/petty-cash", item);
  }

  return (
    <>
      <Head>
        <title>New Report Billing</title>
      </Head>
      <div className="my-container">
        <Form
          handleSumbitForm={handleSumbitForm}
          title={`New Petty Cash - ${type}`}
          fields={fields}
          submitRef={submitRef}
        />
      </div>
    </>
  );
}

NewPettyCash.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
