import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBike } from "../../../Redux/actions";
import ValidateFunctionAdmin from "./ValidateFunctionAdmin";
import s from "./FormBike.module.css";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  IconButton,
  TextField,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
import { GiDutchBike } from "react-icons/gi";
import { BsCameraFill } from "react-icons/bs";
import theme from "../MaterialUIColors";
import { ThemeProvider } from "@emotion/react";
import swal from "sweetalert";

export default function FormBike({ setAddBike }) {
  const dispatch = useDispatch();
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
  const cloudName = 'pflet'
  const [toUpload, setToUpload] = useState(null);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
    if (e.target.id === "image")
      setPhoto(URL.createObjectURL(e.target.files[0]));
      setToUpload(e.target.files[0])
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
    const data = new FormData()
    data.append('file',toUpload)
    data.append('upload_preset','ProfilePictures')
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method:'POST',
      body:data
    })
    const file = await res.json() 
    await dispatch(
      createBike({...input, image:file.public_id})
    );
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
    swal({
      title: "Felicidades!",
      text: "Agregaste una nueva bicicleta!",
      icon: "success",
      button: false,
    });
    setAddBike(false);
    setPhoto(undefined)
  };
  const disabled =
    Object.keys(errors).length > 0 ||
    !input.name ||
      !input.description ||
      !input.type ||
      !input.image ||
      !input.traction ||
      !input.wheelSize ||
      !input.price ||
      !input.color
      ? true
      : false;

  return (
    <section className={s.allPage}>
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
            {photo? <img
              src={photo}
              alt="photoBike"
              className={s.img}
            />
            :
            <GiDutchBike className={s.img}/>
            }
            <BsCameraFill className={s.iconCamera} />
          </IconButton>
        </div>
        <form className={s.form} onSubmit={handleSubmit}>
          <ThemeProvider theme={theme}>
            <FormControl>
              <InputLabel htmlFor="name">{"Nombre"}</InputLabel>
              <Input
                id="name"
                aria-describedby="my-helper-text"
                error={errors.name ? true : false}
                value={input.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="type">{"Tipo"}</InputLabel>
              <Input
                id="type"
                aria-describedby="my-helper-text"
                error={errors.type ? true : false}
                placeholder="bmx-city-mtb-tandem-touring-folding"
                value={input.type}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text"></FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="traction">{"Tracción"}</InputLabel>
              <Input
                id="traction"
                aria-describedby="my-helper-text"
                error={errors.traction ? true : false}
                type="tel"
                placeholder="Mecanica - Electrica"
                value={input.traction}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="wheelSize">{"Rodado"}</InputLabel>
              <Input
                id="wheelSize"
                aria-describedby="my-helper-text"
                error={errors.wheelSize ? true : false}
                type="tel"
                placeholder="16-20-24-26-29"
                value={input.wheelSize}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="color">{"Color"}</InputLabel>
              <Input
                id="color"
                aria-describedby="my-helper-text"
                error={errors.color ? true : false}
                value={input.color}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="price">{"Precio"}</InputLabel>
              <Input
                id="price"
                aria-describedby="my-helper-text"
                error={errors.price ? true : false}
                type="tel"
                placeholder="$100 - $9999"
                value={input.price}
                onChange={handleChange}
              />
            </FormControl>
            <TextField
              id="description"
              label="Descripción"
              multiline
              maxRows={5}
              value={input.description}
              onChange={handleChange}
              variant="standard"
              className={s.textArea}
            />
            <Button
              variant="contained"
              color="success"
              className={s.btnHome}
              onClick={() => {setAddBike(false); setPhoto(undefined)}}
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
    </section>
  );
}
