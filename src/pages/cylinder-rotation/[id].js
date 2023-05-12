import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import useSwr from "swr";
import CylinderRotation from ".";
import Sidebar from "@/components/Sidebar/sidebar";
import { fetchSigleWorkOrder } from "@/service/apiCalls";

export default function EditCylinderRotation() {
  const router = useRouter();
  const { id } = router.query;
  const submitRef = useRef(null);
  const { updateItem } = useApiHandler();

  const { data } = useSwr([id, "work-order"], fetchSigleWorkOrder);

  const fields = [
    {
      name: "returnCylinderNumber",
      type: "textArea",
      placeholder: "Return Cylinder Number",
      required: false,
    },
    {
      name: "invoiceDate",
      type: "date",
      placeholder: "Invoice Date",
      required: false,
    },

    {
      name: "cylinderType",
      type: "select",
      placeholder: "Cylinder Type",
      required: false,
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
      name: "partyDetails",
      type: "text",
      placeholder: "Party Details",
      required: false,
    },
    {
      name: "remark",
      type: "text",
      placeholder: "Remark",
      required: false,
    },
  ];

  const ids = data?.workOrder._id;
  async function handleSumbitForm(data) {
    const item = {
      ...data,
      date: data.date ? new Date(data.date).toISOString() : "",
    };

    await updateItem(`/api/work-order/${ids}`, item);
  }

  return (
    <>
      <Head>
        <title>Edit Cylinder Rotation</title>
      </Head>
      <main className="my-container">
        <Form
          title={"Edit Cylinder Rotation"}
          submitRef={submitRef}
          handleSumbitForm={handleSumbitForm}
          fields={fields}
          defaultValues={data?.workOrder}
        />
      </main>
    </>
  );
}

EditCylinderRotation.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
