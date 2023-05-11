import Image from "next/image";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar/sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/work-order");
  }, []);

  return (
    <>
      <Head></Head>
    </>
  );
}

Home.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
