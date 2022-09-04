import React, { useState, useEffect } from "react";
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
import image from "../../../image/persona_logeada.png";
import ValidateFunctionAdmin from "./ValidateFunctionAdmin";
import { getUser, updateUser } from "../../../Redux/actions";
import background from "../../../image/fondo_huellas.png";
import { AdminSearchBar } from "./SearchBar/AdminSearchBar";
import RenderOneImage from "../../Cloudinary/renderOneImage";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export const AdminProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth0();
  const history = useHistory();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    cellphone: "",
    profilePic: "",
    userName: "",
  });
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(undefined);
  const [bookings, setBookings] = useState("");
  const [users, setUsers] = useState("");
  const userToModify = useSelector((state) => state.user);

  useEffect(() => {
    axios("/bookings").then((res) => setBookings(res.data));
    axios("/user/getAll").then((res) => setUsers(res.data));
  }, []);

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
      profilePic: "",
      userName: "",
    });
    // history.push(
    //   localStorage.getItem("url") ? localStorage.getItem("url") : "/"
    // );
    dispatch(getUser(userToModify.email));
    return swal("Felicidades!", "Tus datos fueron modificados!", "success");
  };
  const disabled = userToModify.email
    ? Object.keys(errors).length > 0 ||
      !(input.firstName || input.lastName || input.cellphone || input.userName)
    : true;

  const rows = users.map((user) => {
    return {
      id: user.idUser,
      col1: user.firstName,
      col2: user.lastName,
      col3: user.email,
      col4: user.isAdmin ? "Administrador" : "Usuario",
    };
  });
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "col1", headerName: "Nombre", width: 100 },
    { field: "col2", headerName: "Apellido", width: 100 },
    { field: "col3", headerName: "Email", width: 100 },
    { field: "col4", headerName: "Status", width: 100 },
  ];

  return (
    <section className={s.allPage}>
      {/* {probando cloudinary} */}
      {/* <RenderOneImage publicId={'cld-sample-4'}></RenderOneImage>
      <RenderOneImage publicId={'cld-sample-5'}></RenderOneImage>
      <RenderOneImage publicId={'cld-sample-3'}></RenderOneImage>
      <RenderOneImage publicId={'cld-sample-2'}></RenderOneImage>
      <RenderOneImage publicId={'cld-sample'}></RenderOneImage> */}
      <div className={s.bookings}>
        <h2>Reservas</h2>
        {bookings
          ? bookings.map((book) => {
              return (
                <div key={book.idBooking}>
                  <p>
                    Desde {book.startDate} hasta {book.endDate}
                  </p>
                  <p>Bicicletas reservadas</p>
                  <ul>
                    {book.bikes.map((bike) => {
                      return <li key={bike.name}>{bike.name}</li>;
                    })}
                  </ul>
                </div>
              );
            })
          : null}
      </div>
      <div className={s.container}>
        <h3 className={s.titulo}>Modificar datos de usuarios</h3>
        <AdminSearchBar />
        <div className={s.nameAndImg}>
          <h4>{userToModify.userName ? userToModify.userName : "Usuario"}</h4>
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
            <p className={s.dato}>Usuario</p>
            <FormControl>
              <InputLabel htmlFor="userName">
                {userToModify.userName ? userToModify.userName : "Vacío"}
              </InputLabel>
              <Input
                id="userName"
                aria-describedby="my-helper-text"
                error={errors.userName ? true : false}
                value={input.userName}
                onChange={handleChange}
              />
            </FormControl>
            <p className={s.dato}>Nombre</p>
            <FormControl>
              <InputLabel htmlFor="firstName">
                {userToModify.firstName ? userToModify.firstName : "Vacío"}
              </InputLabel>
              <Input
                id="firstName"
                aria-describedby="my-helper-text"
                error={errors.firstName ? true : false}
                value={input.firstName}
                onChange={handleChange}
              />
            </FormControl>
            <p className={s.dato}>Apellido</p>
            <FormControl>
              <InputLabel htmlFor="lastName">
                {userToModify.lastName ? userToModify.lastName : "Vacío"}
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
            <p className={s.dato}>Teléfono</p>
            <FormControl>
              <InputLabel htmlFor="cellphone">
                {userToModify.cellphone ? userToModify.cellphone : "Vacío"}
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
      <div className={s.users}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          get
        />
      </div>

      <img src={background} alt="fondo" className={s.background} />
    </section>
  );
};
