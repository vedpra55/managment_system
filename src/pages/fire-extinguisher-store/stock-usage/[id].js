import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import useSwr from "swr";
import { useRef } from "react";
import { useRouter } from "next/router";
import { fetchSingleStockUsage } from "@/service/apiCalls";

export default function EditStockUsage() {
  const submiitRef = useRef(null);
  const { createItem } = useApiHandler();
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSwr([id, "stock-usage"], fetchSingleStockUsage);

  console.log(data);

  if (!data) return;

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
        <title>Edit Stock Usage</title>
      </Head>
      <main className="my-container">
        <Form
          title={"Edit Stock Usage"}
          fields={fields}
          submitRef={submiitRef}
          handleSumbitForm={handleSubmit}
          defaultValues={data?.sockUsage}
        />
      </main>
    </>
  );
}

EditStockUsage.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
