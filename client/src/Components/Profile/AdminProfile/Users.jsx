import React, { useEffect, useMemo, useState } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import s from "./Users.module.css";
import { useHistory } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import { ThemeProvider } from "@emotion/react";
import Action from "./Action";

export default function Users() {
  const users = useSelector((state) => state.allUsers);
  const history = useHistory();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(8);
  const [rowId, setRowId] = useState(null)

  useEffect(() => {
    dispatch(getAllUsers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const rowsUsers = useMemo(() => {
    return users.map((user) => {
      return {
        profilePic: user.profilePic,
        id: user.idUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.cellphone,
        status: user.status,
        role: user.isAdmin ? "Administrador" : "Usuario",
      };
    });
  }, [users]);

  const columnsUsers = useMemo(() => [
    {
      field: "profilePic",
      headerName: "Avatar",
      width: 50,
      renderCell: (params) => <Avatar src={params.row.profilePic} />,
      sortable: false,
      filterable: false,
    },
    { field: "id", headerName: "id", width: 50 },
    { field: "firstName", headerName: "Nombre", width: 100 },
    { field: "lastName", headerName: "Apellido", width: 100 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      type: "singleSelect",
      valueOptions: ["active", "banned", "deleted"],
      editable: true,
    },
    {
      field: "role",
      headerName: "Rol",
      width: 150,
      type: "singleSelect",
      valueOptions: ["Administrador", "Usuario"],
      editable: true,
    },
    { field: "action", headerName: "Action", type:'actions', width: 150, renderCell: (params) => <Action {...{params,rowId, setRowId, origin:'users'}} /> },
  ], [rowId])

  const handleClick = () => {
    history.goBack();
  };
  return (
    <div className={s.users}>
      <span className={s.goBack} onClick={handleClick}>
        <TiArrowBackOutline />
      </span>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rowsUsers}
          columns={columnsUsers}
          pageSize={pageSize}
          onPageSizeChange={(newNumber) => setPageSize(newNumber)}
          rowsPerPageOptions={[8, 16, 32]}
          className={s.list}
          getRowId={(row) => row.id}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? '#494949'
                  : '#191616',
            },
          }}
          onCellEditCommit={(params) => setRowId(params.id)}
        />
      </ThemeProvider>
    </div>
  );
}
