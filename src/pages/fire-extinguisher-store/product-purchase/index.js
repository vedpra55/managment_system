import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import React, { useRef } from "react";

export default function AddProductPurchase() {
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
      name: "spareItem",
      type: "text",
      placeholder: "Spare Item",
      required: true,
    },

    {
      name: "quantity",
      type: "number",
      placeholder: "Quantity",
      required: true,
    },
    {
      name: "supplier",
      type: "text",
      placeholder: "Supplier",
      required: true,
    },
    {
      name: "amount",
      type: "Number",
      placeholder: "Amount",
      required: true,
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      required: true,
      values: ["Placed", "In Transit", "Pending", "Received"],
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

    await createItem("/api/fire-extinguisher-store/product-purchase", item);
  }

  return (
    <>
      <Head>
        <title>New Product Purchase</title>
      </Head>
      <div className="my-container">
        <Form
          title={"Create Product Purchase"}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          fields={fields}
        />
      </div>
    </>
  );
}

AddProductPurchase.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
