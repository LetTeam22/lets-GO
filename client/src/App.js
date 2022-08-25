import { Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import BikeDetail from "./Components/BikeDetail/BikeDetail";
import NavBar from './Components/NavBar/Navbar';

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/bike/:id">
        <BikeDetail />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </>
  );
}

export default App;
