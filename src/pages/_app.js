import Header from "@/components/header";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  const [clinet, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!clinet) return;

  return (
    <main>
      <Toaster />
      {getLayout(
        <>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </>,
        pageProps
      )}
    </main>
  );
}
