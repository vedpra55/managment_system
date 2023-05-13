import MyDataGrid from "@/components/Data Grid/datagrid";
import Sidebar from "@/components/Sidebar/sidebar";
import ActionColumn from "@/components/actionColumn";
import useApiHandler from "@/hooks/useApiHandler";
import { fetchWorkOrder } from "@/service/apiCalls";
import Head from "next/head";
import React, { useState } from "react";
import useSwr from "swr";

export default function PaymentTracking() {
  const [reloadData, setReloadData] = useState(false);
  const { data } = useSwr(["work-order", reloadData], fetchWorkOrder);
  const [filterData, setFilterData] = useState(null);
  const { deleteItem } = useApiHandler();

  async function handleDelete(id) {
    await deleteItem(`/api/work-order/${id}`);
    setReloadData(!reloadData);
  }

  const columns = [
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      width: 120,
      renderCell: (params) => {
        const myDate = new Date(params.value);
        return (
          <p>
            {myDate.getDate()}/{myDate.getUTCMonth() + 1}/{myDate.getFullYear()}
          </p>
        );
      },
    },
    { field: "orderType", headerName: "Order Type", width: 100 },
    { field: "cylinderType", headerName: "Cylinder Type", width: 120 },
    { field: "partyType", headerName: "Party Type", width: 120 },
    { field: "paymentStatus", headerName: "Payment Status", width: 120 },
    { field: "invoice", headerName: "Invoice#", width: 120 },
    { field: "partyDetails", headerName: "Party Details", width: 120 },
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
      width: 250,
      renderCell: (params) => (
        <ActionColumn
          handleDelete={handleDelete}
          href={`/work-order/${params.value}`}
          id={params.value}
        />
      ),
    },
  ];

  async function handleDateFilter(toDate, fromDate) {
    const res = await fetch(
      `/api/work-order?toDate=${toDate}&fromDate=${fromDate}`
    );
    const json = await res.json();

    if (res.ok) {
      setFilterData(json?.workOrders);
    }
  }

  return (
    <>
      <Head>
        <title>Payment Tracking</title>
      </Head>
      <div className="my-container ">
        <MyDataGrid
          title={"Payment Tracking"}
          columns={columns}
          data={filterData || data?.workOrders}
          handleDateChange={handleDateFilter}
        />
      </div>
    </>
  );
}

PaymentTracking.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
