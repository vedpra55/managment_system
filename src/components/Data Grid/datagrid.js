import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

export default function MyDataGrid({ data, columns, title }) {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="mt-10 ">
      <h1 className="text-3xl font-bold">{title}</h1>

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
