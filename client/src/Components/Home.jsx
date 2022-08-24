import React from 'react';
import { Link } from 'react-router-dom';

export default function Home () {
    return (
        <>
            <h1> Estas en Home</h1>
            <Link to={'/'}>
                <button>go to Landing Page</button>
            </Link>
            <Link to={'/profile'}>
                <button>go to Profile</button>
            </Link>
            <Link to={'/bike/:id'}>
                <button>go to Bike Detail</button>
            </Link>
        </>
    )
}