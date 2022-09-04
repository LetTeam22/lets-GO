/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import UploadImages from "./UploadImages";
import axios from "axios";
import RenderCreateExp from "../Cloudinary/renderCreateExperience";
import s from "./CreateExperiences.module.css"
import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./MaterialUIColors"
import { IoSend } from "react-icons/io5";
import swal from "sweetalert";
// import { Link, useHistory } from "react-router-dom"


const CreateExperiences = () => {
  // const dispatch= useDispatch();
  // const allExperiences = useSelector(state => state.allExperiences)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    textExperience: "",
    imgExperience: ""
  })

  const history = useHistory()

  const validate = (input) => {
    let errors = {}

    if (!input.textExperience) errors.textExperience = "Debe ingresar una reseña"
    else if (input.textExperience.lenght < 30) errors.textExperience = "Ingrese como mínimo 30 caracteres"
    else if (input.textExperience.lenght > 280) errors.textExperience = "Su reseña no puede superar los 280 carcateres"
    return errors
  }

  const upload = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Experiences");
    setLoading(true)

    const res = await axios.post("https://api.cloudinary.com/v1_1/pflet/image/upload", data)
    const file = await res.data;
    console.log(file)
    setInput({
      ...input,
      imgExperience: file.public_id
    })
    console.log(file.public_id)
    setLoading(false)
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    console.log(input)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.textExperience || !input.imgExperience) {
      return swal("Por favor, completá los campos requeridos")
    } else if (errors.textExperience || errors.imgExperience) {
      return swal("Por favor, revisá los datos ingresados")
    } else {
      setErrors(validate(input))
      // dispatch(postExperience(input))
      setInput({
        textExperience: "",
        imgExperience: ""
      })
      // history.push('/home')
    }
  }

  return (

    <section className={s.allPage}>
      <div className={s.container}>
        <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
          <ThemeProvider theme={theme}>
            <h4 className={s.h4}>Nombre</h4>

            <div>
              <FormControl>
                <TextField
                  // className={s.name}
                  name="textExperience"
                  id="filled-full-width"
                  label="Tu experiencia"
                  style={{ width: "100%", fontSize: "7px" }}
                  helperText="Sumate a los leters que cuentan historias..."
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline
                  rows={4}
                  maxRows={15}
                  aria-describedby="my-helper-text"
                  value={input.textExperience}
                  onChange={handleChange}
                />
              </FormControl>
            </div>

            <div>
              <FormControl>
                <input type="file"
                  name="file"
                  onChange={upload}
                  style={{ fontSize: "12px", color: "grey" }} />
                {loading ? <p style={{ fontSize: "12px", color: "grey" }}>Tu imagen se está cargando...</p> :
                  null
                  // <RenderCreateExp className={s.information} publicId={input.imageExperience} />
                }
              </FormControl>
            </div>

            <Button
              variant="contained"
              endIcon={<IoSend />}
              className={s.btnEdit}
              type="submit"
            //   disabled={disabled}
            >
              Compartir
            </Button>

          </ThemeProvider>
          {/* </form>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input style={{ border: "solid 1px black" }} type="textarea" name="textExperience" value={input.textExperience} onChange={handleChange} />
                <input type="file"
                    placeholder="sube tu imagen"
                    name="file"
                    onChange={upload} />
                {loading ? <h4>Tu imagen se está cargando...</h4> :

                <RenderCreateExp publicId={input.imageExperience}/>

                    // <div>
                    //     <img src={image} style={{ width: "10%" }} alt="img not found" />
                    // </div>
                } */}
        </form>
      </div>
    </section>
  )



}

export default CreateExperiences;