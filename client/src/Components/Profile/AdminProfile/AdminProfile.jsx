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
import s from "./AdminProfile.module.css";
import Loading from "../../Loading/Loading";
// import image from "../../../image/persona_logeada.png";
import ValidateFunctionAdmin from "./ValidateFunctionAdmin";
import { getUser, updateUser } from "../../../Redux/actions";
// import background from "../../../image/fondo_huellas.png";
import { AdminSearchBar } from "./SearchBar/AdminSearchBar";
// import RenderOneImage from "../../Cloudinary/renderOneImage";

export const AdminProfile = () => {
  const image = "https://res.cloudinary.com/pflet/image/upload/v1662686111/Let/image/persona_logeada_hatkhk.png"
  const dispatch = useDispatch();
  const userToModify = useSelector((state) => state.user);
  const { user, isLoading } = useAuth0();
  const history = useHistory();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    cellphone: "",
    profilePic: ""
  });
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(undefined);

  if (isLoading) return <Loading />;
  if (!user) history.goBack();
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
    if (e.target.id === "profilePic")
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
    await dispatch(
      updateUser({
        ...input,
        email: userToModify.email,
        profilePic: `${photo}`,
      })
    );
    setInput({
      firstName: "",
      lastName: "",
      cellphone: "",
      profilePic: ""
    });
    dispatch(getUser(userToModify.email));
    return swal("Felicidades!", "Tus datos fueron modificados!", "success");
  };
  const disabled = userToModify.email
    ? Object.keys(errors).length > 0 ||
      !(input.firstName || input.lastName || input.cellphone)
    : true;

  const seeBookings = () => {
    history.push("/adminprofile/bookings");
  };

  const seeUsers = () => {
    history.push("/adminprofile/users");
  };

  const seeBikes = () => {
    history.push('/adminprofile/bikes')
  }

  const seeExperiences = () => {
    history.push('/adminprofile/experiences')
  }

  const seeAccesories = () => {
    history.push('/adminprofile/accesories')
  }

  return (
    <section className={s.allPage}>
      <div className={s.column}>
        <div>
          <h1>Reservas</h1>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeBookings}
            >
            Ver reservas
          </Button>
        </div>
        <div>
          <h1>Usuarios</h1>
          <Button
          variant="contained"
          color="success"
          className={s.btnBook}
          onClick={seeUsers}
        >
          Ver usuarios
        </Button>
        </div>
      </div>
      <div className={s.container}>
        <h3 className={s.titulo}>Modificar datos de usuarios</h3>
        <AdminSearchBar />
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
              <InputLabel htmlFor="firstName">
                {userToModify.firstName ? userToModify.firstName : "Nombre"}
              </InputLabel>
              <Input
                id="firstName"
                aria-describedby="my-helper-text"
                error={errors.firstName ? true : false}
                value={input.firstName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="lastName">
                {userToModify.lastName ? userToModify.lastName : "Apellido"}
              </InputLabel>
              <Input
                id="lastName"
                aria-describedby="my-helper-text"
                error={errors.lastName ? true : false}
                value={input.lastName}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text"></FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="cellphone">
                {userToModify.cellphone ? userToModify.cellphone : "Teléfono"}
              </InputLabel>
              <Input
                id="cellphone"
                aria-describedby="my-helper-text"
                error={errors.cellphone ? true : false}
                type="tel"
                placeholder="0111234567"
                value={input.cellphone}
                onChange={handleChange}
              />
            </FormControl>
            <Button
              variant="contained"
              color="success"
              className={s.btnHome}
              onClick={() => history.push("/")}
            >
              Go Home
            </Button>
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
      <div className={s.column}>
        <div>
          <h2>Bicicletas</h2>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeBikes}
            >
            Ver Bicicletas
          </Button>
        </div>
        <div>
        <h2>Experiencias</h2>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeExperiences}
            >
            Ver Experiencias
          </Button>
        </div>
        <div>
        <h2>Accesorios</h2>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeAccesories}
            >
            Ver Accesorios
          </Button>
        </div>

      </div>

      <img src="https://res.cloudinary.com/pflet/image/upload/v1662686161/Let/image/fondo_huellas_u2a4wr.png" alt="fondo" className={s.background} />
    </section>
  );
};
