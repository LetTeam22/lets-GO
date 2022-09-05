import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import s from "./Users.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { TiArrowBackOutline } from 'react-icons/ti'


export default function Users () {
  const [users, setUsers] = useState([]);
  const history = useHistory()

  useEffect(() => {
    axios("/user/getAll").then((res) => setUsers(res.data));
  }, []);

  const rowsUsers = users.map((user) => {
    return {
      id: user.idUser,
      col1: user.firstName,
      col2: user.lastName,
      col3: user.email,
      col4: user.isAdmin ? "Administrador" : "Usuario",
    };
  });
  const columnsUsers = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "col1", headerName: "Nombre", width: 150 },
    { field: "col2", headerName: "Apellido", width: 150 },
    { field: "col3", headerName: "Email", width: 300 },
    { field: "col4", headerName: "Status", width: 150 },
  ];

  const handleClick = () => {
    history.goBack()
  }
  return (
    <div className={s.users}>
        <span className={s.goBack} onClick={handleClick}><TiArrowBackOutline/></span>
      <DataGrid
          rows={rowsUsers}
          columns={columnsUsers}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
          className={s.list}
        />
    </div>
  );
}