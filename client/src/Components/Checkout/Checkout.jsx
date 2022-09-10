import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setParameters, postBookings } from "../../Redux/actions";
import emailjs from '@emailjs/browser';
import { useAuth0 } from "@auth0/auth0-react";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function Checkout() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useAuth0();
    const bookings = useSelector(state => state.checkoutBookings)

    const sendEmail = (e) => {
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { email: user?.email }, PUBLIC_KEY)
            .then((result) => {
            }, (error) => {
            });
    }

    console.log(bookings)

    useEffect(() => {
        window.scrollTo(0, 0);
    },)

    const handleClick = (e) => {
        dispatch(setParameters("resetAllPlusDates"));
        dispatch(postBookings(bookings))
        localStorage.removeItem("booking");
        localStorage.removeItem("date");
        sendEmail(e)
        history.push('/home')
    }

    return (
        <>
            <h1>
                Felicidades por tu compra
            </h1>
            <button onClick={e => handleClick(e)}>HOME</button>
        </>
    )
}