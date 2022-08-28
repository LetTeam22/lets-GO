import { Route, Switch } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { Landing } from './Components/Landing/Landing'
import { Profile } from './Components/Profile/Profile';
import { BikeDetail } from './Components/BikeDetail/BikeDetail';
import { NavBar } from './Components/NavBar/Navbar';
import { Error } from './Components/Error/Error'
import { AllAccesories } from './Components/AllAccessories/AllAccesories';
import { Footer } from './Components/Footer/Footer';
import { Adventure } from './Components/Adventure/Adventure';
import { Promotions } from './Components/Promotions/Promotions';
import { AllExperiencies } from './Components/AllExperiencies/AllExperiencies';
import { Contact } from './Components/Contact/Contact'
import { ShoppingCart } from './Components/ShoppingCart/ShoppingCart';
import Private from './Components/Private/Private';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path= '/' component= { Landing } />
        <Route exact path= '/home' component= { Home } />
        <Route exact path= '/bike/:bikeId' component= { BikeDetail } />
        <Route exact path= '/bike/profile' component= { Profile } />
        <Route exact path= '/bike/privateRoute' component= { Private } />
        <Route exact path= '/allAccessories' component={ AllAccesories } />
        <Route exact path= '/adventure' component={ Adventure } />
        <Route exact path= '/promotions' component={ Promotions } />
        <Route exact path= '/allExperiencies' component={ AllExperiencies } />
        <Route exact path= '/contact' component={ Contact } />
        <Route exact path= '/cart' component={ ShoppingCart } />
        <Route path='*' component={ Error } />
      </Switch>
      <Footer/>
    </>
  )
};

export default App;
