import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {setSortFilterExperience, filterExperiencesByDate } from "../../../Redux/actions";
import { CDateRangePicker } from '@coreui/react-pro';
import s from './CalendarE.module.css';
import { convertDate } from '../../../helpers/convertDate.js';

const CalendarE = () => {
  const dispatch = useDispatch();
  const filterExperience = useSelector((state) => state.filterExperience);
  useEffect(() => {
    // dispatch(
    //   setParameters({
    //     ...parameters,
    //     date: { ...parameters.date, from: localStorage.getItem('date')?JSON.parse(localStorage.getItem('date')).from : '', to: localStorage.getItem('date')?JSON.parse(localStorage.getItem('date')).to: "" },
    //   })
    // );
  },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleStartDateChange = (date) => {
    if (date) {
      dispatch(
        setSortFilterExperience({
          startDate:convertDate(date),
        })
      );
    } else {
      dispatch(
        setSortFilterExperience({
          startDate:null
        })
      );
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      dispatch(
        setSortFilterExperience({
          endDate:convertDate(date),
        })
      );
    } else {
      dispatch(
        setSortFilterExperience({
          endDate:null
        })
      );
      dispatch(filterExperiencesByDate({startDate:null, 
        endDate:null, sort:filterExperience.sort
      }))
    }
  };

  const handleConfirm = () => {
    dispatch(filterExperiencesByDate(filterExperience))
  }

  return (
    <CDateRangePicker
      footer
      placeholder={["Fecha desde", "Fecha hasta"]}
      format="d/M/yyyy"
      onStartDateChange={(date) => handleStartDateChange(date)}
      onEndDateChange={(date) => handleEndDateChange(date)}
      onConfirm={handleConfirm}
        // disabledDates={parameters.date.disabledDates.map((arrDate) =>
        //     arrDate.map((date) => new Date(`${date}${parameters.date.timeZone}`))
        // )}
      className={s.calendarE}
    />
  );
};

export default CalendarE;