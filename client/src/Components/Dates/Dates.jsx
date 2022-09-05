import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import { CDateRangePicker } from '@coreui/react-pro'
import s from './Dates.module.css';

const Dates = ({disabledDates}) => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleStartDateChange = (date) => {
      const newDate = date ? date : ''
      setFromDate(newDate)
      if (!date) {
        dispatch(setParameters({...parameters, date: {from: '', to: ''}}));    
        dispatch(setCurrentPage(1));
      }
    }

    const handleEndDateChange = (date) => {
      const newDate = date ? date : ''
      setToDate(newDate)
    }

    const handleConfirm = () => {
      dispatch(setParameters({...parameters, date: {from: convertDate(fromDate), to: convertDate(toDate)}}));    
      dispatch(setCurrentPage(1));
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
    
    return (
      <CDateRangePicker 
        footer 
        placeholder={['Fecha desde', 'Fecha hasta']}
        format='d/M/yyyy'
        onStartDateChange={(date) => handleStartDateChange(date)}
        onEndDateChange={(date) => handleEndDateChange(date)}
        onConfirm={() => handleConfirm()}
        disabledDates={disabledDates ? disabledDates : []}
      />      
    );
  };

  export default Dates