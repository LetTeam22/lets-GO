/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';



const Wikipedia = ({ steps }) => {

    const { seleccion, seleccionElectrica, seleccionMecanica } = steps;
    const [input, setInput] = useState({
        seleccion,
        seleccionElectrica,
        seleccionMecanica,
        busqueda: "",
        nombreCurado: ""
    })


    useEffect(() => {

        if (input?.seleccion.value === "e") {
            setInput({
                busqueda: input.seleccionElectrica.value
            });
            console.log(input.seleccionElectrica.value)
        } 
        if(input?.seleccion.value === "m"){
            setInput({
                busqueda: input.seleccionMecanica.value,
            });
            console.log(input.seleccionMecanica.value)
        }
    }, [])
   
        return (
            <div>
                <p style={{fontSize:"14px", fontFamily:"Roboto"}}>En este enlace de Wikipedia podrás encontrar más información sobre {input.busqueda}: </p>
                <a href={"https://es.wikipedia.org/wiki/" + input.busqueda} target="_blank">{input.busqueda}</a>
                {/* {console.log(input.busqueda)} */}
                
            </div>
        )
    



}
export default Wikipedia;