import { MyButton } from "@/components/Button/button";
import Sidebar from "@/components/Sidebar/sidebar";
import useApiHandler from "@/hooks/useApiHandler";
import {
  fetchTransportationTracking,
  fetchUnTransportationTracking,
} from "@/service/apiCalls";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsHddNetworkFill } from "react-icons/bs";
import useSwr from "swr";

export default function TransportationTracking() {
  const [reload, setReload] = useState(false);
  const { createItem, deleteItem } = useApiHandler();
  const router = useRouter();

  async function handleClick() {
    const item = {
      test: "sd",
    };

    const res = await createItem("/api/transportation-tracking", item);
    const id = res.trackingData._id;

    router.push(`/transportation-tracking/${id}`);

    console.log(res);
  }

  async function handleDelete(id, portBlairId, chennaiId) {
    await deleteItem(
      `/api/transportation-tracking/${id}?fromPortBlairId=${portBlairId}&fromChennaiId=${chennaiId}`
    );
    setReload(!reload);
  }

  const { data } = useSwr(
    ["unCom-tracking", reload],
    fetchUnTransportationTracking
  );

  return (
    <>
      <Head>
        <title>Transportation Tracking</title>
      </Head>
      <main className="my-container">
        <button
          onClick={handleClick}
          className="main-btn bg-yellow-400 hover:bg-yellow-500 font-semibold text-black"
        >
          <BsHddNetworkFill />
          <span>New Transportation Tracking</span>
        </button>
        <div className="grid grid-cols-12 gap-10 mt-10">
          {data?.tracking.map((item) => (
            <TrackingCard
              handleDelete={handleDelete}
              key={item._id}
              item={item}
            />
          ))}
        </div>
      </main>
    </>
  );
}

TransportationTracking.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};

function TrackingCard({ item, handleDelete }) {
  const createdAt = new Date(item.createdAt);

  console.log(item);

  const isReceived = item.receivedStatus;
  return (
    <div className="bg-gray-50 col-span-3 px-5 py-3 shadow-lg  w-full rounded-lg">
      <div className="flex gap-x-3 items-center">
        <label>Created At :</label>
        <p className=" font-semibold">
          {createdAt.getDate()} / {createdAt.getUTCMonth() + 1} /{" "}
          {createdAt.getFullYear()}
        </p>
      </div>
      <div className="flex gap-x-3 items-center">
        <p>Status :</p>
        <p
          className={`${
            isReceived ? "text-green-500" : "text-red-500"
          } font-semibold`}
        >
          {isReceived ? "Complete" : "In Complete"}
        </p>
      </div>
      <div className="flex mt-5  text-xs gap-x-5 items-center">
        <Link
          href={`${
            isReceived
              ? `/transportation-tracking/view/${item._id}`
              : `/transportation-tracking/${item._id}`
          }`}
          key={item._id}
          className="main-btn h-8 w-24 flex justify-center"
        >
          <p>View</p>
        </Link>
        <button
          onClick={() =>
            handleDelete(item._id, item.fromPortBlair, item.fromChennai)
          }
          className="main-btn py-1 h-8 bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
