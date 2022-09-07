import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import s from "./Accesories.module.css";
import { useHistory } from "react-router-dom";
import { TiArrowBackOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from "react-redux";
import { getAccesories } from "../../../Redux/actions";


export default function Bikes() {
  const accesories = useSelector(state => state.accesories)
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAccesories())
  }, []);

  const rowsAccs = accesories?.map(accesorie => {
    return {
      id: accesorie.idAcc,
      name: accesorie.name,
      image: accesorie.image,
      price: accesorie.price,
      stock: 20
    };
  });
  const columnsAccs = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "price", headerName: "Precio", width: 80 },
    { field: "stock", headerName: "Stock", width: 100 },
  ];

  const handleClick = () => {
    history.goBack()
  }


  return (
    <div className={s.accesories}>
      <span className={s.goBack} onClick={handleClick}><TiArrowBackOutline/></span>
      <DataGrid
        rows={rowsAccs}
        columns={columnsAccs}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        className={s.list}
      />
    </div>
  );
}
