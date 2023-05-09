import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import { fetchSingleProductPurchase } from "@/service/apiCalls";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import useSwr from "swr";

export default function EditProductPurchase() {
  const router = useRouter();
  const { id } = router.query;
  const submitRef = useRef(null);
  const { updateItem } = useApiHandler();

  const { data } = useSwr([id, "product-purchase"], fetchSingleProductPurchase);

  if (!data) return;

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

  const ids = data?.productPurchase?._id;
  async function handleSumbitForm(data) {
    console.log(data);
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    await updateItem(
      `/api/fire-extinguisher-store/product-purchase/${ids}`,
      item
    );
  }

  return (
    <>
      <Head>
        <title>Edit Product Purchase</title>
      </Head>
      <div className="my-container">
        <Form
          title={"Edit Product Purchase"}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          fields={fields}
          defaultValues={data?.productPurchase}
        />
      </div>
    </>
  );
}

EditProductPurchase.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
