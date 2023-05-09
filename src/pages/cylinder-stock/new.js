import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import React, { useRef } from "react";

export default function NewCylinderStock() {
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
      name: "size",
      type: "text",
      placeholder: "Size",
      required: true,
    },
    {
      name: "quantity",
      type: "Number",
      placeholder: "Quantity",
      required: true,
    },
    {
      name: "cylinderNumber",
      type: "Number",
      placeholder: "Cylinder Number",
      required: true,
    },
  ];

  async function handleSumbitForm(data) {
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    await createItem("/api/cylinder-stock", item);
  }

  return (
    <>
      <Head>
        <title>New Cylinder Stock</title>
      </Head>
      <main className="my-container">
        <Form
          title={"Create Cylinder Stock "}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          fields={fields}
        />
      </main>
    </>
  );
}

NewCylinderStock.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
