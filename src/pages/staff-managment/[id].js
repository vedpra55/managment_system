import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import { fetchSingleStaff } from "@/service/apiCalls";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import useSwr from "swr";

export default function EditStaffManagment() {
  const router = useRouter();
  const submitRef = useRef(null);
  const { id } = router.query;
  const { data } = useSwr([id, "staff"], fetchSingleStaff);
  const { updateItem } = useApiHandler();

  if (!data) return;

  const addStaffField = [
    {
      name: "fullName",
      type: "text",
      minLength: 3,
      required: true,
      placeholder: "Full Name",
    },
    {
      name: "gender",
      type: "select",
      placeholder: "Gender",
      values: ["Men", "Women", "Other"],
    },
    {
      name: "phoneNumber",
      type: "Number",
      minLength: 10,
      required: true,
      placeholder: "Phone Number",
    },
    {
      name: "address",
      type: "text",
      minLength: 5,
      required: true,
      placeholder: "Address",
    },
  ];

  const ids = data?.staff?._id;
  async function handleSubmit(data) {
    await updateItem(`/api/staff/${ids}`, data);
  }

  return (
    <>
      <Head>
        <title>Edit Staff Managment</title>
      </Head>
      <main className="my-container">
        <Form
          title={"Edit Staff"}
          fields={addStaffField}
          handleSumbitForm={handleSubmit}
          submitRef={submitRef}
          defaultValues={data?.staff}
        />
      </main>
    </>
  );
}

EditStaffManagment.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
