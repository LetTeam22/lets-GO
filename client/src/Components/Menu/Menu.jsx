import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import s from './Menu.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from "react-redux";
import LogIn from '../NavBar/Authentication/LogIn';
import LogOut from '../NavBar/Authentication/LogOut';
import { Link } from 'react-router-dom';
// import carrito from '../../image/carrito.png';
// import bell from '../../image/bell.png'
// import logo from '../../image/logo.png';


export const Menu = () => {

  const logo = 'https://res.cloudinary.com/pflet/image/upload/v1662686136/Let/image/logo_vwis1a.png'
  const carrito = 'https://res.cloudinary.com/pflet/image/upload/v1662686105/Let/image/carrito_wohy11.png'
  const bell = 'https://res.cloudinary.com/pflet/image/upload/v1662686104/Let/image/bell_kcl5ww.png'
  const adm = 'https://res.cloudinary.com/pflet/image/upload/v1662735766/Let/image/adm_xyp2tl.png'

  const { isAuthenticated } = useAuth0();
  const user = useSelector(state => state.user);

  return (
    <div className={s.menu}>
      <Link to='/'><img src={logo} alt='logo' className={s.icon} /></Link>
      <div className={s.options}>
        <div >
          <Link to='/home'><span className={s.span}>BICICLETAS</span></Link>
        </div>
        <div >
          <Link to='/adventure'><span className={s.span}>AVENTURAS</span></Link>
        </div>
        <div >
          <Link to='/promotions'><span className={s.span}>BENEFICIOS</span></Link>
        </div>
        <div >
          <Link to='/allExperiencies'><span className={s.span}>EXPERIENCIAS</span></Link>
        </div>
        <div >
          <Link to='/contact'><span className={s.span}>CONTACTO</span></Link>
        </div>
      </div>

      <SearchBar />
      <div className={s.login}>
        {isAuthenticated ? <LogOut /> : <LogIn />}
        { user.isAdmin && <Link to='/AdminProfile'><img src={adm} className={s.adm} alt='adm' ></img></Link> }     
        <Link to='/cart'>
          <button className={s.carritoBtn}>
            <img className={s.carrito} src={carrito} alt='carrito' />
          </button>
        </Link>
        <img src={bell} className={s.bell} alt='bell' ></img>
      </div>
    </div>
  );
};
