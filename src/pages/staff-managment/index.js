import LinkButton from "@/components/Button/button";
import MyDataGrid from "@/components/Data Grid/datagrid";
import Sidebar from "@/components/Sidebar/sidebar";
import ActionColumn from "@/components/actionColumn";
import useApiHandler from "@/hooks/useApiHandler";
import { fetchStaff } from "@/service/apiCalls";
import Head from "next/head";
import React, { useState } from "react";
import { BsHddNetworkFill } from "react-icons/bs";
import useSwr from "swr";

export default function StaffManagment() {
  const [reload, setReload] = useState(false);
  const { data } = useSwr(["staffs", reload], fetchStaff);
  const [filterData, setFilterData] = useState(null);
  const { deleteItem } = useApiHandler();

  async function handleDelete(id) {
    await deleteItem(`/api/staff/${id}`);
    setReload(!reload);
  }

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
    },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
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
      field: "_id",
      headerName: "Action",
      width: 400,
      renderCell: (params) => (
        <ActionColumn
          handleDelete={handleDelete}
          href={`/staff-managment/${params.value}`}
          id={params.value}
        />
      ),
    },
  ];

  async function handleDateFilter(toDate, fromDate) {
    const res = await fetch(`/api/staff?toDate=${toDate}&fromDate=${fromDate}`);
    const json = await res.json();

    if (res.ok) {
      setFilterData(json?.staffs);
    }
  }

  return (
    <>
      <Head>
        <title>Staff Managment</title>
      </Head>
      <main className="my-container">
        <LinkButton
          w={"w-40"}
          icon={<BsHddNetworkFill />}
          label={"New Staff"}
          href={"/staff-managment/new"}
        />
        <MyDataGrid
          title={"Staff Managment"}
          columns={columns}
          data={filterData || data?.staffs}
          handleDateChange={handleDateFilter}
        />
      </main>
    </>
  );
}

StaffManagment.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
