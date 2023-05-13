import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  mt,
} from "@mui/x-data-grid";

export default function MyDataGrid({
  data,
  columns,
  title,
  handleDateChange,
  hideDate,
  mt,
}) {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  useEffect(() => {
    if (toDate && fromDate) {
      handleDateChange(toDate, fromDate);
    }
  }, [toDate, fromDate]);

  return (
    <div className={`${mt ? mt : "mt-10 "}`}>
      <h1 className="text-3xl font-bold">{title}</h1>

      {!hideDate && (
        <div className="mt-10 flex gap-x-10">
          <div>
            <p className="text-[14px] font-medium">From :</p>
            <input
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-gray-100 rounded-lg mt-1 px-3 py-1 "
              type="date"
            />
          </div>
          <div>
            <p className="text-[14px] font-medium">To :</p>
            <input
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-gray-100 rounded-lg mt-1 px-3 py-1 "
              type="date"
            />
          </div>
        </div>
      )}

      <div className="mt-10 shadow-md ">
        {!data && <p>Loading....</p>}

        {data && (
          <DataGrid
            className=" "
            rows={data}
            getRowId={(rows) => rows._id}
            onCellEditStart={(rowId) => setRowId(rowId)}
            columns={columns}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        )}
      </div>
    </div>
  );
}
