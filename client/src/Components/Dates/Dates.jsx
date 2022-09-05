import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters, setBookingDates } from "../../Redux/actions";
import { CDateRangePicker } from '@coreui/react-pro'
import s from './Dates.module.css';

const Dates = ({component}) => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);
    const timeZone = useSelector(state => state.timeZone);
    const bookingDates = useSelector(state => state.bookingDates);

    const handleFilterStartDateChange = (date) => {
      if (date) {
        dispatch(setParameters({...parameters, date: {...parameters.date, from: convertDate(date)}}));    
      } else {
        dispatch(setParameters({...parameters, date: {from: '', to: ''}}));    
      }
      dispatch(setCurrentPage(1));
    }
    
    const handleFilterEndDateChange = (date) => {
      date && dispatch(setParameters({...parameters, date: {...parameters.date, to: convertDate(date)}}));    
    }

    const handleBookingStartDateChange = (date) => {
      if (date) {
        dispatch(setBookingDates({...bookingDates, from: convertDate(date)}));    
      } else {
        dispatch(setBookingDates({...bookingDates, from: '', to: ''}));    
      }
    }
    
    const handleBookingEndDateChange = (date) => {
      date && dispatch(setBookingDates({...bookingDates, to: convertDate(date)}));    
    }
    
    const convertDate = date => { 
      if (!date) return date
      let arr = date.toString().split(' ')
      return `${arr[3]}-${convertMonth(arr[1])}-${arr[2]}`
    }

    const convertMonth = monthStr => {
      switch (monthStr) {
        case 'Jan': return '01'
        case 'Feb': return '02'
        case 'Mar': return '03'
        case 'Apr': return '04'
        case 'May': return '05'
        case 'Jun': return '06'
        case 'Jul': return '07'
        case 'Aug': return '08'
        case 'Sep': return '09'
        case 'Oct': return '10'
        case 'Nov': return '11'
        case 'Dec': return '12'
        default: return
      }
    }
    
    // calculo fecha de hoy para setear el minimo en el calendario
    let today = new Date()
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    let hours = today.getHours()
    
    return (
      component === 'home' ?
      <CDateRangePicker 
        footer 
        placeholder={['Fecha desde', 'Fecha hasta']}
        format='d/M/yyyy'
        minDate={hours >= 18 ? today : yesterday}
        startDate={parameters.date.from ? new Date(`${parameters.date.from}${timeZone}`) : null}
        endDate={parameters.date.to ? new Date(`${parameters.date.to}${timeZone}`) : null}
        onStartDateChange={(date) => handleFilterStartDateChange(date)}
        onEndDateChange={(date) => handleFilterEndDateChange(date)}
        /> :  
        <CDateRangePicker 
        footer 
        placeholder={['Fecha desde', 'Fecha hasta']}
        format='d/M/yyyy'
        minDate={hours >= 18 ? today : yesterday}
        startDate={bookingDates.from ? new Date(`${bookingDates.from}${timeZone}`) : null}
        endDate={bookingDates.to ? new Date(`${bookingDates.to}${timeZone}`) : null}
        onStartDateChange={(date) => handleBookingStartDateChange(date)}
        onEndDateChange={(date) => handleBookingEndDateChange(date)}
        disabledDates={bookingDates.disabledDates.map(arrDate => arrDate.map(date => new Date(`${date}${timeZone}`)))}
      />
    );
  };

  export default Dates