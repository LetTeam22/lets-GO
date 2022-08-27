import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
import { Loading } from '../Loading/Loading';
import theme from "./MaterialUIColors";
import s from "./Profile.module.css";
import { ThemeProvider } from "@emotion/react";

export const Profile = () => {
  const { user, isLoading } = useAuth0();
  const history = useHistory();
  console.log(user);
  if (isLoading) return <Loading/>
  
  return (
    <>
      <div className={s.container}>
        <div className={s.nameAndImg}>
          <h2>{user.name}</h2>
          <img src={user.picture} alt={user.name} className={s.img} />
        </div>
        <form className={s.form}>
          <ThemeProvider theme={theme}>
            <FormControl>
              <InputLabel htmlFor="firstName">Nombre</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="lastName">Apellido</InputLabel>
              <Input id="lastName" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text"></FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="cellphone">Telefono</InputLabel>
              <Input id="cellphone" aria-describedby="my-helper-text" />
            </FormControl>
            <Button
              variant="contained"
              endIcon={<IoSend />}
              className={s.btnSend}
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
    </>
  );
};
