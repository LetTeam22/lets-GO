import React, { useEffect, useState } from 'react';
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
import { ProfileToEdit } from './Components/Profile/ProfileToEdit/ProfileToEdit';
import { AdminProfile } from './Components/Profile/AdminProfile/AdminProfile.jsx'
import './App.css';
import PostLogIn from './Components/NavBar/Authentication/PostLogIn';
import { QualifyExperience } from './Components/QualifyExperience/QualifyExperience';
import Bookings from './Components/Profile/AdminProfile/Bookings';
import Users from './Components/Profile/AdminProfile/Users';
import Bikes from './Components/Profile/AdminProfile/Bikes';
import Experiences from './Components/Profile/AdminProfile/Experiences';
import Accesories from './Components/Profile/AdminProfile/Accesories';
import Checkout from './Components/Checkout/Checkout';
import { io } from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';
import { TermsAndConditions } from './Components/TermsAndConditions/TermsAndConditions';
import { BikeDefinition } from './Components/BikeDefinition/BikeDefinition';
import { History } from './Components/History/History'
import { EBike } from './Components/EBike/EBike'
import { Invention } from './Components/Invention/Invention'
import { FAQs } from './Components/FAQs/FAQs';


function App() {

  const { user, isAuthenticated } = useAuth0();
  const [ socket, setSocket ] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:3001"))
  }, []);

  useEffect(() => {
    isAuthenticated && socket?.emit('newUserOnline', user)
  }, [socket, user, isAuthenticated]);

  return (
    <>
      <NavBar socket={socket} />
      <Switch>
        {/* <Route exact path='/' component={Landing} /> */}
        <Route exact path='/'><Landing /></Route>

        {/* <Route exact path='/home' component={Home} /> */}
        <Route exact path='/home'><Home socket={socket} /></Route>

        {/* <Route exact path='/bike/profile' component={Profile} /> */}
        <Route exact path='/bike/profile'><Profile /></Route>

        {/* <Route exact path='/bike/privateRoute' component={Private} /> */}
        <Route exact path='/bike/privateRoute'><Private /></Route>

        {/* <Route exact path='/bike/:bikeId' component={BikeDetail} /> */}
        <Route exact path='/bike/:bikeId'><BikeDetail /></Route>

        {/* <Route exact path='/allAccessories' component={AllAccesories} /> */}
        <Route exact path='/allAccessories'><AllAccesories /></Route>

        {/* <Route exact path='/adventure' component={Adventure} /> */}
        <Route exact path='/adventure'><Adventure /></Route>


        {/* <Route exact path='/promotions' component={Promotions} /> */}
        <Route exact path='/promotions'><Promotions /></Route>

        {/* <Route exact path='/allExperiencies' component={AllExperiencies} /> */}
        <Route exact path='/allExperiencies'><AllExperiencies socket={socket} /></Route>

        {/* <Route exact path='/contact' component={Contact} /> */}
        <Route exact path='/contact'><Contact /></Route>

        {/* <Route exact path='/cart' component={ShoppingCart} /> */}
        <Route exact path='/cart'><ShoppingCart /></Route>

        {/* <Route exact path='/postLogin' component={PostLogIn} /> */}
        <Route exact path='/postLogin'><PostLogIn /></Route>

        {/* <Route exact path='/editProfile' component={ProfileToEdit} /> */}
        <Route exact path='/editProfile'><ProfileToEdit /></Route>

        {/* <Route exact path='/AdminProfile' component={AdminProfile} /> */}
        <Route exact path='/AdminProfile'><AdminProfile /></Route>


        {/* <Route exact path='/AdminProfile/bookings' component={Bookings} /> */}
        <Route exact path='/AdminProfile/bookings'><Bookings /></Route>

        {/* <Route exact path='/AdminProfile/users' component={Users} /> */}
        <Route exact path='/AdminProfile/users'><Users /></Route>


        {/* <Route exact path='/AdminProfile/bikes' component={Bikes} /> */}
        <Route exact path='/AdminProfile/bikes'><Bikes /></Route>

        {/* <Route exact path='/AdminProfile/experiences' component={Experiences} /> */}
        <Route exact path='/AdminProfile/experiences'><Experiences /></Route>

        {/* <Route exact path='/AdminProfile/accesories' component={Accesories} /> */}
        <Route exact path='/AdminProfile/accesories'><Accesories /></Route>

        {/* <Route exact path='/qualifyExperience' component={QualifyExperience} /> */}
        <Route exact path='/qualifyExperience'><QualifyExperience /></Route>

        {/* <Route exact path='/checkout' component={Checkout} /> */}
        <Route exact path='/checkout'><Checkout /></Route>

        <Route exact path='/terms'><TermsAndConditions /></Route>

        <Route exact path='/definition'><BikeDefinition /></Route>

        <Route exact path='/history'><History /></Route>

        <Route exact path='/ebike'><EBike /></Route>

        <Route exact path='/invention'><Invention /></Route>

        <Route exact path='/faqs'><FAQs/></Route>

        {/* <Route path='*' component={Error} /> */}
        <Route exact path='*'><Error /></Route>
      </Switch>
      <Footer />
    </>
  )
};

export default App;
