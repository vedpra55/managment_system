import { MyButton } from "@/components/Button/button";
import Sidebar from "@/components/Sidebar/sidebar";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import useSwr from "swr";
import { BsHddNetworkFill } from "react-icons/bs";
import Form from "@/components/form";
import useApiHandler from "@/hooks/useApiHandler";

export default function AddTransportationTracking() {
  const router = useRouter();
  const { slug } = router.query;
  const submitRef = useRef();
  const [loadData, setLoadData] = useState("dsad");
  const [selectedTab, setSelectedTab] = useState(0);
  const { updateItem } = useApiHandler();

  async function fetchSingleUnTransportationTracking() {
    const res = await fetch(`/api/transportation-tracking/${slug}`);
    return res.json();
  }

  const { data, isLoading } = useSwr(
    [slug, "unCom-tracking-single", loadData],
    fetchSingleUnTransportationTracking
  );

  if (!data) {
    return <div className="my-container">Loading...</div>;
  }

  const tracking = data?.tracking;
  const fillingStatus = tracking?.fillingStatus;
  const receivedStatus = tracking?.receivedStatus;
  const fromPortBlair = data?.fromPortBlair;
  const fromChennai = data?.fromChennai;

  function handleClick(tab) {
    setSelectedTab(tab);
  }

  const portBlairFields = [
    {
      name: "sNo",
      type: "text",
      placeholder: "S.NO",
      required: true,
    },
    {
      name: "date",
      type: "date",
      placeholder: "Date",
      required: true,
    },
    {
      name: "cylinderType",
      type: "select",
      placeholder: "Cylinder Type",
      required: true,
      values: [
        "Select",
        "OXYGEN",
        "CO2",
        "NITROGEN",
        "acetylene",
        "FIREEXTINGUISHER",
      ],
    },
    {
      name: "agentChennai",
      type: "text",
      placeholder: "Agent Chennai",
      required: true,
    },
    {
      name: "agentPortBlair",
      type: "text",
      placeholder: "Agent Port Blair",
      required: true,
    },
    {
      name: "ewayBill",
      type: "text",
      placeholder: "EWAY BILL",
      required: true,
    },
    {
      name: "tcl",
      type: "text",
      placeholder: "TCL",
      required: true,
    },
  ];

  const fillingStatusFields = [
    {
      name: "remark1",
      type: "text",
      placeholder: "Remark",
    },
    {
      name: "fillingStatus",
      type: "checkbox",
      placeholder: "Filling Status",
    },
  ];

  const receivedStatusFields = [
    {
      name: "remark2",
      type: "text",
      placeholder: "Remark",
    },
    {
      name: "receivedStatus",
      type: "checkbox",
      placeholder: "Received Status",
    },
  ];

  const chennaiFields = [
    {
      name: "sNo",
      type: "text",
      placeholder: "S.NO",
      required: true,
    },
    {
      name: "date",
      type: "date",
      placeholder: "Date",
      required: true,
    },
    {
      name: "cylinderType",
      type: "select",
      placeholder: "Cylinder Type",
      required: true,
      values: [
        "Select",
        "OXYGEN",
        "CO2",
        "NITROGEN",
        "acetylene",
        "FIREEXTINGUISHER",
      ],
    },
    {
      name: "agentPortBlair",
      type: "text",
      placeholder: "Agent Port Blair",
      required: true,
    },
    {
      name: "agentChennai",
      type: "text",
      placeholder: "Agent Chennai",
      required: true,
    },
    {
      name: "ewayBill",
      type: "text",
      placeholder: "EWAY BILL",
      required: true,
    },
    {
      name: "tcl",
      type: "text",
      placeholder: "TCL",
      required: true,
    },
  ];

  async function handlePortBlairSubmit(data) {
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
      from: "portBlair",
    };
    await updateItem(
      `/api/transportation-tracking/action?id=${fromPortBlair?._id}`,
      item
    );
    setLoadData(Math.random() * 6587);
  }

  async function handleChennaiSubmit(data) {
    const item = {
      ...data,
      date: new Date(data.date).toISOString(),
      from: "chennai",
    };
    await updateItem(
      `/api/transportation-tracking/action?id=${fromChennai?._id}`,
      item
    );
    setLoadData(Math.random() * 6587);
  }

  async function handleStatusSubmit(data) {
    const id = tracking?._id;
    await updateItem(`/api/transportation-tracking?id=${id}`, data);
    setLoadData(Math.random() * 1587);
  }

  const tabs = [
    {
      component: (
        <Form
          submitRef={submitRef}
          title={"Add Tracking From Port Blair to Chennai"}
          handleSumbitForm={handlePortBlairSubmit}
          fields={portBlairFields}
          defaultValues={fromPortBlair}
        />
      ),
    },
    {
      component: (
        <Form
          submitRef={submitRef}
          title={"Filling Status"}
          handleSumbitForm={handleStatusSubmit}
          fields={fillingStatusFields}
          defaultValues={tracking}
        />
      ),
    },
    {
      component: (
        <Form
          submitRef={submitRef}
          title={"Add Tracking From  Chennai to Port Blair"}
          handleSumbitForm={handleChennaiSubmit}
          fields={chennaiFields}
          defaultValues={fromChennai}
        />
      ),
    },
    {
      component: (
        <Form
          submitRef={submitRef}
          title={"Add Received Status"}
          handleSumbitForm={handleStatusSubmit}
          fields={receivedStatusFields}
          defaultValues={tracking}
        />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Add Transportation Tracking</title>
      </Head>
      <main className="my-container">
        <div className="grid grid-cols-12 gap-x-10">
          <div className="col-span-3 font-medium">Step 1</div>
          <div className="col-span-3 font-medium">Step 2</div>
          <div className="col-span-3 font-medium">Step 3</div>
          <div className="col-span-3 font-medium">Step 4</div>
        </div>

        <div className="grid grid-cols-12 gap-x-10 mt-5">
          <div className="col-span-3 font-medium">
            <MyButton
              handleClick={handleClick}
              label={"Add From (Port Blair to Chennai)"}
              icon={<BsHddNetworkFill />}
              tab={0}
              selectedTab={selectedTab}
            />
          </div>
          <div className="col-span-3 font-medium">
            <MyButton
              handleClick={handleClick}
              label={"Add Filling Status"}
              icon={<BsHddNetworkFill />}
              tab={1}
              selectedTab={selectedTab}
              disable={fromPortBlair?.date ? false : true}
            />
          </div>
          <div className="col-span-3 font-medium">
            <MyButton
              handleClick={handleClick}
              label={"Add From (Chennai to Port Blair)"}
              icon={<BsHddNetworkFill />}
              tab={2}
              selectedTab={selectedTab}
              disable={fillingStatus ? false : true}
            />
          </div>
          <div className="col-span-3 font-medium">
            <MyButton
              handleClick={handleClick}
              label={"Received Status"}
              icon={<BsHddNetworkFill />}
              tab={3}
              selectedTab={selectedTab}
              disable={fromChennai?.date ? false : true}
            />
          </div>
        </div>
        <div className="mt-16">{tabs[selectedTab]?.component}</div>
      </main>
    </>
  );
}

AddTransportationTracking.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
