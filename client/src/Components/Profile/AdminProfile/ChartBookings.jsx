import React, { useState } from "react";
import s from "./ChartEarnings.module.css";
import { useGetElements } from "./usehooks";
import { getDataChartBookings } from "../../../Redux/actions";
import { CardLineChart } from "./CardLineChart";
import { RadioSection } from "./RadioSection";
import { ChartBikesSelect } from "./ChartBikesSelect";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CardBarChart } from "./CardBarChart";

export const elements = ["bikes", "adventures", "accesories"];
const bars = {
  bikes: {
    type: ['bmx', 'mtb', 'city', 'tandem', 'touring', 'folding'],
    traction: ['mecánica', 'eléctrica'],
    color: ['negro', 'verde', 'blanco', 'rojo', 'azul', 'gris', 'amarillo'],
    wheelSize: [16, 20, 24, 26, 29],
  },
  accesories: {
    name: ['Canasto', 'Calzado', 'Casco', 'Silla portabebés', 'Botella']
  },
  adventures: {
    name: ['Trasmontaña', 'Escapada a Tafí del Valle']
  }
}

export const ChartBookings = () => {
  const allBookings = useGetElements({
    getElements: getDataChartBookings,
    elements: "dataChartBookings",
  });
  const [state, setState] = useState({
    property: "type",
    kind: "mtb",
    element: "accesories",
    year: "2022",
    show: "year",
    month: 'Noviembre'
  });

  const getBookingsByYear = (bookings) => {
    return bookings?.map((booking) => {
      return {
        ...booking,
        bikes: booking.bikes.length,
        adventures: booking.adventures.length,
        accesories: booking.accesories.length,
      };
    });
  };

  const getBookingsByMonth = (bookings, month) => {
    return bookings?.filter(book => book.month === month)
  }

  const handleChange = (e) => {
    setState({ ...state, element: e.target.value });
  };

  const handleChangeShow = (e, value) => {
    if(state.element === 'all') setState({...state,show: value, element:'bikes'})
    else setState({ ...state, show: value });
  };

  const monthlyData = getBookingsByMonth(allBookings, state.month)

  const data = state.show === 'year'?
    getBookingsByYear(allBookings)
    :
    monthlyData.map(book => ({month:book.month, element:book[state.element]}))
  
  console.log({data}, {element:state.element})
  return (
    <div className={s.containerBookings}>
      <section className={s.mainContainerData}>
        {state.show === "year" ? (
          <>
            <CardLineChart
              data={data}
              filterElement={state.element}
              title={"Reservas"}
            />
            <div className={s.containerData}>
              <RadioSection value={state.element} handleChange={handleChange} />
            </div>
          </>
        ) : (
          <CardBarChart
          title={data.month}
          data={data.element}
          bars={[{value: 'accesorios', color: 'FFFFFF'}]}
          />
        )}
      </section>
      <aside className={s.asideBookings}>
        <ToggleButtonGroup
          color="primary"
          value={state.show}
          exclusive
          onChange={handleChangeShow}
          aria-label="Platform"
        >
          <ToggleButton value="year">Año</ToggleButton>
          <ToggleButton value="month">Mes</ToggleButton>
        </ToggleButtonGroup>
        {/* <ChartBikesSelect
        value ={}
        handleChange 
        properties 
        title
      /> */}
      </aside>
    </div>
  );
};
