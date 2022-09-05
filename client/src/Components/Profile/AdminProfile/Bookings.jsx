import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import s from "./Bookings.module.css";
import { useHistory } from "react-router-dom";
import { TiArrowBackOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../../Redux/actions";


export default function Bookings() {
  const bookings = useSelector(state => state.bookings)
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllBookings())
  }, []);

  const totalDias = (from, to) => {
    const date1 = new Date(from);
    const date2 = new Date(to);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const rowsBookings = bookings?.map((book) => {
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

  const handleClick = () => {
    history.goBack()
  }

  return (
    <div className={s.bookings}>
      <span className={s.goBack} onClick={handleClick}><TiArrowBackOutline/></span>
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
