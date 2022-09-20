import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { ThemeProvider } from "@emotion/react";
import { getBikes } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import Action from "./Action";
import GroupDiscount from "./GroupDiscount";
import s from "./Bikes.module.css";

export default function Bikes({socket}) {
  const bikes = useSelector((state) => state.allBikes);
  const history = useHistory();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [seeDiscount, setSeeDiscount] = useState(false);

  useEffect(() => {
    dispatch(getBikes());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toogleDiscount = () => {
    seeDiscount ? setSeeDiscount(false) : setSeeDiscount(true);
  };

  const totalDays = (from, to) => {
    const date1 = new Date(from);
    const date2 = new Date(to);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const rowsBikes = useMemo(() => {
    return bikes?.map((bike) => {
      return {
        id: bike.idBike,
        name: bike.name,
        type: bike.type,
        traction: bike.traction,
        wheelSize: bike.wheelSize,
        color: bike.color,
        rating: bike.rating,
        price: bike.price,
        discount: bike.discount,
        daysBooking: bike.bookings.reduce(
          (acc, prev) => acc + totalDays(prev.startDate, prev.endDate),
          0
        ),
        totalBookings: bike.bookings.length,
        status: bike.status,
      };
    });
  }, [bikes]);

  const fillDiscounts = () => {
    const arrDiscounts = [];
    for (let i = 0; i <= 10; i++) {
      arrDiscounts.push(i * 5);
    }
    return arrDiscounts;
  };

  const columnsBookings = useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 50 },
      { field: "name", headerName: "Nombre", width: 150, editable: true },
      { field: "type", headerName: "Tipo", width: 80 },
      { field: "traction", headerName: "Traccion", width: 100 },
      { field: "wheelSize", headerName: "Rodado", width: 80 },
      { field: "color", headerName: "Color", width: 80 },
      { field: "rating", headerName: "Rating", width: 70 },
      {
        field: "price",
        headerName: "Precio",
        width: 70,
        type: "number",
        editable: true,
      },
      {
        field: "discount",
        headerName: "Descuento",
        width: 90,
        type: "singleSelect",
        valueOptions: fillDiscounts(),
        editable: true,
      },
      { field: "daysBooking", headerName: "Dias alquilada", width: 120 },
      { field: "totalBookings", headerName: "Cantidad alq", width: 100 },
      {
        field: "status",
        headerName: "Estado",
        width: 80,
        type: "singleSelect",
        valueOptions: ["active", "service", "deleted"],
        editable: true,
      },
      {
        field: "action",
        headerName: "Guardar",
        type: "actions",
        width: 80,
        renderCell: (params) => (
          <Action {...{ params, rowId, setRowId, origin: "bikes" }} />
        ),
      },
    ];
  }, [rowId]);

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className={s.bikes}>
      <div className={s.container}>
        <ThemeProvider theme={theme}>
          <div className={s.coverGrid}>
        <span className={s.goBack} onClick={handleClick}>
          <TiArrowBackOutline />
        </span>
            <DataGrid
              rows={rowsBikes}
              columns={columnsBookings}
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
            <div className={s.discountBtn} onClick={toogleDiscount}>
              Descuentos grupales
            </div>
            <div className={seeDiscount ? s.show : s.hidde}>
              <GroupDiscount setSeeDiscount={setSeeDiscount} socket={socket} />
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
