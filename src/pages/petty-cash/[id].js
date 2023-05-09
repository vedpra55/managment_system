import Sidebar from "@/components/Sidebar/sidebar";
import { fetchSigleWorkOrder, fetchSinglePettyCash } from "@/service/apiCalls";
import { useRouter } from "next/router";
import useSwr from "swr";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import React, { useRef, useState } from "react";
import Form from "@/components/form";

export default function PettyCashEdit() {
  const router = useRouter();
  const { id } = router.query;
  const submitRef = useRef(null);

  const { updateItem } = useApiHandler();

  const { data } = useSwr([id, "petty-cash"], fetchSinglePettyCash);

  if (!data) return;

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

  const ids = data?.pettyCash._id;
  async function handleSumbitForm(data) {
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    await updateItem(`/api/petty-cash/${ids}`, item);
  }

  return (
    <>
      <Head>
        <title>Petty Cash Edit</title>
      </Head>
      <main className="my-container">
        <Form
          title={"Petty Cash Edit"}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          fields={fields}
          defaultValues={data?.pettyCash}
        />
      </main>
    </>
  );
}

PettyCashEdit.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
