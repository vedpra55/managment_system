import MyDataGrid from "@/components/Data Grid/datagrid";
import Sidebar from "@/components/Sidebar/sidebar";
import ActionColumn from "@/components/actionColumn";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";
import useAuth from "@/hooks/useAuth";
import { fetchUsers } from "@/service/apiCalls";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import useSwr from "swr";

export default function Account() {
  const submitRef = useRef(null);
  const [reload, setReload] = useState(false);
  const { createItem, deleteItem } = useApiHandler();

  const { data: users } = useSwr(["users", reload], fetchUsers);

  const { checkRole, data } = useAuth();

  useEffect(() => {
    checkRole("account");
  }, [data]);

  async function handleDelete(id) {
    await deleteItem(`/api/auth/${id}`);
    setReload(!reload);
  }

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
    },
    {
      name: "phoneNumber",
      type: "Number",
      placeholder: "Phone Number",
    },
    {
      name: "email",
      type: "email",
      required: true,
      placeholder: "Email",
    },
    {
      name: "password",
      type: "text",
      minLength: 1,
      required: true,
      placeholder: "Password",
    },
    {
      name: "position",
      type: "text",
      minLength: 1,
      placeholder: "Position",
    },
    {
      name: "department",
      type: "text",
      minLength: 1,
      placeholder: "Department",
    },
    {
      name: "role",
      type: "select",
      values: ["owner", "manager", "assistant-manager"],
      placeholder: "Role",
    },
  ];

  const columns = [
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      renderCell: (params) => {
        const myDate = new Date(params.value);
        return (
          <p>
            {myDate.getDate()}/{myDate.getUTCMonth() + 1}/{myDate.getFullYear()}
          </p>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "position",
      headerName: "Position",
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
    },
    {
      field: "_id",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <ActionColumn
          href={`/cylinder-rotation/${params.value}`}
          id={params.value}
          hideEdit={true}
          handleDelete={handleDelete}
        />
      ),
    },
  ];

  async function handleSumbitForm(data) {
    const item = {
      ...data,
    };
    await createItem("/api/auth/signup", item);

    setReload(!reload);
  }

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <main className="my-container">
        <div className="mb-10">
          <MyDataGrid
            mt={"mt-0"}
            hideDate={true}
            title={"Users"}
            columns={columns}
            data={users?.users}
          />
        </div>
        <Form
          fields={fields}
          handleSumbitForm={handleSumbitForm}
          title={"Create Account"}
          submitRef={submitRef}
        />
      </main>
    </>
  );
}

Account.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
