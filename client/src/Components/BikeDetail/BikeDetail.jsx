import React from 'react';
import { Link } from 'react-router-dom';

export default function BikeDetail () {
    return (
        <>
            <h1> Estas en Bike Detail</h1>
            <Link to={'/home'}>
                <button>go back to Home</button>
            </Link>
        </>
    )
}