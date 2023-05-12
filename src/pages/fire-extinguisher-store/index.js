import LinkButton from "@/components/Button/button";
import MyDataGrid from "@/components/Data Grid/datagrid";
import Sidebar from "@/components/Sidebar/sidebar";
import ActionColumn from "@/components/actionColumn";
import useApiHandler from "@/hooks/useApiHandler";
import {
  fetchPartsStocks,
  fetchProductPurchase,
  fetchStockUsage,
} from "@/service/apiCalls";
import Head from "next/head";
import React, { useState } from "react";
import { BsHddNetworkFill } from "react-icons/bs";
import useSwr from "swr";

export default function FireExtinguisherStore() {
  const [reload1, setReload1] = useState(false);
  const [reload2, setReload2] = useState(false);
  const [reload3, setReload3] = useState(false);
  const { data: partStocks } = useSwr(
    ["parts-stock", reload1],
    fetchPartsStocks
  );
  const { data: productPurchase } = useSwr(
    ["product-purchase", reload2],
    fetchProductPurchase
  );

  const { data: stockUsage } = useSwr(
    ["stock-usage", reload3],
    fetchStockUsage
  );

  const { deleteItem } = useApiHandler();

  async function handleDeleteParts(id) {
    await deleteItem(`/api/fire-extinguisher-store/parts-stock/${id}`);
    setReload1(!reload1);
  }

  async function handleDeleteProduct(id) {
    await deleteItem(`/api/fire-extinguisher-store/product-purchase/${id}`);
    setReload2(!reload2);
  }

  async function handleDeleteStock(id) {
    await deleteItem(`/api/fire-extinguisher-store/stock-usage/${id}`);
    setReload3(!reload3);
  }

  const partColumns = [
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
      field: "spareType",
      headerName: "Spare Type",
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
      field: "_id",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <ActionColumn
          handleDelete={handleDeleteParts}
          href={`/fire-extinguisher-store/parts-stock/${params.value}`}
          id={params.value}
        />
      ),
    },
  ];

  const productPurchaseColumns = [
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
      field: "spareItem",
      headerName: "Spare Item",
      width: 150,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 150,
    },
    {
      field: "_id",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <ActionColumn
          handleDelete={handleDeleteProduct}
          href={`/fire-extinguisher-store/product-purchase/${params.value}`}
          id={params.value}
        />
      ),
    },
  ];

  const stockUsageColumn = [
    {
      field: "date",
      headerName: "Date",
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
    { field: "product", headerName: "Product", width: 200 },
    { field: "workOrder", headerName: "Work Order", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 200 },
    {
      field: "_id",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <ActionColumn
          handleDelete={handleDeleteStock}
          href={`/fire-extinguisher-store/stock-usage/${params.value}`}
          id={params.value}
        />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Fire Extinguisher Store</title>
      </Head>
      <main className="my-container">
        <div className="flex gap-x-10">
          <LinkButton
            w={"w-48"}
            icon={<BsHddNetworkFill />}
            href={"/fire-extinguisher-store/parts-stock"}
            label={"Add Parts Stock"}
          />
          <LinkButton
            w={"w-64"}
            icon={<BsHddNetworkFill />}
            href={"/fire-extinguisher-store/product-purchase"}
            label={"Add Prodcut Purchase"}
          />
          <LinkButton
            w={"w-64"}
            icon={<BsHddNetworkFill />}
            href={"/fire-extinguisher-store/stock-usage/new"}
            label={"Add Stock Usage"}
          />
        </div>
        <div>
          <MyDataGrid
            title={"Part Stocks"}
            columns={partColumns}
            data={partStocks?.partStocks}
          />
          <MyDataGrid
            title={"Product Purchase"}
            columns={productPurchaseColumns}
            data={productPurchase?.productPurchases}
          />
          <MyDataGrid
            title={"Stock Usage"}
            columns={stockUsageColumn}
            data={stockUsage?.stockUsage}
          />
        </div>
      </main>
    </>
  );
}

FireExtinguisherStore.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
