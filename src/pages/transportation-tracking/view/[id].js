import MyDataGrid from "@/components/Data Grid/datagrid";
import Sidebar from "@/components/Sidebar/sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSwr from "swr";

export default function ViewTrackingData() {
  const router = useRouter();
  const { id } = router.query;
  const [loadData, setLoadData] = useState("");

  async function fetchSingleUnTransportationTracking() {
    const res = await fetch(`/api/transportation-tracking/${id}`);
    return res.json();
  }

  const { data, isLoading } = useSwr(
    [id, "unCom-tracking-single", loadData],
    fetchSingleUnTransportationTracking
  );

  if (!data) return;

  console.log(data);

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
    {
      field: "cylinderType",
      headerName: "Cylinder Type",
      width: 150,
    },
    {
      field: "agentPortBlair",
      headerName: "Agent Port Balir",
      width: 150,
    },
    {
      field: "agentChennai",
      headerName: "Agent Chennai",
      width: 150,
    },
    {
      field: "ewayBill",
      headerName: "Eway Bill",
      width: 150,
    },
    {
      field: "tcl",
      headerName: "Tcl",
      width: 150,
    },
  ];

  const createdAt = new Date(data?.tracking.createdAt);

  return (
    <>
      <Head>
        <title>View Tracking</title>
      </Head>
      <main className="my-container">
        <div className="flex flex-col gap-y-2 font-medium">
          <p>
            Created At : {createdAt.getDate()} / {createdAt.getUTCMonth() + 1} /{" "}
            {createdAt.getFullYear()}
          </p>
          <p>Filling Status : {data?.tracking.fillingStatus && "Filled"}</p>
          <p>Received Status : {data?.tracking.receivedStatus && "Received"}</p>
        </div>
        <MyDataGrid
          columns={columns}
          title={"Tracking From Port Blair"}
          data={[data?.fromPortBlair]}
        />
        <MyDataGrid
          columns={columns}
          title={"Tracking From Chennai"}
          data={[data?.fromChennai]}
        />
      </main>
    </>
  );
}

ViewTrackingData.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
