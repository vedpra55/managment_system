import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import React, { useRef } from "react";

export default function NewPartsStock() {
  const submitRef = useRef(null);
  const { createItem } = useApiHandler();

  const fields = [
    {
      name: "date",
      type: "date",
      placeholder: "Date",
      required: true,
    },
    {
      name: "spareType",
      type: "text",
      placeholder: "Spare Type",
      required: true,
    },
    {
      name: "size",
      type: "text",
      placeholder: "Size",
      required: true,
    },
    {
      name: "quantity",
      type: "number",
      placeholder: "Quantity",
      required: true,
    },
  ];

  async function handleSumbitForm(data) {
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    await createItem("/api/fire-extinguisher-store/parts-stock", item);
  }

  return (
    <>
      <Head>
        <title>New Parts Stock</title>
      </Head>
      <div className="my-container">
        <Form
          title={"Create Parts Stock"}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          fields={fields}
        />
      </div>
    </>
  );
}

NewPartsStock.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
