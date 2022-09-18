import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setParameters, postBookings, postAdvBookings } from "../../Redux/actions";
import emailjs from '@emailjs/browser';
import { useAuth0 } from "@auth0/auth0-react";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function Checkout() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useAuth0();

    const sendEmail = () => {
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { email: user?.email }, PUBLIC_KEY)
            .then((result) => {
            }, (error) => {
            })
    }

    const booking = JSON.parse(localStorage.getItem('postedBooking'));
    const advBookings = JSON.parse(localStorage.getItem('postedAdventures'))

    useEffect(() => {
        async function Maxi() {
            await dispatch(setParameters("resetAllPlusDates"));
            await dispatch(postBookings(booking))
            await dispatch(postAdvBookings(advBookings))
        };
        Maxi();
        window.scrollTo(0, 0);
        localStorage.removeItem("booking");
        localStorage.removeItem("date");
        localStorage.removeItem("adventure");
        sendEmail();
        history.push('/home');
    },)

    return (
        <>
            <h1>
                Felicidades por tu compra
            </h1>
        </>
    )
}