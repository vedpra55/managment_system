import LinkButton from "@/components/Button/button";
import MyDataGrid from "@/components/Data Grid/datagrid";
import Sidebar from "@/components/Sidebar/sidebar";
import ActionColumn from "@/components/actionColumn";
import useApiHandler from "@/hooks/useApiHandler";
import { fetchWorkOrderCategory } from "@/service/apiCalls";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiCylinder } from "react-icons/bi";
import useSwr from "swr";

export default function CylinderCategoryPage() {
  const router = useRouter();
  const [filterData, setFilterData] = useState(null);
  const { slug } = router.query;
  const [reloadData, setReloadData] = useState(false);
  const { data } = useSwr([slug, "work-order"], fetchWorkOrderCategory);

  const { deleteItem } = useApiHandler();

  async function handleDelete(id) {
    await deleteItem(`/api/work-order/${id}`);
    setReloadData(!reloadData);
  }

  const columns = [
    {
      field: "sNo",
      headerName: "S.NO",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
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
    { field: "orderType", headerName: "Order Type", width: 100 },
    { field: "cylinderType", headerName: "Cylinder Type", width: 120 },
    { field: "cylinderNumber", headerName: "Cylinder Number", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "size", headerName: "Size", width: 120 },
    { field: "partyType", headerName: "Party Type", width: 120 },
    { field: "partyDetails", headerName: "Party Details", width: 120 },
    { field: "workOfStatus", headerName: "Work Status", width: 120 },
    { field: "billAmount", headerName: "Bill Amount", width: 120 },
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
    { field: "invoice", headerName: "Invoice#", width: 120 },
    { field: "modeOfPayment", headerName: "Mode of Payment", width: 120 },
    { field: "paymentStatus", headerName: "Payment Status", width: 120 },
    { field: "remark", headerName: "Remark", width: 120 },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 150,
      renderCell: (params) => {
        const myDate = new Date(params.value);
        return (
          params.value && (
            <p>
              {myDate.getDate()}/{myDate.getUTCMonth() + 1}/
              {myDate.getFullYear()}
            </p>
          )
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
      `/api/work-order?category=${slug}&toDate=${toDate}&fromDate=${fromDate}`
    );
    const json = await res.json();

    if (res.ok) {
      setFilterData(json?.workOrders);
    }
  }

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <main className="my-container">
        <MyDataGrid
          title={`${slug} Work Order`}
          columns={columns}
          data={filterData || data?.workOrders}
          handleDateChange={handleDateFilter}
        />
      </main>
    </>
  );
}

CylinderCategoryPage.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
