import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { increasePrice } from "../../../Redux/actions";
import s from "./FormPriceBike.module.css";
import {
  FormControl,
  Button,
  TextField,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
import theme from "../MaterialUIColors";
import { ThemeProvider } from "@emotion/react";
import swal from "sweetalert";

const validatePercentage = (value) => {
  if (Number(value) === "NaN") return { percentage: "debe colocar un numero" };
  if (value < 0 || value > 100)
    return { percentage: "colocar un numero entre 0 y 100" };
  return {};
};

export default function FormPriceBike({ setAddPrice }) {
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(0);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPercentage(e.target.value);
    setErrors(validatePercentage(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(increasePrice({ percentage: percentage/100 }));
    setPercentage("");
    swal({
      title: "Felicidades!",
      text: "Aumentaste los precios de todas las bicicletas!",
      icon: "success",
      button: false,
    });
    setAddPrice(false);
  };
  const disabled = Object.keys(errors).length > 0 || !percentage ? true : false;

  return (
    <section className={s.allPage}>
      <div className={s.container}>
        <h3 className={s.titulo}>
          Aumenta los precios de todas las Bicicletas
        </h3>
        <form className={s.form} onSubmit={handleSubmit}>
          <ThemeProvider theme={theme}>
            <div>
              <FormControl>
                <TextField
                  id="percentage"
                  label="Porcentaje"
                  aria-describedby="my-helper-text"
                  error={errors.percentage ? true : false}
                  helperText={errors.percentage ? errors.percentage : ""}
                  variant="standard"
                  value={percentage}
                  type="number"
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                variant="contained"
                endIcon={<IoSend />}
                className={s.btnSend}
                type="submit"
                disabled={disabled}
              >
                Aumentar
              </Button>
            </div>
            <Button
              variant="contained"
              color="success"
              className={s.btnHome}
              onClick={() => {
                setAddPrice(false);
                setAddPrice(undefined);
              }}
            >
              Volver
            </Button>
          </ThemeProvider>
        </form>
      </div>
    </section>
  );
}
