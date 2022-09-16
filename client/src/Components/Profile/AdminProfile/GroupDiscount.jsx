import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import s from "./GroupDiscount.module.css";
import { Button, TextField } from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useDispatch } from "react-redux";
import { discountByGroups } from "../../../Redux/actions/index";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const validateDiscount = (value) => {
    if (Number(value) === "NaN") return { discount: "debe colocar un numero" };
    if (value < 1 || value > 100)
      return { discount: "colocar un numero entre 1 y 100" };
    return {};
  };

export default function GroupDiscount ({ setSeeDiscount, socket }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    wheelSize: "",
    traction: "",
    color: "",
    type: "",
    discount: "",
  });

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    if(event.target.name === 'discount') setErrors(validateDiscount(event.target.value))
  };

  const disabled =
    Object.keys(errors).length > 0 || !input.discount ? true : !input.wheelSize && !input.traction && !input.color && !input.type ? true : false;

    const handleSubmit = (e) => {
        e.preventDefault()
        swal({
            title: "Estas seguro?",
            text: "Vas a aplicar descuentos al grupo de bicicletas seleccionadas!",
            buttons:  {
                cancel: {
                    text: "cancelar",
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                  },
                  confirm: {
                    text: "si",
                    value: true,
                    visible: true,
                    className: s.swalBtn,
                    closeModal: true,
                  },
            }
          })
        .then((value) => {
            if (value) {
                swal({
                    title: "Felicidades!",
                    text: "Agregaste un nuevo descuento!",
                    icon: "success",
                    button: false,
                });
                dispatch(discountByGroups({...input, discount: Number(input.discount)}))
                socket?.emit('newDiscount', input)
                setInput({
                    wheelSize: "",
                    traction: "",
                    color: "",
                    type: "",
                    discount: "",
                  })
                setSeeDiscount(false)
                history.push('/adminprofile')
            }
        })
    }
    const back = () => {
        setSeeDiscount(false)
    }
  return (
    <div className={s.allPage}>
        <div className={s.back} onClick={back}></div>
      <form className={s.container} onSubmit={handleSubmit}>
        <h2 className={s.title}>Genera descuento a un grupo de bicicletas</h2>
        <div className={s.selects}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="wheelSize">Rodado</InputLabel>
            <Select
              labelId="wheelSize"
              name="wheelSize"
              value={input.wheelSize}
              onChange={handleChange}
            >
              <MenuItem value=""><em>Ninguno</em></MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={26}>26</MenuItem>
              <MenuItem value={29}>29</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="traction">Tracción</InputLabel>
            <Select
              labelId="traction"
              name="traction"
              value={input.traction}
              onChange={handleChange}
            >
              <MenuItem value=""><em>Ninguna</em></MenuItem>
              <MenuItem value="mecánica">Mecánica</MenuItem>
              <MenuItem value="eléctrica">Eléctrica</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="color">Color</InputLabel>
            <Select
              labelId="color"
              name="color"
              value={input.color}
              onChange={handleChange}
            >
              <MenuItem value=""><em>Ninguno</em></MenuItem>
              <MenuItem value="negro">negro</MenuItem>
              <MenuItem value="blanco">blanco</MenuItem>
              <MenuItem value="gris">gris</MenuItem>
              <MenuItem value="azul">azul</MenuItem>
              <MenuItem value="verde">verde</MenuItem>
              <MenuItem value="rojo">rojo</MenuItem>
              <MenuItem value="amarillo">amarillo</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="type">Tipo</InputLabel>
            <Select
              labelId="type"
              name="type"
              value={input.type}
              onChange={handleChange}
            >
              <MenuItem value=""><em>Ninguno</em></MenuItem>
              <MenuItem value="city">city</MenuItem>
              <MenuItem value="tandem">tandem</MenuItem>
              <MenuItem value="touring">touring</MenuItem>
              <MenuItem value="folding">folding</MenuItem>
              <MenuItem value="bmx">bmx</MenuItem>
              <MenuItem value="mtb">mtb</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={s.discountAndBtn}>
          <FormControl>
            <TextField
              id="discount"
              label="Descuento en %"
              aria-describedby="my-helper-text"
              error={errors.discount ? true : false}
              helperText={errors.discount ? errors.discount : ""}
              variant="standard"
              value={input.discount}
              type="number"
              name="discount"
              onChange={handleChange}
            />
          </FormControl>
          <Button
            variant="contained"
            endIcon={<LocalOfferIcon/>}
            className={s.btnSend}
            type="submit"
            disabled={disabled}
          >
            Aplicar
          </Button>
        </div>
      </form>
    </div>
  );
}
