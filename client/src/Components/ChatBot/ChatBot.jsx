import React, { useEffect } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import Wikipedia from './Wikipedia'
import { useState } from 'react'

const Chatbot = () => {

    const [input, setInput] = useState({
        restart: ""
    })

    const theme = {
        background: '#f5f8fb',
        headerBgColor: '#F9B621',
        headerFontColor: '#fff',
        headerFontSize: '16px',
        botBubbleColor: '#F9B621',
        botFontColor: '#fff',
        userBubbleColor: 'grey',
        userFontColor: '#fff',
    }

    const config = {
        floating: true,
        userAvatar: "https://res.cloudinary.com/pflet/image/upload/v1662686111/Let/image/persona_logeada_hatkhk.png"
    };

    const steps = [
        {
            id: "1",
            message: "Hola, ¿cómo estás? Soy LetBot. ¿Cómo es tu nombre?",
            trigger: "2"
        },
        {
            id: "2",
            user: true,
            validator: (value) => {
                if (/^[A-z]{1,15}$/.test(value)) {
                    return true;
                }
                else {
                    return 'Ingresá sólo letras y sin acentos';
                }
            },
            trigger: "3",
            placeholder: "Ingresá aquí tu nombre"

        },
        {
            id: "3",
            message: "{previousValue}, ¡qué bueno tenerte por aquí!",
            trigger: "4",
            delay: 1000
        },
        {
            id: "4",
            message: "¿Puedo ayudarte en algo?",
            trigger: "5",
            delay: 2000

        },
        {
            id: "5",
            options: [
                { value: "y", label: "Sí", trigger: "firstQuestion" },
                { value: "n", label: "No", trigger: "6B" },
            ],

        },

        {
            id: "firstQuestion",
            message: "¿Querés elegir una bici o estás pensando en subirte a una aventura?",
            trigger: "bikeOrAdv"
        },
        
        {
            id: "bikeOrAdv",
            options: [
                { value: "bike", label: "bici", trigger: "6A" },
                { value: "adv", label: "aventura", trigger: "adv" },
            ],
        },

        {
            id: "6A",
            message: "Muy bien. ¿Qué tipo de tracción buscás?",
            trigger: "seleccion",
            delay: 500
        },
        {
            id: "6B",
            message: "Estaré por aquí si me necesitás. Dale click al llamado de abajo y volveré al instante.",
            trigger: 'restart'
        },
        {
            id: 'restart',
            options: [
                { value: "y", label: "¡LetBoooot!", trigger: "again" }],
        },
        {
            id: "again",
            message: "Aquí estoy nuevamente. ¿Necesitás ayuda para tu próxima elección?",
            trigger: "5"
        },

        {
            id: "seleccion",
            options: [
                { value: "e", label: "eléctrica", trigger: "7A" },
                { value: "m", label: "mecánica", trigger: "7B" },
            ],
        },
        {
            id: "7A",
            message: "Veo que tenés ganas de disfrutar el paseo sin cansarte demasiado. ¿Qué modelo preferís?",
            trigger: "seleccionElectrica"
        },
        {
            id: "7B",
            message: "Veo que tenés ganás de hacer algo de ejercicio mientras disfrutás del paseo. ¿Qué modelo preferís?",
            trigger: "seleccionMecanica"
        },
        {
            id: "seleccionElectrica",
            options: [
                { value: "MTB", label: "MTB", trigger: "MTB" },
                { value: "BMX", label: "BMX", trigger: "BMX" },
                { value: "Bicicleta doméstica", label: "City", trigger: "City" },
                { value: "Tándem (bicicleta)", label: "Tándem", trigger: "Tándem" },
                { value: "cicloturismo", label: "Touring", trigger: "Touring" },
                { value: "bicicleta plegable", label: "Folding", trigger: "Folding" },
            ],
        },

        {
            id: "seleccionMecanica",
            options: [
                { value: "MTB", label: "MTB", trigger: "MTB" },
                { value: "BMX", label: "BMX", trigger: "BMX" },
                { value: "Bicicleta doméstica", label: "City", trigger: "City" },
                { value: "Tándem (bicicleta)", label: "Tándem", trigger: "Tándem" },
                { value: "cicloturismo", label: "Touring", trigger: "Touring" },
                { value: "bicicleta plegable", label: "Folding", trigger: "Folding" },
            ]
        },
        {
            id: 'MTB',
            message: "La bicicleta de montaña (en inglés mountain bike MTB) es un tipo de bicicleta diseñada para viajes por la montaña o el campo. Representa un avance importante del ciclismo en el siglo XX al proporcionar a los ciclistas la posibilidad de llegar a lugares que en otro tiempo se consideraban inaccesibles para dicho vehículo.",
            trigger: 9,

        },
        {
            id: 'BMX',
            message: "El BMX (abreviación de Bicycle Motocross) se practica con bicicletas cross con ruedas de 20 pulgadas de diámetro. Abarca dos modalidades: carrera, cuyo objetivo es completar el recorrido en el menor tiempo posible, y estilo libre (freestyle), cuyo objetivo es realizar acrobacias.",
            trigger: 9,

        },
        {
            id: 'City',
            message: "La bicicleta urbana o de paseo, está diseñada para el transporte práctico, a diferencia de las bicicletas que están diseñadas principalmente para actividades de recreo y la competición.",
            trigger: 9,

        },
        {
            id: 'Tándem',
            message: "Esta bicicleta está provista de más de un asiento y más de un par de pedales, pudiendo ser movida por el pedaleo de más de una persona. Aunque te parezca extraño, podés encontrar tándems de alta gama, tanto de ruta como de montaña.",
            trigger: 9,

        },
        {
            id: 'Touring',
            message: "La Let Touring es la bici de cicloturismo por excelencia. El manillar es el típico de las bicis de carretera, por lo que también modifica el sistema de frenado y los cambios así como la postura que se vuelve más ergonómica.",
            trigger: 9,

        },
        {
            id: 'Folding',
            message: "Las plegables son un tipo de bicicleta que incorpora bisagras o codos en el cuadro y manubrio que permiten doblarlas y dejarlas en un tamaño más compacto. Se pueden subir al transporte público, así como introducirse en oficinas, departamentos y otros sitios donde una bicicleta convencional no podría ingresar.",
            trigger: 9,

        },

        {
            id: "adv",
            message: "En este momento tenemos cuatro opciones. Elegí la que prefieras así te cuento un poco más",
            trigger: "optionAdv"
        },
        {
            id: "optionAdv",
            options: [
                { value: "Tafí", label: "Escapada a Tafí del Valle", trigger: "Tafí" },
                { value: "Trasmontaña", label: "Trasmontaña", trigger: "Trasmontaña" },
                { value: "Luna", label: "Luna tucumana", trigger: "Luna" },
                { value: "Yungas", label: "Circuito de las yungas", trigger: "Yungas" },
            ]
        },
        {
            id: "Tafí",
            message: "Tafí del Valle es una ciudad de los Valles Calchaquíes situada a 2.000 msnm. Está rodeada de altas montañas con senderos ideales para andar con tu Let. Animate a esta aventura de dificultad media-alta y escapate a otro mundo.",
            trigger: "preguntaVuelta"
        },
        {
            id: "Trasmontaña",
            message: "Es un rally de mountain bike de dificultad alta que se hace una vez al año con participantes de todo el mundo. ¿Cómo te ves recorriendo 43 kilómetros por senderos con bajadas, subidas y cruces de ríos en medio del cerro? ",
            trigger: "preguntaVuelta"
        },
        {
            id: "Luna",
            message: "La ciudad se llena de encanto por la noche: las luces realzan la grandeza de los sitios históricos y los bares se llenan de gente con ganas de divertirse un rato. Todo esto bajo un cielo con luna tucumana. Subite a tu Let y dejate llevar.",
            trigger: "preguntaVuelta"
        },
        {
            id: "Yungas",
            message: "let's GO te invita a disfrutar de la selva de montaña subido a tu Let. A sólo 12 kilómetros del centro inicia el camino de subida hacia una de las vistas más espectaculares de la ciudad. Ahí te espera San Javier con sus 876 msnm. ¡No te lo pierdas!",
            trigger: "preguntaVuelta"
        },



        {
            id: "9",
            component: <Wikipedia />,
            asMessage: true,
            trigger: "preguntaVuelta",
            delay: 7000
        },
        {
            id: "preguntaVuelta",
            message: "¿Te ayudo a con alguna otra cosa?",
            trigger: "respuestaVuelta",
            delay: 3000
        },
        {
            id: "respuestaVuelta",
            options: [
                { value: "y", label: "Sí", trigger: "firstQuestion" },
                { value: "n", label: "No", trigger: "6B" },
            ],
        }
    ]

    const restart = () => {
        if (input.restart.value === "y") {
            setInput({
                restart: "y"
            })
        }
    }

    useEffect(() => {
        restart()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ThemeProvider theme={theme}>
            <ChatBot
                steps={steps}
                {...config} />
        </ThemeProvider>
    )
}


export default Chatbot