import React, { useMemo, useState } from "react";
import { Table } from "./Table";
import { ThemeProvider } from "@emotion/react";
import theme from "../MaterialUIColors";
import { useGetElements } from "./usehooks";
import { getAllContacts } from "../../../Redux/actions";
import s from "./Experiences.module.css";
import { Summary } from "./Summary";
import { ModalContact } from "./ModalContact";

const Contacto = () => {
  const contacts = useGetElements({
    getElements: getAllContacts,
    elements: "allContacts",
  });
  const [show, setShow] = useState(null);

  const showMessage = (message) => {
    setShow(message);
  };

  const rowsContacts = useMemo(() => {
    return contacts?.map((contact) => {
      const {
        idContact,
        phone,
        email,
        message,
        summary,
        sentiment,
        language,
        translation,
      } = contact;
      return {
        id: idContact,
        phone,
        email,
        message,
        summary,
        sentiment,
        language,
        translation,
      };
    });
  }, [contacts]);

  const columnsContacts = useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 50 },
      { field: "email", headerName: "Usuario", width: 220 },
      { field: "phone", headerName: "Telefono", width: 150 },
      {
        field: "summary",
        headerName: "Resumen",
        width: 400,
        renderCell: (params) => <Summary {...{ params, showFcn:showMessage, fromContact:true }} />,
      },
      { field: "sentiment", headerName: "Sentimiento", width: 120 },
      { field: "language", headerName: "Idioma", width: 120 },
    ];
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={s.coverGrid}>
          <Table rows={rowsContacts} columns={columnsContacts} />
        </div>
      </ThemeProvider>
      <div className={!!show ? s.modalWindow : s.hide}>
        <span className={s.background} onClick={() => setShow(null)}></span>
        <ModalContact message={show} />
      </div>
    </>
  );
};

export default Contacto;
