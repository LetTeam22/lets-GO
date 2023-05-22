import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { ThemeProvider } from "@emotion/react";
import { getAllAdventures } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import Action from "./Action";
import s from "./Adventures.module.css";
import FormAdventures from "./FormAdventures";


export default function Adventures() {
  const adventures = useSelector((state) => state.allAdventures);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [addAdv, setAddAdv] = useState(false);


  useEffect(() => {
    dispatch(getAllAdventures());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <DataGrid
          rows={rowsAccs}
          columns={columnsAccs}
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
        <button className={s.editAdv} onClick={addAdvs}>Agregar Aventura</button>
        <div className={addAdv ? s.show : s.hidde}>
          <FormAdventures setAddAdv={setAddAdv} />
        </div>
      </div>
    </ThemeProvider>
  );
}
