import React, { useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import s from './Menu.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from "react-redux";
import LogIn from '../NavBar/Authentication/LogIn';
import LogOut from '../NavBar/Authentication/LogOut';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { Link, useLocation } from "react-router-dom";
import { TbDiscount2, TbMessageDots } from 'react-icons/tb';
import { ImHeart } from 'react-icons/im';
import { MdCheck } from 'react-icons/md';
import { getUserNotifications } from '../../Redux/actions/index';

export const Menu = ({socket}) => {

  const logo = 'https://res.cloudinary.com/pflet/image/upload/v1663098045/Let/image/logo1_bdo7fl.png'
  const carrito = 'https://res.cloudinary.com/pflet/image/upload/v1662686105/Let/image/carrito_wohy11.png'
  const bell = 'https://res.cloudinary.com/pflet/image/upload/v1662686104/Let/image/bell_kcl5ww.png'
  const adm = 'https://res.cloudinary.com/pflet/image/upload/v1662735766/Let/image/adm_xyp2tl.png'
  const adventure = 'https://res.cloudinary.com/pflet/image/upload/v1662748275/Let/image/adv_hyo69c.png'
  const experience = 'https://res.cloudinary.com/pflet/image/upload/v1662742235/Let/image/exp_clwf94.png'
  const userDB = useSelector(state => state.user);
  const { isAuthenticated, user } = useAuth0();
  const location = useLocation();
  const url = location.pathname;
  const dispatch = useDispatch();
  // const userNotifications = useSelector(state => state.userNotifications);

  const [ notifications, setNotifications ] = useState([]);
  const [ open, setOpen ] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    if(open) {
      setNotifications([]);
    }
    setOpen(!open);
  }

  useEffect(() => {
    socket?.on('getLike', data => {
      setNotifications(prevNotifications => [...prevNotifications, data])
    })
    socket?.on('login', () => {
      setNotifications(prevNotifications => [...prevNotifications, {
        type: 'Login',
        content: 'Usuario logueado correctamente'
      }])
    })
  }, [socket]);

  useEffect(() => {
    isAuthenticated && dispatch(getUserNotifications(user?.email));
  }, [dispatch, user, isAuthenticated]);
  
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
          <Link to='/allAccessories'>
            <div className={url === '/allAccessories'? s.active : null}>
              <TbDiscount2 className={s.responsiveIcons}/>
            </div>
            <span className={s.span}>ACCESORIOS</span>
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
        { userDB.isAdmin && <Link to='/AdminProfile'><img src={adm} className={s.adm} alt='adm' ></img></Link> }     
        <Link to='/cart'>
          <button className={s.carritoBtn}>
            <img className={s.carrito} src={carrito} alt='carrito' />
          </button>
        </Link>
        <div className={s.containerBell}>
          <button className={s.bellBtn} onClick={(e) => handleOpen(e)}><img src={bell} className={s.bell} alt='bell' ></img></button>
          <div className={s.counter}>{notifications.length}</div>
          {
            open && (
                <div className={s.notifications}>
                  {
                    notifications?.map(n => {
                      if(n.hasOwnProperty('senderName')) {
                        return (
                            <>
                              <Link to='/allExperiencies'>
                                <div className={s.notification}>
                                  <ImHeart size='1rem' color='#F9B621' />
                                  <span className={s.spanNotification}>{`A ${n.senderName} le ha gustado tu publicacion`}</span>
                                </div>
                                <hr />
                              </Link>
                            </>
                          )
                      } else if(n.hasOwnProperty('type') && n.type === 'Login') {
                        return (
                          <>
                            <div className={s.notification}>
                              <MdCheck size='1.5rem' color='#F9B621' />
                              <span className={s.spanNotification}>{n.content}</span>
                            </div>
                            <hr />
                          </>
                        )
                      }
                    })
                  }
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
};
