import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import s from "./Experiences.module.css";
import { useHistory } from "react-router-dom";
import { TiArrowBackOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from "react-redux";
import { getAllExperiences } from "../../../Redux/actions";


export default function Experiences() {
  const experiences = useSelector(state => state.allExperiences)
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllExperiences())
  }, []);

  const rowsExperiences = experiences?.map(exp => {
    return {
      id: exp.idExperience,
      idUser: exp.userIdUser,
      booking: exp.bookingIdBooking,
      description: exp.textExperience,
      status: 'activa'
    };
  });
  const columnsExperiences = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "idUser", headerName: "ID de usuario", width: 100 },
    { field: "booking", headerName: "ID de Reserva", width: 100 },
    { field: "description", headerName: "Descripción", width: 600 },
    { field: "status", headerName: "Estado", width: 80 }
  ];

  const handleClick = () => {
    history.goBack()
  }

  return (
    <div className={s.experiences}>
      <span className={s.goBack} onClick={handleClick}><TiArrowBackOutline/></span>
      <DataGrid
        rows={rowsExperiences}
        columns={columnsExperiences}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        className={s.list}
      />
    </div>
  );
}
