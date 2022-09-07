import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import s from "./Bikes.module.css";
import { useHistory } from "react-router-dom";
import { TiArrowBackOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from "react-redux";
import { getBikes } from "../../../Redux/actions";


export default function Bikes() {
  const bikes = useSelector(state => state.allBikes)
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBikes())
  }, []);
  const totalDays = (from, to) => {
    const date1 = new Date(from);
    const date2 = new Date(to);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const rowsBikes = bikes?.map(bike => {
    return {
      id: bike.idBike,
      name: bike.name,
      type: bike.type,
      traction: bike.traction,
      wheelSize: bike.wheelSize,
      color: bike.color,
      price: bike.price,
      daysBooking: bike.bookings.reduce ((acc,prev) => acc + totalDays(prev.startDate, prev.endDate), 0),
      totalBookings: bike.bookings.length,
      status: 'funcionando'
    };
  });
  const columnsBookings = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "type", headerName: "Tipo", width: 80 },
    { field: "traction", headerName: "Traccion", width: 100 },
    { field: "wheelSize", headerName: "Rodado", width: 80 },
    { field: "color", headerName: "Color", width: 80 },
    { field: "price", headerName: "Precio", width: 80 },
    { field: "daysBooking", headerName: "Dias alquilada", width: 120 },
    { field: "totalBookings", headerName: "Cantidad alq", width: 120 },
    { field: "status", headerName: "Estado", width: 120 }
  ];

  const handleClick = () => {
    history.goBack()
  }


  return (
    <div className={s.bikes}>
      <span className={s.goBack} onClick={handleClick}><TiArrowBackOutline/></span>
      <DataGrid
        rows={rowsBikes}
        columns={columnsBookings}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        className={s.list}
      />
    </div>
  );
}
