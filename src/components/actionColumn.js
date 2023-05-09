import Link from "next/link";
import React from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { MyButton } from "./Button/button";

export default function ActionColumn({ id, href, handleDelete, hideDelete }) {
  return (
    <div className="flex items-center,  gap-x-2">
      <Link
        className="main-btn w-24 text-xs gap-x-1 justify-center"
        href={`${href}`}
      >
        <MdModeEdit className="text-[16px] flex-1" />
        <span>Edit</span>
      </Link>
      {!hideDelete && (
        <MyButton
          w={"w-24"}
          c={" bg-red-600"}
          tc={"text-white"}
          handleClick={() => handleDelete(id)}
          icon={<MdDelete />}
          label={"Delete"}
        />
      )}
    </div>
  );
}
