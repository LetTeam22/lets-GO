import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { BiEdit } from "react-icons/bi";
import { ThemeProvider } from "@emotion/react";
import { getAllExperiences } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import Action from "./Action";
import s from "./Experiences.module.css";
import { Sentiment } from "./Sentiment";
import { Summary } from "./Summary";
import { LanguageExp } from "./LanguageExp";
import { ModalExperience } from "./ModalExperience";
import { ModalTextExperience } from './ModalTextExperience'

export default function Experiences() {
  let experiences = useSelector((state) => state.allExperiences);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [show, setShow] = useState(null);
  const [showText, setShowText] = useState(null);


  useEffect(() => {
    dispatch(getAllExperiences());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (experiences === "Aún no existen experiencias") experiences = [];
  const rowsExperiences = useMemo(() => {
    return experiences?.map((exp) => {
      return {  
        id: exp.idExperience,
        booking: exp.bookingIdBooking,
        email: exp.email,
        description: exp.summary,
        sentiment: exp.sentiment,
        language: exp.language,
        status: exp.status,
        translation: exp.translation,
        textExperience: exp.textExperience
      };
    });
  }, [experiences]);

  const showExperience = (experienceId) => {
    setShow(experienceId)
  }

  const showTextExperience = (textExperience, translation) => {
    setShowText(textExperience, translation)
  }

  const columnsExperiences = useMemo(() => {
    return [
      { field: "id", headerName: "Nº Exp.", width: 70 },
      { field: "booking", headerName: "N° Res.", width: 70 },
      { field: "email", headerName: "Usuario", width: 220 },
      { 
        field: "description", 
        headerName: "Resumen Español", 
        width: 250,
        renderCell: (params) => <Summary {...{ params, showFcn:showExperience }}/>,
      },
      { field: "sentiment", 
        headerName: "Sentimiento", 
        width: 120,
        renderCell: (params) => <Sentiment params={params}/>,
       },
      { field: "language",
        headerName: "Idioma Original",
        width: 130,
        renderCell: (params) => <LanguageExp params={params} showTextExperience={showTextExperience}/>,
      },
      {
        field: "status",
        headerName: (
          <div>
            Estado <BiEdit className={s.edit} />
          </div>
        ),
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

  return (
    <>
    <ThemeProvider theme={theme}>
      <div className={s.coverGrid}>
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
    <div className={!!show? s.modalWindow : s.hide}>
      <span className={s.background} onClick={() => setShow(null)}></span>
      <ModalExperience experienceId={show} />
    </div>
    <div className={!!showText? s.modalWindow : s.hide}>
      <span className={s.background} onClick={() => setShowText(null)}></span>
      <ModalTextExperience showText={showText} />
    </div>
    </>
  );
}
