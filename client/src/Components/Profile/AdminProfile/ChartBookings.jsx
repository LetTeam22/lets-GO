import React, { useState } from "react";
import s from "./ChartEarnings.module.css";
import { useGetElements } from "./usehooks";
import { getDataChartBookings } from "../../../Redux/actions";
import { CardLineChart } from "./CardLineChart";
import { RadioSection } from "./RadioSection";
import { ChartBikesSelect } from "./ChartBikesSelect";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CardBarChart } from "./CardBarChart";
import { COLORS, properties } from "./ChartBikes";

export const elements = ["bikes", "adventures", "accessories"];

export const ChartBookings = () => {
  const allBookings = useGetElements({
    getElements: getDataChartBookings,
    elements: "dataChartBookings",
  });
  const [state, setState] = useState({
    property: "type",
    kind: "mtb",
    element: "accessories",
    year: "2022",
    show: "year",
    month: 'Noviembre'
  });

  const allMonths = allBookings?.map(book => {
    const { month } = book
    return {
      value: month,
      name: month
    }
  })

  const getBookingsByYear = (bookings) => {
    return bookings?.map((booking) => {
      const { month, bikes, adventures, accessories } = booking
      return {
        month,
        bikes: bikes.total,
        adventures: adventures.total,
        accessories: accessories.total,
      };
    });
  };

  const getBookingsByMonth = (bookings, month) => {
    const book = bookings?.find(book => book.month === month)
    return book && book[state.element]?.description
  }

  const handleChange = (e) => {
    if(state.element === 'all') setState({...state,[e.target.name]: e.target.value, element:'bikes'})
    else setState({ ...state, [e.target.name]: e.target.value });
  };

  const monthlyData = getBookingsByMonth(allBookings, state.month)

  const data = state.show === 'year'?
    getBookingsByYear(allBookings)
    :
    state.element === 'bikes' ?
      monthlyData[state.property]
      :
      monthlyData
  
  const bars = state.show === 'month' && data?.map((obj, i) => {
      const [ value ] = Object.keys(obj)
      return {value, color:COLORS[i]}
    })
  return (
    <div className={s.containerBookings}>
      <section className={s.mainContainerData}>
        {state.show === "year" ? 
          <CardLineChart
            data={data}
            filterElement={state.element}
            title={"Reservas"}
          />
        : 
          <CardBarChart
          title={state.month}
          data={data}
          bars={bars}
          />
        }
        <div className={s.containerData}>
          <RadioSection value={state.element} name={'element'} handleChange={handleChange} show={state.show === 'year'}/>
        </div>
      </section>
      <aside className={s.asideBookings}>
        <ToggleButtonGroup
          color="primary"
          value={state.show}
          exclusive
          name={'show'}
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="year" name={'show'}>Año</ToggleButton>
          <ToggleButton value="month" name={'show'}>Mes</ToggleButton>
        </ToggleButtonGroup>
        {state.show === 'month'?
        <>
        <ChartBikesSelect
        value={state.month}
        name={'month'}
        handleChange={handleChange}
        properties={allMonths} 
        title={'Mes'}
        />
        <ChartBikesSelect
          value={state.property}
          handleChange={handleChange}
          properties={properties} 
          name={'property'}
          title={'Propiedad'}
          disabled={state.element !== 'bikes'}
        />
        </>
        :
        <div></div>
      }
      </aside>
    </div>
  );
};
