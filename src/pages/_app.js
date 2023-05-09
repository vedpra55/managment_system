import Header from "@/components/header";
import "@/styles/globals.css";

import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
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
