import Link from "next/link";
import React, { useState } from "react";
import { FaNetworkWired } from "react-icons/fa";
import SidebarItem from "./sidebarItem";

export default function Sidebar({ children }) {
  const [selectedTab, setSelectedTab] = useState(null);

  const tabs = [
    {
      title: "Work Order",
      icon: <FaNetworkWired />,
      href: "/work-order",
    },
    {
      title: "Oxygen",
      icon: <FaNetworkWired />,
      href: "/work-order/view/OXYGEN",
    },
    {
      title: "Co2",
      icon: <FaNetworkWired />,
      href: "/work-order/view/CO2",
    },
    {
      title: "Aragon",
      icon: <FaNetworkWired />,
      href: "/work-order/view/ARAGON",
    },
    {
      title: "Acetylene",
      icon: <FaNetworkWired />,
      href: "/work-order/view/acetylene",
    },
    {
      title: "Nitrogen",
      icon: <FaNetworkWired />,
      href: "/work-order/view/NITROGEN",
    },
    {
      title: "Fire Extinguisher",
      icon: <FaNetworkWired />,
      href: "/work-order/view/FIREEXTINGUISHER",
    },
    {
      title: "Cylinder Stock",
      icon: <FaNetworkWired />,
      href: "/cylinder-stock",
    },
    {
      title: "Payment Tracking",
      icon: <FaNetworkWired />,
      href: "/payment-tracking",
    },
    {
      title: "Transportation Tracking",
      icon: <FaNetworkWired />,
      href: "/transportation-tracking",
    },
    {
      title: "Report Billing",
      icon: <FaNetworkWired />,
      href: "/report-billing",
    },
    {
      title: "Petty Cash",
      icon: <FaNetworkWired />,
      href: "/petty-cash",
    },
    {
      title: "Cylinder Rotation",
      icon: <FaNetworkWired />,
      href: "/cylinder-rotation",
    },
    {
      title: "Fire Extinguisher Store",
      icon: <FaNetworkWired />,
      href: "/fire-extinguisher-store",
    },
    {
      title: "Staff Managment",
      icon: <FaNetworkWired />,
      href: "/staff-managment",
    },
    {
      title: "Financial Report",
      icon: <FaNetworkWired />,
      href: "/financial-report",
    },
  ];

  return (
    <div className="grid grid-cols-12  overflow-x-hidden h-screen max-h-screen">
      <div className="col-span-2 bg-slate-50  overflow-y-scroll pb-10 border-r    h-screen ">
        <div className="h-20 flex items-center">
          <Link className="px-5" href={"/"}>
            <img
              src="https://stocky.untitledsoft.com/images/logo-default.png"
              alt="logo"
              className="w-16"
            />
          </Link>
        </div>
        <hr />
        <div className="px-5 flex flex-col gap-y-10 mt-10">
          {tabs.map((item, i) =>
            i === selectedTab ? (
              <SidebarItem
                seleted={true}
                key={i}
                i={i}
                title={item.title}
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                href={item.href}
                icon={item.icon}
              />
            ) : (
              <SidebarItem
                seleted={false}
                key={i}
                i={i}
                title={item.title}
                setSelectedTab={setSelectedTab}
                href={item.href}
                icon={item.icon}
              />
            )
          )}
        </div>
      </div>
      <div className="col-span-10">{children}</div>
    </div>
  );
}
