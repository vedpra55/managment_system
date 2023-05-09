import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import { fetchSinglePartStock } from "@/service/apiCalls";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import useSwr from "swr";

export default function EditPartStocks() {
  const router = useRouter();
  const { id } = router.query;
  const submitRef = useRef(null);
  const { updateItem } = useApiHandler();

  const { data } = useSwr([id, "part-stocks"], fetchSinglePartStock);

  if (!data) return;

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

  const ids = data?.partStock?._id;
  async function handleSumbitForm(data) {
    console.log(data);
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    await updateItem(`/api/fire-extinguisher-store/parts-stock/${ids}`, item);
  }

  return (
    <>
      <Head>
        <title>Edit Parts Stock</title>
      </Head>
      <div className="my-container">
        <Form
          title={"Edit Parts Stock"}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          fields={fields}
          defaultValues={data?.partStock}
        />
      </div>
    </>
  );
}

EditPartStocks.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
