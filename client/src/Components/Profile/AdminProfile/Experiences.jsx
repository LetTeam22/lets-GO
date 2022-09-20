import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { TiArrowBackOutline } from "react-icons/ti";
import { ThemeProvider } from "@emotion/react";
import { getAllExperiences } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import Action from "./Action";
import s from "./Experiences.module.css";

export default function Experiences() {
  let experiences = useSelector((state) => state.allExperiences);
  const history = useHistory();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(getAllExperiences());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (experiences === "Aún no existen experiencias") experiences = [];
  const rowsExperiences = useMemo(() => {
    return experiences?.map((exp) => {
      return {
        id: exp.idExperience,
        booking: exp.bookingIdBooking,
        email: exp.booking.user.email,
        description: exp.textExperience,
        status: exp.status,
      };
    });
  }, [experiences]);

  const columnsExperiences = useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 50 },
      { field: "booking", headerName: "ID de Reserva", width: 100 },
      { field: "email", headerName: "Email de User", width: 220 },
      { field: "description", headerName: "Descripción", width: 600 },
      {
        field: "status",
        headerName: "Estado",
        width: 80,
        type: "singleSelect",
        valueOptions: ["active", "deleted"],
        editable: true,
      },
      {
        field: "action",
        headerName: "Guardar",
        type: "actions",
        width: 80,
        renderCell: (params) => (
          <Action {...{ params, rowId, setRowId, origin: "experiences" }} />
        ),
      },
    ];
  }, [rowId]);

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className={s.experiences}>
      <div className={s.container}>
        <ThemeProvider theme={theme}>
          <div className={s.coverGrid}>
            <span className={s.goBack} onClick={handleClick}>
              <TiArrowBackOutline />
            </span>
            <DataGrid
              rows={rowsExperiences}
              columns={columnsExperiences}
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
