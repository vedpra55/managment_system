import LinkButton from "@/components/Button/button";
import Sidebar from "@/components/Sidebar/sidebar";
import Head from "next/head";
import { BsHddNetworkFill } from "react-icons/bs";
import React, { useState } from "react";
import useSwr from "swr";
import { fetchPettyCash } from "@/service/apiCalls";
import MyDataGrid from "@/components/Data Grid/datagrid";
import ActionColumn from "@/components/actionColumn";
import useApiHandler from "@/hooks/useApiHandler";

export default function PettyCash() {
  const [reloadData, setReloadData] = useState(false);
  const { data: cashIn } = useSwr(
    ["cash-in", "petty-cash", reloadData],
    fetchPettyCash
  );
  const { data: cashOut } = useSwr(
    ["cash-out", "petty-cash", reloadData],
    fetchPettyCash
  );

  const { deleteItem } = useApiHandler();

  async function handleDelete(id) {
    await deleteItem(`/api/petty-cash/${id}`);
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
      field: "remark",
      headerName: "Remark",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
    },
    {
      field: "_id",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <ActionColumn
          handleDelete={handleDelete}
          href={`/petty-cash/${params.value}`}
          id={params.value}
        />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Petty Cash</title>
      </Head>
      <main className="my-container">
        <div className="flex gap-x-10">
          <LinkButton
            w={"w-[16rem]"}
            icon={<BsHddNetworkFill />}
            label={"New Petty Cash - Cash In"}
            href={"/petty-cash/new/cash-in"}
          />
          <LinkButton
            w={"w-[17rem]"}
            icon={<BsHddNetworkFill />}
            label={"New Petty Cash - Cash Out"}
            href={"/petty-cash/new/cash-out"}
          />
        </div>
        <div className="mt-10 shadow-sm px-5 py-3 w-72 rounded-md border bg-white">
          <p className="font-semibold text-xl">
            Total Cash In : {cashIn?.amount}
          </p>
        </div>
        <MyDataGrid
          title={"Petty Cash - Cash In"}
          columns={columns}
          data={cashIn?.pettyCash}
        />
        <div className="mt-10 shadow-sm px-5 py-3 w-72 rounded-md border bg-white">
          <p className="font-semibold text-xl">
            Total Cash Out : {cashOut?.amount}
          </p>
        </div>
        <MyDataGrid
          title={"Petty Cash - Cash Out"}
          columns={columns}
          data={cashOut?.pettyCash}
        />
      </main>
    </>
  );
}

PettyCash.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
