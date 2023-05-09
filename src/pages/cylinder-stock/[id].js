import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import { fetchSingleCylinderStock } from "@/service/apiCalls";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import useSwr from "swr";

export default function CylinderStockDetails() {
  const router = useRouter();
  const { id } = router.query;

  const submitRef = useRef(null);
  const { updateItem } = useApiHandler();

  const { data, isLoading } = useSwr(
    [id, "cylinder-stock"],
    fetchSingleCylinderStock
  );

  if (!data) return;

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

  const ids = data?.cylinderStock._id;
  async function handleSumbitForm(data) {
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    await updateItem(`/api/cylinder-stock/${ids}`, item);
  }

  return (
    <>
      <Head>
        <title>Cylinder Stock Edit</title>
      </Head>
      <main className="my-container">
        <Form
          title={"Edit Cylinder Stock"}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          fields={fields}
          defaultValues={data?.cylinderStock}
        />
      </main>
    </>
  );
}

CylinderStockDetails.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
