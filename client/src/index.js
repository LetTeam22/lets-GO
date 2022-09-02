import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { store } from './Redux/store'
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const postLoginLocal = 'http://localhost:3000/postLogin';
const postLoginDeploy = 'https://pf-let.vercel.app/postLogin';

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";


ReactDOM.render(
  <Provider store = {store} >
    <BrowserRouter>
      <Auth0Provider domain={domain} clientId={clientID} redirectUri={ process.env.REACT_APP_AUTH0_REDIRECT ? postLoginDeploy : postLoginLocal } >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
