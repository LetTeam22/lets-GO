import React, { useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { ThemeProvider } from "@emotion/react";
import { getAllAdventures } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import Action from "./Action";
import s from "./Adventures.module.css";
import FormAdventures from "./FormAdventures";
import { Table } from "./Table";
import { useGetElements } from "./usehooks";


export default function Adventures() {
  const adventures = useGetElements({getElements:getAllAdventures, elements:'allAdventures'})
  const [rowId, setRowId] = useState(null);
  const [addAdv, setAddAdv] = useState(false);

  const rowsAccs = useMemo(() => {
    return adventures?.map((adventure) => {
      return {
        id: adventure.idAdv,
        name: adventure.name,
        price: adventure.price,
        description: adventure.description,
        conditions: adventure.conditions,
        image: adventure.image,
        difficulty: adventure.difficulty,
        date: adventure.date,
        status: adventure.status,
      };
    });
  }, [adventures]);

  const columnsAccs = useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 50 },
      {
        field: "name",
        headerName: (
          <div>
            Nombre <BiEdit className={s.edit} />
          </div>
        ),
        width: 150,
        editable: true,
      },
      {
        field: "description",
        headerName: (
          <div>
            Descripción <BiEdit className={s.edit} />
          </div>
        ),
        width: 150,
        editable: true,
      },
      {
        field: "conditions",
        headerName: (
          <div>
            Condición <BiEdit className={s.edit} />
          </div>
        ),
        width: 150,
        editable: true,
      },
      {
        field: "image",
        headerName: (
          <div>
            Imagen <BiEdit className={s.edit} />
          </div>
        ),
        width: 120,
        editable: true,
      },
      {
        field: "difficulty",
        headerName: (
          <div>
            Dificultad <BiEdit className={s.edit} />
          </div>
        ),
        width: 100,
        type: "singleSelect",
        valueOptions: ["baja", "media", "alta"],
        editable: true,
      },
      {
        field: "date",
        headerName: (
          <div>
            Fechas <BiEdit className={s.edit} />
          </div>
        ),
        width: 150,
        editable: true,
      },
      {
        field: "price",
        headerName: (
          <div>
            Precio <BiEdit className={s.edit} />
          </div>
        ),
        width: 100,
        type: "number",
        editable: true,
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
          <Action {...{ params, rowId, setRowId, origin: "adventures" }} />
        ),
      },
    ];
  }, [rowId]);

  const addAdvs = () => {
    addAdv ? setAddAdv(false) : setAddAdv(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={s.coverGrid}>
        <Table
        setRowId={setRowId}
        rows={rowsAccs}
        columns={columnsAccs}
        />
        <button className={s.editAdv} onClick={addAdvs}>Agregar Aventura</button>
        <div className={addAdv ? s.show : s.hidde}>
          <FormAdventures setAddAdv={setAddAdv} />
        </div>
      </div>
    </ThemeProvider>
  );
}
