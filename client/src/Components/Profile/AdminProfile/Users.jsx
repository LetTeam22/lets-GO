import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { TiArrowBackOutline } from "react-icons/ti";
import { BiEdit } from 'react-icons/bi';
import { getAllUsers } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import RenderProfilePic from "../../Cloudinary/renderProfilePic";
import Action from "./Action";
import s from "./Users.module.css";

export default function Users() {
  const users = useSelector((state) => state.allUsers);
  const history = useHistory();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

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

  const columnsUsers = useMemo(
    () => [
      {
        field: "profilePic",
        headerName: "Avatar",
        width: 50,
        renderCell: (params) =>
          params.row.profilePic ? (
            <RenderProfilePic
              publicId={params.row.profilePic}
              alt={params.row.email}
            />
          ) : (
            <Avatar src={params.row.profilePic} />
          ),
        sortable: false,
        filterable: false,
      },
      { field: "id", headerName: "id", width: 50 },
      { field: "firstName", headerName: "Nombre", width: 100 },
      { field: "lastName", headerName: "Apellido", width: 100 },
      { field: "email", headerName: "Email", width: 300 },
      {
        field: "status",
        headerName: <div>Estado <BiEdit className={s.edit}/></div>,
        width: 100,
        type: "singleSelect",
        valueOptions: ["active", "banned"],
        editable: true,
      },
      {
        field: "role",
        headerName: <div>Rol <BiEdit className={s.edit}/></div>,
        width: 115,
        type: "singleSelect",
        valueOptions: ["Administrador", "Usuario"],
        editable: true,
      },
      {
        field: "action",
        headerName: "Guardar",
        type: "actions",
        width: 150,
        renderCell: (params) => (
          <Action {...{ params, rowId, setRowId, origin: "users" }} />
        ),
      },
    ],
    [rowId]
  );

  const handleClick = () => {
    history.goBack();
  };
  return (
    <div className={s.users}>
      <div className={s.container}>
        <ThemeProvider theme={theme}>
          <div className={s.coverGrid}>
            <span className={s.goBack} onClick={handleClick}>
              <TiArrowBackOutline />
            </span>
            <DataGrid
              rows={rowsUsers}
              columns={columnsUsers}
              pageSize={pageSize}
              onPageSizeChange={(newNumber) => setPageSize(newNumber)}
              rowsPerPageOptions={[5, 10, 15]}
              className={s.list}
              getRowId={(row) => row.id}
              getRowSpacing={(params) => ({
                top: params.isFirstVisible ? 0 : 5,
                bottom: params.isLastVisible ? 0 : 5,
              })}
              sx={{
                [`& .${gridClasses.row}`]: {
                  bgcolor: (theme) =>
                    theme.palette.mode === "light" ? "#494949" : "#191616",
                },
              }}
              onCellEditCommit={(params) => setRowId(params.id)}
            />
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
