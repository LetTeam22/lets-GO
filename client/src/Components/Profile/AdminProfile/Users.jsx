import React, { useMemo, useState } from "react";
import { Avatar } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { BiEdit } from "react-icons/bi";
import { getAllUsers } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import RenderProfilePic from "../../Cloudinary/renderProfilePic";
import Action from "./Action";
import s from "./Users.module.css";
import { Table } from "./Table";
import { useGetElements } from "./usehooks";

export default function Users() {
  const users = useGetElements({getElements:getAllUsers, elements:'allUsers'})
  const [rowId, setRowId] = useState(null);

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
        headerName: (
          <div>
            Estado <BiEdit className={s.edit} />
          </div>
        ),
        width: 100,
        type: "singleSelect",
        valueOptions: ["active", "banned"],
        editable: true,
      },
      {
        field: "role",
        headerName: (
          <div>
            Rol <BiEdit className={s.edit} />
          </div>
        ),
        width: 115,
        type: "singleSelect",
        valueOptions: ["Administrador", "Usuario"],
        editable: true,
      },
      {
        field: "action",
        headerName: "Guardar",
        type: "actions",
        width: 110,
        renderCell: (params) => (
          <Action {...{ params, rowId, setRowId, origin: "users" }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <div className={s.users}>
      <ThemeProvider theme={theme}>
        <div className={s.coverGrid}>
          <Table
            setRowId={setRowId}
            rows={rowsUsers}
            columns={columnsUsers}
          />
        </div>
      </ThemeProvider>
    </div>
  );
}
