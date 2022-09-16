import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import { CDateRangePicker } from '@coreui/react-pro';
import s from './Dates.module.css';
import { convertDate } from '../../helpers/convertDate.js';

const Dates = ({ component }) => {
  const dispatch = useDispatch();
  const parameters = useSelector((state) => state.parameters);

  useEffect(() => {
    dispatch(
      setParameters({
        ...parameters,
        date: { ...parameters.date, from: localStorage.getItem('date')?JSON.parse(localStorage.getItem('date')).from : '', to: localStorage.getItem('date')?JSON.parse(localStorage.getItem('date')).to: "" },
      })
    );
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStartDateChange = (date) => {
    if (date) {
      dispatch(
        setParameters({
          ...parameters,
          date: { ...parameters.date, from: convertDate(date) },
        })
      );
      localStorage.setItem('date', JSON.stringify({from: convertDate(date), to: ''}))
    } else {
      dispatch(
        setParameters({
          ...parameters,
          date: { ...parameters.date, from: "", to: "" },
        })
      );
      localStorage.setItem('date', JSON.stringify({from: '', to: ''}))
    }
    dispatch(setCurrentPage(1));
  };

  const handleEndDateChange = (date) => {
    if(date){
      const dateFrom = JSON.parse(localStorage.getItem('date')).from
      localStorage.setItem('date', JSON.stringify({from: dateFrom, to:convertDate(date) }))
      dispatch(
        setParameters({
          ...parameters,
          date: { ...parameters.date, to: convertDate(date) },
        })
        )
      } 
  };

  // calculo fecha de hoy para setear el minimo en el calendario
  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let hours = today.getHours();
  
  return (
    <CDateRangePicker
      footer
      placeholder={["Fecha desde", "Fecha hasta"]}
      format="d/M/yyyy"
      minDate={hours >= 18 ? today : yesterday}
      startDate={
        parameters.date?.from
          ? new Date(`${parameters.date.from}${parameters.date.timeZone}`)
          : new Date()
      }
      endDate={
        parameters.date?.to
          ? new Date(`${parameters.date.to}${parameters.date.timeZone}`)
          : new Date()
      }
      onStartDateChange={(date) => handleStartDateChange(date)}
      onEndDateChange={(date) => handleEndDateChange(date)}
      disabledDates={parameters.date.disabledDates.map((arrDate) =>
        arrDate.map((date) => new Date(`${date}${parameters.date.timeZone}`))
      )}
      className={component === "home" ? "" : s.date}
    />
  );
};

export default Dates;
