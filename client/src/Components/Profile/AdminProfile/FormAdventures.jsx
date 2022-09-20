import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAdventure } from "../../../Redux/actions";
import validateFunctionAdvs from "./ValidateFunctionAdvs";
import s from "./FormAdventures.module.css";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
  IconButton,
  TextField,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
import { BsCameraFill } from "react-icons/bs";
import theme from "../MaterialUIColors";
import { ThemeProvider } from "@emotion/react";
import swal from "sweetalert";

export default function FormAdventures({ setAddAdv }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    description: "",
    conditions: "",
    difficulty: "",
    image: "",
    price: "",
    date: [],
  });
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(undefined);
  const cloudName = "pflet";
  const [toUpload, setToUpload] = useState(null);
  const adventure =
    "https://res.cloudinary.com/pflet/image/upload/v1662748275/Let/image/adv_hyo69c.png";

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "image") {
      setPhoto(URL.createObjectURL(e.target.files[0]));
      setToUpload(e.target.files[0]);
    }
    setErrors(
      validateFunctionAdvs(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        e.target.name,
        errors
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    swal({
      title: "Estas seguro?",
      text: "Estas creando una nueva aventura!",
      buttons: {
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
      },
    }).then(async (value) => {
      if (value) {
        swal({
          title: "Felicidades!",
          text: "Agregaste una nueva aventura!",
          icon: "success",
          button: false,
        });
        setAddAdv(false);
        setPhoto(undefined);
        const data = new FormData();
        data.append("file", toUpload);
        data.append("upload_preset", "Adventures");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        dispatch(createAdventure({ ...input, image: file.url }));
        setInput({
          name: "",
          description: "",
          conditions: "",
          difficulty: "",
          image: "",
          price: "",
          date: [],
        });
      }
    });
  };
  const disabled =
    Object.keys(errors).length > 0 ||
    !input.name ||
    !input.description ||
    !input.image ||
    !input.price ||
    !input.conditions ||
    !input.date ||
    !input.difficulty
      ? true
      : false;

  const back = () => {
    setAddAdv(false);
  };

  console.log(input);
  console.log(errors)

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  const handleCheck = (e) => {
    setInput({
      ...input,
      date: e.target.checked
        ? [...input.date, e.target.id]
        : [...input.date].filter((day) => day !== e.target.id),
    });
  };

  return (
    <section className={s.allPage}>
      <div className={s.back} onClick={back}></div>
      <div className={s.container}>
        <h3 className={s.titulo}>Agrega una nueva Aventura</h3>
        <ThemeProvider theme={theme}>
          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.nameAndPrice}>
              <FormControl className={s.name}>
                <InputLabel htmlFor="name">{"Nombre"}</InputLabel>
                <Input
                  name="name"
                  aria-describedby="my-helper-text"
                  error={errors.name ? true : false}
                  value={input.name}
                  onChange={handleChange}
                />
              </FormControl>
              <section>
                <h6 className={s.h6}>Días disponibles</h6>
                <section className={s.boxes}>
                  {days.map((day) => {
                    return (
                      <>
                        <input
                          key={day}
                          id={day}
                          name="date"
                          type="checkbox"
                          onClick={handleCheck}
                        />
                        <label className={s.day} htmlFor={day}>
                          {day}
                        </label>
                      </>
                    );
                  })}
                </section>
                <div>
                  <FormControl variant="standard">
                    <InputLabel id="difficulty">Dificultad</InputLabel>
                    <Select
                      labelId="difficulty"
                      name="difficulty"
                      value={input.difficulty}
                      onChange={handleChange}
                      label="difficulty"
                    >
                      <MenuItem value="baja">Baja</MenuItem>
                      <MenuItem value="media">Media</MenuItem>
                      <MenuItem value="alta">Alta</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="price">{"Precio"}</InputLabel>
                    <Input
                      name="price"
                      aria-describedby="my-helper-text"
                      error={errors.price ? true : false}
                      type="tel"
                      placeholder="$1.000 - $99.999"
                      value={input.price}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
              </section>
            </div>
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
                  name="image"
                />
                  {photo ? (
                    <div className={s.divImg}>
                      <img src={photo} alt="photoAcc" className={s.img} />
                    </div>
                  ) : (
                    <div className={s.divImg}>
                      <img src={adventure} className={s.icon} alt="aventura" />
                    </div>
                  )}
                <BsCameraFill className={s.iconCamera} />
              </IconButton>
            </div>

            <Button
              variant="contained"
              color="success"
              className={s.btnHome}
              onClick={() => {
                setAddAdv(false);
                setPhoto(undefined);
              }}
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
              Crear
            </Button>
          </form>
          <TextField
            name="description"
            label="Descripción"
            multiline
            maxRows={2}
            error={errors.description ? true : false}
            value={input.description}
            onChange={handleChange}
            variant="standard"
            className={s.textArea}
          />
          <TextField
            name="conditions"
            label="Conditions"
            multiline
            maxRows={2}
            error={errors.conditions ? true : false}
            value={input.conditions}
            onChange={handleChange}
            variant="standard"
            className={s.textArea}
          />
        </ThemeProvider>
      </div>
    </section>
  );
}
