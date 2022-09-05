import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import s from "./Bookings.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const history = useHistory()

  useEffect(() => {
    axios("/bookings").then((res) => setBookings(res.data));
  }, []);

  const totalDias = (from, to) => {
    const date1 = new Date(from);
    const date2 = new Date(to);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const rowsBookings = bookings.map((book) => {
    return {
      id: book.idBooking,
      idUser: book.userIdUser,
      col1: book.startDate,
      col2: book.endDate,
      col3: totalDias(book.startDate, book.endDate),
      col4: book.bikes.map(bike => bike.name).join(', '),
      col5: book.status,
      col6: book.totalPrice
    };
  });
  const columnsBookings = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "idUser", headerName: "User ID", width: 80 },
    { field: "col1", headerName: "Desde", width: 100 },
    { field: "col2", headerName: "Hasta", width: 100 },
    { field: "col3", headerName: "Días", width: 50 },
    { field: "col4", headerName: "Bicicletas", width: 400 },
    { field: "col5", headerName: "Status", width: 100 },
    { field: "col6", headerName: "Recaudado", width: 100 },
  ];

  console.log(bookings)

  return (
    <div className={s.bookings}>
      <DataGrid
        rows={rowsBookings}
        columns={columnsBookings}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        className={s.list}
      />
    </div>
  );
}
