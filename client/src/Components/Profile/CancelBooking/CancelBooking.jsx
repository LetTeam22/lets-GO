import React from "react";
import { updateBooking} from "../../../Redux/actions";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import s from './CancelBooking.module.css'


export const CancelBooking = ({ booking }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleCancelled = e => {
        e.preventDefault()
        dispatch(updateBooking(booking))
        swal('Reserva cancelada. El equipo de lets GO se contactará con vos')
        history.push('/home')
    };

    return (
        <div className={s.box2}>
            <h3 className={s.cancel}>Estas a punto de cancelar la siguiente reserva </h3>
            <span className={s.cancelText}>Fecha: {booking.startDate} / {booking.endDate} </span>
            <span className={s.cancelText}>Precio: ${booking.totalPrice}</span>
            <span className={s.cancel}>¿CONFIRMÁS LA CANCELACIÓN?</span>
            <button className={s.btn} onClick={handleCancelled}>OK</button>
        </div>
    )
};