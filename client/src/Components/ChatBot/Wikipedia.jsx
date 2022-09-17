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

    const traccion = () => {
        if (input?.seleccion.value === "e") {
            setInput({
                busqueda: input.seleccionElectrica.value
            });
            console.log(input.seleccionElectrica.value)
        }

        if (input?.seleccion.value === "m") {
            setInput({
                busqueda: input.seleccionMecanica.value,
            });
            console.log(input.seleccionMecanica.value)
        }
    }

    useEffect(() => {
        traccion()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    const style={
        color: "white",
        fontWeight: "bold"
    }


    return (
        <div>
            
            <div>
                <p style={{ fontSize: "14px", fontFamily: "Roboto" }}>En este enlace de Wikipedia podrás encontrar más información: </p>
                <a style={style} href={"https://es.wikipedia.org/wiki/" + input.busqueda} target="_blank">{input.busqueda}</a>
                {/* {console.log(input.busqueda)} */}
            </div>
        
        </div>
    )




}
export default Wikipedia;