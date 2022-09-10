import React from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import Wikipedia from './Wikipedia'

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
const Chatbot = () => {


// export default class Contenido extends Component {
//     render() {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot 
                    steps={[
                        {
                            id: "1",
                            message: "Hola, ¿cómo estás? Soy LetBot. ¿Cómo es tu nombre?",
                            trigger: "2"
                        },
                        {
                            id: "2",
                            user: true,
                            validator: (value) => {
                                if (/^[A-Z]{1}[a-z]{2,15}$/.test(value)) {
                                    return true;
                                }
                                else {
                                    return 'Recordá empezar con mayúscula';
                                }
                            },
                            trigger: "3"
                        },
                        {
                            id: "3",
                            message: "Hola {previousValue}, ¡qué bueno tenerte por aquí!",
                            trigger: "4"
                        },
                        {
                            id: "4",
                            message: "¿Querés que te ayude a elegir tu Let?",
                            trigger: "5"
                        },
                        {
                            id: "5",
                            options: [
                                {value: "y", label: "Sí", trigger: "6A"},
                                {value: "n", label: "No", trigger: "6B"},
                            ]
                        },
                        {
                            id: "6A",
                            message: "Muy bien. ¿Qué tipo de tracción buscás?",
                            trigger: "seleccion"
                        },
                        {
                            id: "6B",
                            message: "Estaré por aquí si me necesitás. Nos vemos más tarde.",
                            end: true
                        },
                        {
                            id: "seleccion",
                            options: [
                                {value: "e", label: "eléctrica", trigger: "7A"},
                                {value: "m", label: "mecánica", trigger: "7B"},
                            ]
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
                                {value: "MTB", label: "MTB", trigger: "9"},
                                {value: "BMX", label: "BMX", trigger: "9"},
                                {value: "Bicicleta doméstica", label: "City", trigger: "9"},
                                {value: "Tándem (bicicleta)", label: "Tándem", trigger: "9"},
                                {value: "cicloturismo", label: "Touring", trigger: "9"},
                                {value: "bicicleta plegable", label: "Folding", trigger: "9"},
                            ]
                        },
                        {
                            id: "seleccionMecanica",
                            options: [
                                {value: "MTB", label: "MTB", trigger: "9"},
                                {value: "BMX", label: "BMX", trigger: "9"},
                                {value: "Bicicleta doméstica", label: "City", trigger: "9"},
                                {value: "Tándem (bicicleta)", label: "Tándem", trigger: "9"},
                                {value: "cicloturismo", label: "Touring", trigger: "9"},
                                {value: "bicicleta plegable", label: "Folding", trigger: "9"},
                            ]
                        },
                        {
                            id: "9",
                            component: <Wikipedia />,
                            asMessage: true,
                            trigger: "preguntaVuelta"
                        },
                        {
                            id: "preguntaVuelta",
                            message: "¿Te ayudo a elegir otra Let?",
                            trigger: "respuestaVuelta",
                        }, 
                        {
                            id: "respuestaVuelta",
                            options: [
                                {value: "y", label: "Sí", trigger: "6A"},
                                {value: "n", label: "No", trigger: "6B"},
                            ],
                        }
                    ]}
                    {...config} />
            </ThemeProvider>
        )
    // }
}

export default Chatbot