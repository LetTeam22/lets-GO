import { Route, Switch } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { Landing } from './Components/Landing/Landing'
import { Profile } from './Components/Profile/Profile';
import { BikeDetail } from './Components/BikeDetail/BikeDetail';
import { NavBar } from './Components/NavBar/Navbar';
import Private from './Components/Private/Private';
import { Error } from './Components/Error/Error'
import './App.css';
import AllAccesories from './Components/AllAccessories/AllAccesories';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/bike/:bikeId' component={BikeDetail} />
        <Route exact path='/bike/profile' component={Profile} />
        <Route exact path='/bike/privateRoute' component={Private} />
        <Route exact path='/allAccessories' component={AllAccesories} />
        <Route exact path='/cart' component={ShoppingCart} />
        <Route path='*' component={Error} />
      </Switch>
    </>
  )
};

export default App;
