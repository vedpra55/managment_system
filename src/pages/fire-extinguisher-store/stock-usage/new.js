import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import { useRef } from "react";

export default function NewStockUsage() {
  const submiitRef = useRef(null);
  const { createItem } = useApiHandler();

  async function handleSubmit(data) {
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
    };
    await createItem("/api/fire-extinguisher-store/stock-usage", item);
  }

  const fields = [
    {
      name: "date",
      type: "date",
      placeholder: "Date",
      required: true,
    },
    {
      name: "product",
      type: "text",
      placeholder: "Product",
      required: true,
    },
    {
      name: "workOrder",
      type: "text",
      placeholder: "Work Order",
      required: true,
    },
  ];

  return (
    <>
      <Head>
        <title>New Stock Usage</title>
      </Head>
      <main className="my-container">
        <Form
          title={"New Stock Usage"}
          fields={fields}
          submitRef={submiitRef}
          handleSumbitForm={handleSubmit}
        />
      </main>
    </>
  );
}

NewStockUsage.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
