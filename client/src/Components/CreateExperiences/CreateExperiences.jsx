/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import UploadImages from "./UploadExperience";
// import { Link, useHistory } from "react-router-dom"


const CreateExperiences = (image) =>{
    const dispatch= useDispatch();
    // const allExperiences = useSelector(state => state.allExperiences)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        imageExperience: image,
        textExperience: ""
    })

    const history = useHistory()

    const validate = (input)=> {
        let errors = {}

        if(!input.textExperience) errors.textExperience = "Debe ingresar una reseña"
        else if(input.textExperience.lenght < 30) errors.textExperience = "Ingrese como mínimo 30 caracteres"
        else if(input.textExperience.lenght >280) errors.textExperience = "Su reseña no puede superar los 280 carcateres"
        return errors
    } 
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.textExperience]: e.target.value 
        })
        setErrors(validate({
            ...input,
            [e.target.textExperience]: e.target.value
        }))
        console.log(input)
    }   


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.textExperience || !input.imageExperience) {
            alert("Complete los campos requeridos")
        } else if (errors.name || errors.height_min || errors.height_max || errors.weight_min || errors.weight_max || errors.life_span) {
            alert("Por favor, revise los datos ingresados")
        } else {
            setErrors(validate(input))
            // dispatch(postExperience(input))
            setInput({
               textExperience: "",
               imageExperience: ""
                
            })
            
            
            // history.push('/home')
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="textarea" name="textExperiencie" value={input.textExperiencie} onChange={handleChange}/>
                <UploadImages/>
            </form>
        </div>
    )



}

export default CreateExperiences;