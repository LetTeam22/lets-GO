import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';

export default function LogIn () {
    const { loginWithRedirect} = useAuth0()
return (
    <Avatar src="/broken-image.jpg" onClick={() => loginWithRedirect()}/>
    // <button >Log in</button>
)
}