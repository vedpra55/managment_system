import Sidebar from "@/components/Sidebar/sidebar";
import { fetchReportBilling } from "@/service/apiCalls";
import React, { useState } from "react";
import useSwr from "swr";
import { BsHddNetworkFill } from "react-icons/bs";
import LinkButton from "@/components/Button/button";
import DataGrid from "@/components/Data Grid/datagrid";
import ActionColumn from "@/components/actionColumn";
import Head from "next/head";
import useApiHandler from "@/hooks/useApiHandler";

export default function ReportBilling() {
  const [reloadData, setReloadData] = useState(false);
  const { data } = useSwr(["report-billing", reloadData], fetchReportBilling);

  const { deleteItem } = useApiHandler();

  async function handleDelete(id) {
    await deleteItem(`/api/report-billing/${id}`);
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
    {
      field: "cylinderType",
      headerName: "Cylinder Type",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
    },
    {
      field: "modeOfPayment",
      headerName: "Mode Of Payment",
      width: 150,
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 150,
    },
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
          href={`/report-billing/${params.value}`}
          id={params.value}
        />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Report Billing</title>
      </Head>
      <div className="my-container ">
        <LinkButton
          href={"/report-billing/new"}
          label={"New Report Billing"}
          icon={<BsHddNetworkFill />}
        />

        <DataGrid
          title={"Report Billing"}
          columns={columns}
          data={data?.reportBilling}
        />
      </div>
    </>
  );
}

ReportBilling.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
