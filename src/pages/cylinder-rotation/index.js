import MyDataGrid from "@/components/Data Grid/datagrid";
import Sidebar from "@/components/Sidebar/sidebar";
import ActionColumn from "@/components/actionColumn";

import { fetchWorkOrderType } from "@/service/apiCalls";
import Head from "next/head";
import React, { useState } from "react";
import useSwr from "swr";

export default function CylinderRotation() {
  const { data } = useSwr(["SALE"], fetchWorkOrderType);
  const [filterData, setFilterData] = useState(null);

  const columns = [
    {
      field: "invoiceDate",
      headerName: "Invoie Date",
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
      field: "cylinderType",
      headerName: "Cylinder Type",
      width: 150,
    },
    {
      field: "cylinderNumber",
      headerName: "Cylinder Number",
      width: 150,
    },
    {
      field: "partyDetails",
      headerName: "Party Details",
      width: 150,
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 150,
    },
    {
      field: "returnCylinderNumber",
      headerName: "Return Cylinder Number",
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
          hideDelete={true}
        />
      ),
    },
  ];

  async function handleDateFilter(toDate, fromDate) {
    const res = await fetch(
      `/api/work-order?toDate=${toDate}&fromDate=${fromDate}&orderType=SALE`
    );
    const json = await res.json();

    if (res.ok) {
      setFilterData(json?.workOrders);
    }
  }

  return (
    <>
      <Head>
        <title>Cylinder Rotation</title>
      </Head>
      <main className="my-container">
        <MyDataGrid
          title={"Cylinder Rotation"}
          mt={"mt-0"}
          columns={columns}
          data={filterData || data?.workOrders}
          handleDateChange={handleDateFilter}
        />
      </main>
    </>
  );
}

CylinderRotation.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
