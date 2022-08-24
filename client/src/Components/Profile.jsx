import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile () {
    return (
        <>
            <h1> Estas en Profile</h1>
            <Link to={'/home'}>
                <button>go back to Home</button>
            </Link>
        </>
    )
}