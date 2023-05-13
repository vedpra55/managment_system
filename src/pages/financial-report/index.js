import Sidebar from "@/components/Sidebar/sidebar";
import { useAuthState } from "@/context/authContext";
import useAuth from "@/hooks/useAuth";
import AmountDisplay from "@/pageComponents/financial-report/amountDisplay";
import CylinderSalesBarChart from "@/pageComponents/financial-report/charts/cylinderSalesBarChart";
import TotalSalesPieChart from "@/pageComponents/financial-report/charts/totalSalesPieChart";
import CylinderAmountDisplay from "@/pageComponents/financial-report/cylinderAmountDisplay";
import { fetchFinancialReport } from "@/service/apiCalls";
import Head from "next/head";
import { useEffect } from "react";
import useSwr from "swr";

export default function FinancialReport() {
  const { data } = useSwr("financial-report", fetchFinancialReport);

  const { checkRole } = useAuth();
  const { data: user } = useAuthState();

  useEffect(() => {
    checkRole("financial");
  }, []);

  if (!data)
    return (
      <div className="my-container">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <Head>
        <title>Financial Report</title>
      </Head>
      {user?.role === "owner" && (
        <main className="my-container">
          <AmountDisplay amounts={data?.amounts} />
          <div className="my-14"></div>
          <CylinderAmountDisplay amounts={data?.cylinderAmounts} />
          <div className="my-14"></div>
          <TotalSalesPieChart sales={data?.sales} />
          <div className="my-14"></div>
          <CylinderSalesBarChart />
        </main>
      )}
    </>
  );
}

FinancialReport.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
