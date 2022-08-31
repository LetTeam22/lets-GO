import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import s from './Dates.module.css';

const Dates = () => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const handleFromDate = date => {
      setFromDate(date)
      dispatch(setParameters({...parameters, date: {...parameters.date, from: convertDate(date)}}));    
      dispatch(setCurrentPage(1));
    }

    const handleToDate = date => {
      setToDate(date)
      dispatch(setParameters({...parameters, date: {...parameters.date, to: convertDate(date)}}));    
      dispatch(setCurrentPage(1));
    }
    
    const convertDate = date => { 
      if (!date) return date
      let arr = date.toString().split(' ')
      return `${arr[3]}-${convertMonth(arr[2])}-${arr[1]}`
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
        <div className={s.contain}>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={s.date}
              label="Fecha desde"
              value={fromDate}
              onChange={(date) => {
                handleFromDate(date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <h5> ┊ </h5>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={s.date}
              label="Fecha hasta"
              value={toDate}
              onChange={(date) => {
                handleToDate(date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

    );
  };

  export default Dates