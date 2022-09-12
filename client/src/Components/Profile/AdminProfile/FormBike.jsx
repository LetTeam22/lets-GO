import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
import { BsCameraFill } from "react-icons/bs";
import theme from "../MaterialUIColors";
import { ThemeProvider } from "@emotion/react";
import swal from "sweetalert";
import ValidateFunctionAdmin from "./ValidateFunctionAdmin";
import s from './FormBike.module.css'

export default function FormBike() {
  const image =
    "https://res.cloudinary.com/pflet/image/upload/v1662686111/Let/image/persona_logeada_hatkhk.png";
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({
    name: "",
    description: "",
    type: "",
    image: "",
    traction: "",
    wheelSize: "",
    price: "",
    color: "",
  });
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(undefined);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
    if (e.target.id === "image")
      setPhoto(URL.createObjectURL(e.target.files[0]));
    setErrors(
      ValidateFunctionAdmin(
        {
          ...input,
          [e.target.id]: e.target.value,
        },
        e.target.id,
        errors
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await dispatch(
    //   createBike(input)
    // );
    setInput({
        name: "",
        description: "",
        type: "",
        image: "",
        traction: "",
        wheelSize: "",
        price: "",
        color: "",
    });
    return swal("Felicidades!", "Agregaste una nueva bicicleta!", "success");
  };
  const disabled = Object.keys(errors).length > 0 || !(input.name || input.description || input.type || input.image || input.traction || input.wheelSize || input.price || input.color)?
    true: false;

  return (
    <div className={s.container}>
      <h3 className={s.titulo}>Agrega una nueva Bicicleta</h3>
      <div className={s.nameAndImg}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          className={s.imgContainer}
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleChange}
            value={input.image}
            id="image"
          />
          <img src={photo ? photo : image} alt='photoBike' className={s.img} />
          <BsCameraFill className={s.iconCamera} />
        </IconButton>
      </div>
      <form className={s.form} onSubmit={handleSubmit}>
        <ThemeProvider theme={theme}>
          <FormControl>
            <InputLabel htmlFor="name">
              {"Nombre"}
            </InputLabel>
            <Input
              id="name"
              aria-describedby="my-helper-text"
              error={errors.name ? true : false}
              value={input.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="type">
              {"Tipo"}
            </InputLabel>
            <Input
              id="type"
              aria-describedby="my-helper-text"
              error={errors.type ? true : false}
              value={input.type}
              onChange={handleChange}
            />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="traction">
              {"Tracción"}
            </InputLabel>
            <Input
              id="traction"
              aria-describedby="my-helper-text"
              error={errors.traction ? true : false}
              type="tel"
              placeholder="16-20-24-26-29"
              value={input.traction}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            variant="contained"
            color="success"
            className={s.btnHome}
            onClick={() => history.goBack()}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            endIcon={<IoSend />}
            className={s.btnSend}
            type="submit"
            disabled={disabled}
          >
            Enviar
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
}
