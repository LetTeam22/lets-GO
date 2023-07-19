import React, { useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { ThemeProvider } from "@emotion/react";
import { getBikes } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import Action from "./Action";
import GroupDiscount from "./GroupDiscount";
import s from "./Bikes.module.css";
import FormBike from "./FormBike";
import FormPriceBike from "./FormPriceBike";
import { Table } from "./Table";
import { useGetElements } from "./usehooks";

export default function Bikes({ socket }) {
  const bikes = useGetElements({getElements:getBikes, elements:'allBikes'})
  const [rowId, setRowId] = useState(null);
  const [seeDiscount, setSeeDiscount] = useState(false);
  const [addBike, setAddBike] = useState(false);
  const [addPriceBike, setAddPriceBike] = useState(false);

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
      {
        field: "name",
        headerName: (
          <div>
            Nombre <BiEdit className={s.edit} />
          </div>
        ),
        width: 150,
        editable: true,
      },
      { field: "type", headerName: "Tipo", width: 80 },
      { field: "traction", headerName: "Traccion", width: 100 },
      { field: "wheelSize", headerName: "Rodado", width: 80 },
      { field: "color", headerName: "Color", width: 80 },
      { field: "rating", headerName: "Rating", width: 70 },
      {
        field: "price",
        headerName: (
          <div>
            Precio <BiEdit className={s.edit} />
          </div>
        ),
        width: 70,
        type: "number",
        editable: true,
      },
      {
        field: "discount",
        headerName: (
          <div>
            Descuento <BiEdit className={s.edit} />
          </div>
        ),
        width: 100,
        type: "singleSelect",
        valueOptions: fillDiscounts(),
        editable: true,
      },
      { field: "daysBooking", headerName: "Dias alquilada", width: 120 },
      { field: "totalBookings", headerName: "Cantidad alq", width: 100 },
      {
        field: "status",
        headerName: (
          <div>
            Estado <BiEdit className={s.edit} />
          </div>
        ),
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

  const addBikes = () => {
    addBike ? setAddBike(false) : setAddBike(true);
  };

  const setBikesPrices = () => {
    addPriceBike ? setAddPriceBike(false) : setAddPriceBike(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={s.coverGrid}>
        <Table setRowId={setRowId} rows={rowsBikes} columns={columnsBookings} />
        <div className={s.discountBtn} onClick={toogleDiscount}>
          Descuentos grupales
        </div>
        <div className={seeDiscount ? s.show : s.hidde}>
          <GroupDiscount setSeeDiscount={setSeeDiscount} socket={socket} />
        </div>
        <button className={s.editBike} onClick={addBikes}>
          Agregar Bicileta
        </button>
        <button className={s.editBike} onClick={setBikesPrices}>
          Ajustar Precio
        </button>
        <div className={addBike ? s.show : s.hidde}>
          <FormBike setAddBike={setAddBike} />
        </div>
        <div className={addPriceBike ? s.show : s.hidde}>
          <FormPriceBike setAddPriceBike={setAddPriceBike} />
        </div>
      </div>
    </ThemeProvider>
  );
}
