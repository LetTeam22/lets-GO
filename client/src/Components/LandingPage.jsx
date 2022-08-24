import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage () {
    return (
        <>
            <h1> Estas en la Landing Page</h1>
            <Link to={'/home'}>
                <button>go to home</button>
            </Link>
        </>
    )
}