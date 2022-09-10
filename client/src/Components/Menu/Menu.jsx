import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import s from './Menu.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from "react-redux";
import LogIn from '../NavBar/Authentication/LogIn';
import LogOut from '../NavBar/Authentication/LogOut';
import { Link, useLocation } from "react-router-dom";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { TbDiscount2, TbMessageDots } from 'react-icons/tb'

export const Menu = () => {

  const logo = 'https://res.cloudinary.com/pflet/image/upload/v1662686136/Let/image/logo_vwis1a.png'
  const carrito = 'https://res.cloudinary.com/pflet/image/upload/v1662686105/Let/image/carrito_wohy11.png'
  const bell = 'https://res.cloudinary.com/pflet/image/upload/v1662686104/Let/image/bell_kcl5ww.png'
  const adm = 'https://res.cloudinary.com/pflet/image/upload/v1662735766/Let/image/adm_xyp2tl.png'
  const adventure = 'https://res.cloudinary.com/pflet/image/upload/v1662748275/Let/image/adv_hyo69c.png'
  const experience = 'https://res.cloudinary.com/pflet/image/upload/v1662742235/Let/image/exp_clwf94.png'
  const user = useSelector(state => state.user);
  const { isAuthenticated } = useAuth0();
  const location = useLocation()
  const url = location.pathname
  

  return (
    <div className={s.menu}>
      <Link to='/'><img src={logo} alt='logo' className={s.icon} /></Link>
      <div className={s.options}>
        <div>
          <Link to='/home'>
            <div className={url === '/home'? s.active : null}>
              <DirectionsBikeIcon className={s.responsiveIcons}/>
            </div>
            <span className={s.span}>BICICLETAS</span>
            </Link>
        </div>
        <div >
          <Link to='/adventure'>
          <div className={url === '/adventure'? `${s.active} ${s.img}` : s.img}>
              <img src={adventure} className={s.responsiveIcons} alt='aventura'/>
            </div>
            <span className={s.span}>AVENTURAS</span>
          </Link>
        </div>
        <div >
          <Link to='/promotions'>
            <div className={url === '/promotions'? s.active : null}>
              <TbDiscount2 className={s.responsiveIcons}/>
            </div>
            <span className={s.span}>BENEFICIOS</span>
          </Link>
        </div>
        <div >
          <Link to='/allExperiencies'>
          <div className={url === '/allExperiencies'?  `${s.active} ${s.img}` : s.img}>
              <img src={experience} className={s.responsiveIcons} alt='experiencia'/>
            </div>
            <span className={s.span}>EXPERIENCIAS</span>
          </Link>
        </div>
        <div >
          <Link to='/contact'>
            <div className={url === '/contact'? s.active : null}>
              <TbMessageDots className={s.responsiveIcons}/>
            </div>
            <span className={s.span}>CONTACTO</span>
          </Link>
        </div>
      </div>
      <div className={s.searchbarContainer}>
        <SearchBar />
      </div>
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
