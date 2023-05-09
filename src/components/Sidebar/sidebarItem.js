import Link from "next/link";
import React from "react";

export default function SidebarItem({
  seleted,
  href,
  title,
  icon,
  setSelectedTab,
  i,
}) {
  return (
    <Link
      onClick={() => setSelectedTab(i)}
      href={href}
      className={`main-btn ${
        seleted ? "bg-black" : "bg-gray-200 hover:bg-gray-300 text-black"
      }`}
    >
      <div className="text-xl">{icon}</div>
      <p className="text-[14px]">{title}</p>
    </Link>
  );
}
