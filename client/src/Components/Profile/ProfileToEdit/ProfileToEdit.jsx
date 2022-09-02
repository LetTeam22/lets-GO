import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
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
import s from "./ProfileToEdit.module.css";
import Loading from "../../Loading/Loading";
import image from "../../../image/persona_logeada.png";
import validate from "../validateFunction";
import { updateUser } from "../../../Redux/actions";
import background from "../../../image/fondo_huellas.png";

export const ProfileToEdit = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth0();
  const userLogged = useSelector((state) => state.user);
  const history = useHistory();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    cellphone: "",
    profilePic: "",
  });
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(undefined);
  if (isLoading) return <Loading />;
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
    if (e.target.id === "profilePic")
      setPhoto(URL.createObjectURL(e.target.files[0]));
    setErrors(
      validate(
        {
          ...input,
          [e.target.id]: e.target.value,
        },
        e.target.id,
        errors
      )
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({ ...input, email: user.email, profilePic: `${photo}` })
    );
    setInput({
      firstName: "",
      lastName: "",
      cellphone: "",
      profilePic: "",
    });
    history.push(
      localStorage.getItem("url") ? localStorage.getItem("url") : "/"
    );
    return swal("Felicidades!", "Tus datos fueron modificados!", "success");
  };
  const disabled = Object.keys(errors).length > 0;
  const name =
    (userLogged.firstName &&
      userLogged.firstName +
        " " +
        (userLogged.lastName && userLogged.lastName)) ||
    user?.name;
  return (
    <>
      <div className={s.container}>
        <div className={s.nameAndImg}>
          <h2>{name}</h2>
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
              value={input.profilePic}
              id="profilePic"
            />
            <img
              src={photo ? photo : image}
              alt={user.name}
              className={s.img}
            />
            <BsCameraFill className={s.iconCamera} />
          </IconButton>
        </div>
        <form className={s.form} onSubmit={handleSubmit}>
          <ThemeProvider theme={theme}>
            <FormControl>
              <InputLabel htmlFor="firstName">Nombre</InputLabel>
              <Input
                id="firstName"
                aria-describedby="my-helper-text"
                error={errors.firstName ? true : false}
                placeholder={`${userLogged?.firstName}`}
                value={input.firstName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="lastName">Apellido</InputLabel>
              <Input
                id="lastName"
                aria-describedby="my-helper-text"
                error={errors.lastName ? true : false}
                placeholder={`${userLogged.lastName}`}
                value={input.lastName}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text"></FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="cellphone">Telefono</InputLabel>
              <Input
                id="cellphone"
                aria-describedby="my-helper-text"
                error={errors.cellphone ? true : false}
                placeholder={`${userLogged?.cellphone}`}
                type="tel"
                value={input.cellphone}
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
              Send
            </Button>
          </ThemeProvider>
        </form>
      </div>
      <Button
        variant="contained"
        color="success"
        className={s.btnHome}
        onClick={() => history.push("/")}
      >
        Go Home
      </Button>
      <img src={background} alt="fondo" className={s.background} />
    </>
  );
};
