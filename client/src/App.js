import { Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import BikeDetail from "./Components/BikeDetail/BikeDetail";
import Navbar from "./Components/NavBar/Navbar.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Route path="/">
        <Navbar />
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/home">
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
