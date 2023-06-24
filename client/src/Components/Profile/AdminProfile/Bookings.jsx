import React, { useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { getAllBookings } from "../../../Redux/actions";
import { ThemeProvider } from "@emotion/react";
import theme from "../MaterialUIColors";
import Action from "./Action";
import s from "./Bookings.module.css";
import { Table } from "./Table";
import { useGetElements } from "./usehooks";

export default function Bookings() {
  const bookings = useGetElements({getElements:getAllBookings, elements:'allBookings'})
  const [rowId, setRowId] = useState(null);


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
        email: book.user.email,
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
      { field: "idUser", headerName: "User ID", width: 60 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "start", headerName: "Desde", width: 100 },
      { field: "finish", headerName: "Hasta", width: 100 },
      { field: "days", headerName: "Días", width: 50 },
      { field: "bikes", headerName: "Bicicletas", width: 250 },
      {
        field: "status",
        headerName: (
          <div>
            Estado <BiEdit className={s.edit} />
          </div>
        ),
        width: 100,
        type: "singleSelect",
        valueOptions: ["confirmed", "cancelled"],
        editable: true,
      },
      { field: "ernings", headerName: "Ganancias", width: 100 },
      {
        field: "action",
        headerName: "Guardar",
        type: "actions",
        width: 80,
        renderCell: (params) => (
          <Action {...{ params, rowId, setRowId, origin: "bookings" }} />
        ),
      },
    ];
  }, [rowId]);

  return (
    <div className={s.bookings}>
      <ThemeProvider theme={theme}>
        <Table
          rows={rowsBookings}
          columns={columnsBookings}
          setRowId={setRowId}
        />
      </ThemeProvider>
    </div>
  );
}
