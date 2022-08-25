import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, isLoading } = useAuth0();
  console.log(user)
  if (isLoading) return <h1>Loading...</h1>
  return (
    <>
      <h1> Estas en Profile</h1>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <Link to={"/"}>
        <button>go back to Home</button>
      </Link>
    </>
  );
}
