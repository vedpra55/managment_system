import Sidebar from "@/components/Sidebar/sidebar";

import useSwr from "swr";

import { BsHddNetworkFill } from "react-icons/bs";
import { fetchWorkOrder } from "@/service/apiCalls";

import LinkButton from "@/components/Button/button";
import DataGrid from "@/components/Data Grid/datagrid";
import ActionColumn from "@/components/actionColumn";
import useApiHandler from "@/hooks/useApiHandler";
import { useState } from "react";
import NumberDisplay from "@/components/NumberDisplay";

export default function WorkOrder() {
  const [reloadData, setReloadData] = useState(false);
  const [filterData, setFilterData] = useState(null);
  const { data } = useSwr(["work-order", reloadData], fetchWorkOrder);
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
      `/api/work-order?toDate=${toDate}&fromDate=${fromDate}`
    );
    const json = await res.json();

    if (res.ok) {
      setFilterData(json?.workOrders);
    }
  }

  return (
    <div className="my-container ">
      <LinkButton
        href={"/work-order/new"}
        label={"New Work Order"}
        icon={<BsHddNetworkFill />}
      />
      <NumberDisplay
        w={"w-56"}
        m={"mt-5"}
        title={"Total Work Order"}
        amount={data?.totalWorkOrder}
      />
      <DataGrid
        title={"Work Orders"}
        columns={columns}
        data={filterData || data?.workOrders}
        handleDateChange={handleDateFilter}
      />
    </div>
  );
}

WorkOrder.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
