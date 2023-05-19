import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { ThemeProvider } from "@emotion/react";
import { getAccesories } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import Action from "./Action";
import s from "./Accesories.module.css";

export default function Accesories() {
  const accesories = useSelector((state) => state.accesories);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(getAccesories());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const rowsAccs = useMemo(() => {
    return accesories?.map((accesorie) => {
      return {
        id: accesorie.idAcc,
        name: accesorie.name,
        price: accesorie.price,
        status: accesorie.status,
      };
    });
  }, [accesories]);

  const columnsAccs = useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 50 },
      {
        field: "name",
        headerName: (
          <div>
            Nombre <BiEdit className={s.edit} />
          </div>
        ),
        width: 120,
        editable: true,
      },
      {
        field: "price",
        headerName: (
          <div>
            Precio <BiEdit className={s.edit} />
          </div>
        ),
        width: 80,
        type: "number",
        editable: true,
      },
      {
        field: "status",
        headerName: (
          <div>
            Estado <BiEdit className={s.edit} />
          </div>
        ),
        width: 100,
        type: "singleSelect",
        valueOptions: ["active", "deleted"],
        editable: true,
      },
      {
        field: "action",
        headerName: "Guardar",
        type: "actions",
        width: 80,
        renderCell: (params) => (
          <Action {...{ params, rowId, setRowId, origin: "accesories" }} />
        ),
      },
    ];
  }, [rowId]);

  return (
    <ThemeProvider theme={theme}>
      <div className={s.coverGrid}>
        <DataGrid
          rows={rowsAccs}
          columns={columnsAccs}
          pageSize={pageSize}
          onPageSizeChange={(newNumber) => setPageSize(newNumber)}
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
      </div>
    </ThemeProvider>
  );
}
