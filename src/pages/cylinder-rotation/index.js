import MyDataGrid from "@/components/Data Grid/datagrid";
import Sidebar from "@/components/Sidebar/sidebar";

import { fetchWorkOrderType } from "@/service/apiCalls";
import Head from "next/head";
import React from "react";
import useSwr from "swr";

export default function CylinderRotation() {
  const { data } = useSwr(["SALE"], fetchWorkOrderType);

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
  ];

  return (
    <>
      <Head>
        <title>Cylinder Rotation</title>
      </Head>
      <main className="my-container">
        <MyDataGrid
          title={"Cylinder Rotation"}
          columns={columns}
          data={data?.workOrders}
        />
      </main>
    </>
  );
}

CylinderRotation.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
