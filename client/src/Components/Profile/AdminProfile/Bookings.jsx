import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { ThemeProvider } from "@emotion/react";
import { getAllBookings } from "../../../Redux/actions";
import Action from "./Action";
import theme from "../MaterialUIColors";
import s from "./Bookings.module.css";

export default function Bookings() {
  const bookings = useSelector((state) => state.allBookings);
  const history = useHistory();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(getAllBookings());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const totalDays = (from, to) => {
    const date1 = new Date(from);
    const date2 = new Date(to);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const rowsBookings = useMemo(() => {
    return bookings?.map((book) => {
      return {
        id: book.idBooking,
        idUser: book.userIdUser,
        start: book.startDate,
        finish: book.endDate,
        days: totalDays(book.startDate, book.endDate),
        bikes: book.bikes.map((bike) => bike.name).join(", "),
        status: book.status,
        ernings: `$ ${book.totalPrice}`,
      };
    });
  }, [bookings]);

  const columnsBookings = useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 50 },
      { field: "idUser", headerName: "User ID", width: 80 },
      { field: "start", headerName: "Desde", width: 100 },
      { field: "finish", headerName: "Hasta", width: 100 },
      { field: "days", headerName: "Días", width: 50 },
      { field: "bikes", headerName: "Bicicletas", width: 400 },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        type: "singleSelect",
        valueOptions: ["confirmed", "cancelled"],
        editable: true,
      },
      { field: "ernings", headerName: "Ganancias", width: 100 },
      {
        field: "action",
        headerName: "Action",
        type: "actions",
        width: 80,
        renderCell: (params) => (
          <Action {...{ params, rowId, setRowId, origin: "bookings" }} />
        ),
      },
    ];
  }, [rowId]);

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className={s.bookings}>
      <div className={s.container}>
        <ThemeProvider theme={theme}>
          <div className={s.coverGrid}>
        <span className={s.goBack} onClick={handleClick}>
          <TiArrowBackOutline />
        </span>
            <DataGrid
              rows={rowsBookings}
              columns={columnsBookings}
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
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
