import { Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import BikeDetail from "./Components/BikeDetail";
import Navbar from "./Components/Navbar";
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
