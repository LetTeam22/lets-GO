import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setParameters, postBookings } from "../../Redux/actions";
import emailjs from '@emailjs/browser';
import s from './Checkout.module.css'

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function Checkout() {

    const img = 'https://res.cloudinary.com/pflet/image/upload/v1663030250/Let/image/compra-07_xzwr6e.png'

    const dispatch = useDispatch();

    const userEmail = localStorage.getItem('email');


    const sendEmail = () => {
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { email: userEmail }, PUBLIC_KEY)
            .then((result) => {
            }, (error) => {
            })
    }

    const booking = JSON.parse(localStorage.getItem('postedBooking'));
   
    async function checkOut() {
        await sendEmail();
        await dispatch(setParameters("resetAllPlusDates"));
        await dispatch(postBookings(booking))
    };

    useEffect(() => {
        checkOut();
        window.scrollTo(0, 0);
        localStorage.removeItem("booking");
        localStorage.removeItem("date");
        localStorage.removeItem("adventure");
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={s.background}>
            <Link to='/home' className={s.container}>
                <img src={img} className={s.img} alt='img' />
                <button className={s.btnHome}>¡OK!</button>
            </Link>
        </div>
    )
}