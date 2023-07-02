import React, { useState } from "react";
import s from "./ChartEarnings.module.css";
import { useGetElements } from "./usehooks";
import { getDataChartBookings } from "../../../Redux/actions";
import { CardLineChart } from "./CardLineChart";
import { RadioSection } from "./RadioSection";

export const elements = ['bikes', 'adventures', 'accesories']

const allMonths = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre", 
    "Octubre",
    "Noviembre",
    "Diciembre",
];

export const ChartBookings = () => {
  const allBookings = useGetElements({
    getElements: getDataChartBookings,
    elements: "dataChartBookings",
  });
  const [state, setState] = useState({
    property: "type",
    kind: "mtb",
    element: "all",
    year: '2022'
  });

  const getBookingsByYear = (bookings) => {
    return bookings?.map(booking => {
      return {
        ...booking,
        bikes: booking.bikes.length,
        adventures: booking.adventures.length,
        accesories: booking.accesories.length
      }
    })
  }

  const handleChange = (e) => {
    setState({...state, element:e.target.value})
  }

  const data = getBookingsByYear(allBookings)
  return (
    <div className={s.mainContainerData}>
      <CardLineChart 
        data={data} 
        filterElement={state.element} 
        title={'Reservas'}
      />
      <div className={s.containerData}>
        <RadioSection
          value={state.element}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};
