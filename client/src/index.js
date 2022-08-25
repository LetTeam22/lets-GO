import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const {REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID} = process.env
console.log(REACT_APP_AUTH0_DOMAIN)
console.log(REACT_APP_AUTH0_CLIENT_ID)
console.log(process.env)
ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider domain='dev-wa153fm3.us.auth0.com' clientId='yIYBjSJoScCDVa3oug1Zw8okSyloqVb3' redirectUri={window.location.origin}>
      <App />
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
