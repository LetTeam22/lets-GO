import React from "react";
import s from "./NavBar.module.css";
import logo from "../../image/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LogIn from "./Authentication/LogIn";
import LogOut from "./Authentication/LogOut";

export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" className={s.icon} />
      </Link>
      {isAuthenticated ? (
        <>
          <LogOut />
          <Link to='/profile'>
          <button >Go to Profile </button>
          </Link>
        </>
      ) : (
        <LogIn />
      )}
    </nav>
  );
}
