import LinkButton from "@/components/Button/button";
import Sidebar from "@/components/Sidebar/sidebar";
import { BiCylinder } from "react-icons/bi";
import Head from "next/head";
import React, { useState } from "react";
import useSwr from "swr";
import { fetchCylinderStocks } from "@/service/apiCalls";
import MyDataGrid from "@/components/Data Grid/datagrid";
import ActionColumn from "@/components/actionColumn";
import useApiHandler from "@/hooks/useApiHandler";

export default function CylinderStock() {
  const [reloadData, setReloadData] = useState(false);
  const { data } = useSwr(["cylinder-stock", reloadData], fetchCylinderStocks);
  const { deleteItem } = useApiHandler();

  async function handleDelete(id) {
    await deleteItem(`/api/cylinder-stock/${id}`);
    setReloadData(!reloadData);
  }

  const columns = [
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
      field: "size",
      headerName: "Size",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
    },
    {
      field: "cylinderNumber",
      headerName: "Cylinder Number",
      width: 150,
    },
    {
      field: "_id",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <ActionColumn
          handleDelete={handleDelete}
          href={`/cylinder-stock/${params.value}`}
          id={params.value}
        />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Cylinder Stock</title>
      </Head>
      <main className="my-container">
        <LinkButton
          href={"/cylinder-stock/new"}
          label={"New Cylinder Stock"}
          icon={<BiCylinder />}
        />
        <MyDataGrid
          title={"Cylinder Stocks"}
          columns={columns}
          data={data?.cylinderStocks}
        />
      </main>
    </>
  );
}

CylinderStock.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
