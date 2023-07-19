import React, { useState } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import s from "./Bookings.module.css";

export const Table = ({ columns, rows, setRowId }) => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 15]}
      className={s.list}
      getRowId={(row) => row.id}
      getRowSpacing={(params) => ({
        top: params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
      })}
      sx={{
        [`& .${gridClasses.row}`]: {
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "#494949" : "#191616",
        },
      }}
      onCellEditCommit={(params) => setRowId(params.id)}
    />
  );
};
