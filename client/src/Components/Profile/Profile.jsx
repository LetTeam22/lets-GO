import React, { useState } from "react";
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
import Loading from '../Loading/Loading';
import theme from "./MaterialUIColors";
import s from "./Profile.module.css";
import { ThemeProvider } from "@emotion/react";

const validate = (input, id) => {
  let errors = {}
  console.log(id)
  if(id === 'firstName' && !/^[A-Z]+$/i.test(input.firstName)) errors.firstName = 'Solo se aceptan letras'
  if(id === 'lastName' && !/^[A-Z]+$/i.test(input.lastName)) errors.lastName = 'Solo se aceptan letras'
  if(id === 'cellphone' && !/^[0-9]\d{9}$/.test(input.cellphone)) errors.cellphone = 'Solo se aceptan numeros'
  return errors
}

export const Profile = () => {
  const { user, isLoading } = useAuth0();
  const history = useHistory();
  const [input, setInput] = useState({
    firstName:'',
    lastName:'',
    cellphone:''
  })
  // const [desabled, setDesabled] = useState(true)
  const [errors, setErrors] = useState({})
  // console.log(user);
  if (isLoading) return <Loading/>
  
  const handleChange = e => {
    setInput({
      ...input,
      [e.target.id]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.id]: e.target.value
    }, e.target.id))
  }
  const handleSubmit = e => {
    e.preventDefault()
    setInput({
      firstName:'',
      lastName:'',
      cellphone:''
    })
  }
  // console.log(input)
  const disabled = Object.keys(errors).length > 0 || !input.firstName || !input.lastName || !input.cellphone
  return (
    <>
      <div className={s.container}>
        <div className={s.nameAndImg}>
          <h2>{user.name}</h2>
          <img src={user.picture} alt={user.name} className={s.img} />
        </div>
        <form className={s.form} onSubmit={handleSubmit}>
          <ThemeProvider theme={theme}>
            <FormControl>
              <InputLabel htmlFor="firstName">Nombre</InputLabel>
              <Input id="firstName" aria-describedby="my-helper-text" error={errors.firstName?true:false} value={input.firstName} onChange={handleChange} required/>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="lastName">Apellido</InputLabel>
              <Input id="lastName" aria-describedby="my-helper-text" error={errors.lastName?true:false} value={input.lastName} onChange={handleChange} required/>
              <FormHelperText id="my-helper-text"></FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="cellphone">Telefono</InputLabel>
              <Input id="cellphone" aria-describedby="my-helper-text" error={errors.cellphone?true:false} type="tel" placeholder="0111234567" value={input.cellphone} onChange={handleChange} required/>
            </FormControl>
            <Button
              variant="contained"
              endIcon={<IoSend />}
              className={s.btnSend}
              type='submit'
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
    </>
  );
};
