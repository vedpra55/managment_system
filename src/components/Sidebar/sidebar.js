import Link from "next/link";
import React, { useState } from "react";
import { FaNetworkWired } from "react-icons/fa";
import { BiCylinder, BiStoreAlt } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import {
  MdOutlinePayment,
  MdOutlineEmojiTransportation,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { IoCashOutline } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import { GiClockwiseRotation } from "react-icons/gi";

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
      icon: <BiCylinder />,
      href: "/work-order/view/OXYGEN",
    },
    {
      title: "Co2",
      icon: <BiCylinder />,
      href: "/work-order/view/CO2",
    },

    {
      title: "Acetylene",
      icon: <BiCylinder />,
      href: "/work-order/view/acetylene",
    },
    {
      title: "Nitrogen",
      icon: <BiCylinder />,
      href: "/work-order/view/NITROGEN",
    },
    {
      title: "Fire Extinguisher",
      icon: <BiCylinder />,
      href: "/work-order/view/FIREEXTINGUISHER",
    },
    {
      title: "Cylinder Stock",
      icon: <AiOutlineStock />,
      href: "/cylinder-stock",
    },
    {
      title: "Payment Tracking",
      icon: <MdOutlinePayment />,
      href: "/payment-tracking",
    },
    {
      title: "Transportation Tracking",
      icon: <MdOutlineEmojiTransportation />,
      href: "/transportation-tracking",
    },
    {
      title: "Report Billing",
      icon: <RiBillLine />,
      href: "/report-billing",
    },
    {
      title: "Petty Cash",
      icon: <IoCashOutline />,
      href: "/petty-cash",
    },
    {
      title: "Cylinder Rotation",
      icon: <GiClockwiseRotation />,
      href: "/cylinder-rotation",
    },
    {
      title: "Fire Extinguisher Store",
      icon: <BiStoreAlt />,
      href: "/fire-extinguisher-store",
    },
    {
      title: "Staff Managment",
      icon: <MdOutlineManageAccounts />,
      href: "/staff-managment",
    },
    {
      title: "Financial Report",
      icon: <TbReportMoney />,
      href: "/financial-report",
    },
  ];

  return (
    <div className="grid grid-cols-12 relative  overflow-x-hidden h-screen max-h-screen">
      <div className=" md:col-span-2 xl:col-span-2 3xl:col-span-1          h-screen ">
        <div className="fixed bg-slate-50 h-screen border-r pb-10   md:w-48 xl:w-48 2xl:w-64 overflow-y-scroll">
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
          <div className="px-5  flex flex-col gap-y-10 mt-10">
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
      </div>
      <div className="md:col-span-10 xl:col-span-10">{children}</div>
    </div>
  );
}
