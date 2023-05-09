import Head from "next/head";
import LinkButton from "@/components/Button/button";
import Sidebar from "@/components/Sidebar/sidebar";
import { BsHddNetworkFill } from "react-icons/bs";

export default function AddTransportation() {
  return (
    <>
      <Head>
        <title>Add Transportation Tracking</title>
      </Head>
      <div className="my-container">
        <div className="grid grid-cols-12 gap-x-10">
          <div className="col-span-3 font-medium">Step 1</div>
          <div className="col-span-3 font-medium">Step 2</div>
          <div className="col-span-3 font-medium">Step 3</div>
          <div className="col-span-3 font-medium">Step 4</div>
        </div>
        <div className="grid grid-cols-12 gap-x-10 mt-5">
          <div className="col-span-3">
            <LinkButton
              w={"w-64"}
              href={"/transportation-tracking/portBlair-chennai"}
              label={"Add Tracking (Port Blair to Chennai)"}
              icon={<BsHddNetworkFill />}
            />
          </div>
          <div className="col-span-3">
            <LinkButton
              disable={true}
              w={"w-64"}
              href={"/transportation-tracking/status"}
              label={"Add Filling Status"}
              icon={<BsHddNetworkFill />}
            />
          </div>
          <div className="col-span-3">
            <LinkButton
              disable={true}
              w={"w-64"}
              href={"/transportation-tracking/chennai-portBlair"}
              label={"Add Tracking (Chennai to Port Blair)"}
              icon={<BsHddNetworkFill />}
            />
          </div>
          <div className="col-span-3">
            <LinkButton
              disable={true}
              w={"w-64"}
              href={"/transportation-tracking/status"}
              label={"Add Reveived Status"}
              icon={<BsHddNetworkFill />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

AddTransportation.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
