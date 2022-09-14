import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccesorie } from "../../../Redux/actions";
import validateFunctionAccs from "./ValidateFunctionAccs";
import s from "./FormAccesories.module.css";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
import { MdHandyman } from "react-icons/md";
import { BsCameraFill } from "react-icons/bs";
import theme from "../MaterialUIColors";
import { ThemeProvider } from "@emotion/react";
import swal from "sweetalert";

export default function FormBike({ setAddAcc }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(undefined);
  const cloudName = "pflet";
  const [toUpload, setToUpload] = useState(null);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
    if (e.target.id === "image") {
      setPhoto(URL.createObjectURL(e.target.files[0]));
      setToUpload(e.target.files[0]);
    }
    setErrors(
      validateFunctionAccs(
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
    swal({
      title: "Estas seguro?",
      text: "Estas creando un nuevo accesorio!",
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
          text: "Agregaste un nuevo accesorio!",
          icon: "success",
          button: false,
        });
        setAddAcc(false);
        setPhoto(undefined);
        const data = new FormData();
        data.append("file", toUpload);
        data.append("upload_preset", "ProfilePictures");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        dispatch(createAccesorie({ ...input, image: file.public_id }));
        setInput({
          name: "",
          image: "",
          price: "",
          description: "",
        });
      }
    });
  };
  const disabled =
    Object.keys(errors).length > 0 ||
    !input.name ||
    !input.description ||
    !input.image ||
    !input.price
      ? true
      : false;

  const back = () => {
    setAddAcc(false);
  };
  return (
    <section className={s.allPage}>
      <div className={s.back} onClick={back}></div>
      <div className={s.container}>
        <h3 className={s.titulo}>Agrega un nuevo Accesorio</h3>
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
            {photo ? (
              <img src={photo} alt="photoAcc" className={s.img} />
            ) : (
              <MdHandyman className={s.img} />
            )}
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
              <InputLabel htmlFor="price">{"Precio"}</InputLabel>
              <Input
                id="price"
                aria-describedby="my-helper-text"
                error={errors.price ? true : false}
                type="tel"
                placeholder="$10 - $999"
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
              onClick={() => {
                setAddAcc(false);
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
          </ThemeProvider>
        </form>
      </div>
    </section>
  );
}
