import Sidebar from "@/components/Sidebar/sidebar";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import Head from "next/head";
import { useRef } from "react";

export default function AddStaffManagment() {
  const submitRef = useRef(null);
  const { createItem } = useApiHandler();

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

  async function handleSumbitForm(data) {
    const staffItem = {
      ...data,
    };

    await createItem("/api/staff", staffItem);
  }

  return (
    <>
      <Head>
        <title>Add Staff</title>
      </Head>
      <main className="my-container">
        <Form
          title={"Add Staff"}
          fields={addStaffField}
          handleSumbitForm={handleSumbitForm}
          submitRef={submitRef}
        />
      </main>
    </>
  );
}

AddStaffManagment.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
