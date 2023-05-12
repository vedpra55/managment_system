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
import NumberDisplay from "@/components/NumberDisplay";

export default function CylinderStock() {
  const [filterData, setFilterData] = useState(null);
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
      field: "isEmpty",
      headerName: "Is Empty",
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

  const emptyColumns = [
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
      field: "isEmpty",
      headerName: "Is Empty",
      width: 150,
    },
    {
      field: "_id",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <ActionColumn
          handleDelete={handleDelete}
          href={`/cylinder-stock/${params.value}?isEmpty=true`}
          id={params.value}
        />
      ),
    },
  ];

  const labels = [
    "Total Stock",
    "Total Oxygen Stock",
    "Total Nitrogen Stock",
    "Total CO2 Stock",
    "Total Fire extinguisher Stock",
    "Total acetylene stock",
  ];

  async function handleDateFilter(toDate, fromDate) {
    const res = await fetch(
      `/api/cylinder-stock?toDate=${toDate}&fromDate=${fromDate}`
    );
    const json = await res.json();

    if (res.ok) {
      setFilterData(json?.cylinderStocks);
    }
  }

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

        <div className="mt-5 grid grid-cols-12 gap-5">
          {data?.amounts.map((item, i) => (
            <NumberDisplay title={labels[i]} amount={item} />
          ))}
          <NumberDisplay
            title={"Total Empty Stock"}
            amount={data?.emptyStocks?.length}
          />
        </div>

        <MyDataGrid
          title={"Cylinder Stocks"}
          columns={columns}
          data={filterData || data?.cylinderStocks}
          handleDateChange={handleDateFilter}
        />

        <MyDataGrid
          title={"Empty Cylinder Stocks"}
          columns={emptyColumns}
          data={data?.emptyStocks}
          handleDateChange={handleDateFilter}
        />
      </main>
    </>
  );
}

CylinderStock.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
