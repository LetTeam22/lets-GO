import React, { useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { ThemeProvider } from "@emotion/react";
import { getAccesories } from "../../../Redux/actions";
import theme from "../MaterialUIColors";
import Action from "./Action";
import s from "./Accesories.module.css";
import FormAccesories from "./FormAccesories";
import FormPriceAcc from "./FormPriceAcc";
import { Table } from "./Table";
import { useGetElements } from "./usehooks";



export default function Accesories() {
  const accesories = useGetElements({getElements:getAccesories, elements:'accesories'})
  const [rowId, setRowId] = useState(null);
  const [addAcc, setAddAcc] = useState(false);
  const [addPriceAcc, setAddPriceAcc] = useState(false);

  const rowsAccs = useMemo(() => {
    return accesories?.map((accesorie) => {
      return {
        id: accesorie.idAcc,
        name: accesorie.name,
        price: accesorie.price,
        status: accesorie.status,
      };
    });
  }, [accesories]);

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
        width: 120,
        editable: true,
      },
      {
        field: "price",
        headerName: (
          <div>
            Precio <BiEdit className={s.edit} />
          </div>
        ),
        width: 80,
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
        width: 100,
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
          <Action {...{ params, rowId, setRowId, origin: "accesories" }} />
        ),
      },
    ];
  }, [rowId]);

  const addAccs = () => {
    addAcc ? setAddAcc(false) : setAddAcc(true);
  };

  const SetPriceAccs = () => {
    addPriceAcc ? setAddPriceAcc(false) : setAddPriceAcc(true)
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={s.coverGrid}>
        <Table
          setRowId={setRowId}
          rows={rowsAccs}
          columns={columnsAccs}
        />
        <button className={s.editAcc} onClick={addAccs}>Agregar Accesorio</button>
        <button className={s.editAcc} onClick={SetPriceAccs}>Ajustar Precio</button>
        <div className={addAcc ? s.show : s.hidde}>
          <FormAccesories setAddAcc={setAddAcc} />
        </div>
        <div className={addPriceAcc ? s.show : s.hidde}>
          <FormPriceAcc setAddPriceAcc={setAddPriceAcc} />
        </div>
      </div>
    </ThemeProvider>
  );
}
