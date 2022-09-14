import React from "react";
import { updateBooking, getBookingsByUserId } from "../../../Redux/actions";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";


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
        <div>
            <h3>Estas a punto de cancelar la siguiente reserva </h3>
            <span>Fecha: {booking.startDate} / {booking.endDate} </span>
            <span>Precio: ${booking.totalPrice}</span>
            <span>¿Confirmás la cancelación?</span>
            <button onClick={handleCancelled}>OK</button>
        </div>
    )
};