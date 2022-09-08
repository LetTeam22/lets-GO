import React from 'react';
import s from './Card.module.css';
import imgRat0 from '../../image/stars/0stars.png'
import imgRat05 from '../../image/stars/0.5star.png'
import imgRat1 from '../../image/stars/1star.png'
import imgRat15 from '../../image/stars/1.5stars.png'
import imgRat2 from '../../image/stars/2stars.png'
import imgRat25 from '../../image/stars/2.5stars.png'
import imgRat3 from '../../image/stars/3stars.png'
import imgRat35 from '../../image/stars/3.5stars.png'
import imgRat4 from '../../image/stars/4stars.png'
import imgRat45 from '../../image/stars/4.5stars.png'
import imgRat5 from '../../image/stars/5stars.png'
import rodado from '../../image/rueda_bici.png'
import RenderOneImage from '../Cloudinary/renderOneImage';
import gear from '../../image/gear.png'
import ray from '../../image/ray.png'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import swal from "sweetalert";
import { AiFillHeart, AiOutlineHeart }  from 'react-icons/ai';
import { GiElectric } from 'react-icons/gi';
import { GoGear } from 'react-icons/go';
import { TbDiscount2 } from 'react-icons/tb';

export const Card = ({ name, type, image, traction, wheelSize, price, discount, rating, id, idBike }) => {
    
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth0();
    const favorites = useSelector(state => state.favorites);

    const imgRating = rat => {
        if (rat < 0.5) return imgRat0
        if (rat < 1.5) return imgRat05
        if (rat < 2.5) return imgRat1
        if (rat < 3.5) return imgRat15
        if (rat < 4.5) return imgRat2
        if (rat < 5.5) return imgRat25
        if (rat < 6.5) return imgRat3
        if (rat < 7.5) return imgRat35
        if (rat < 8.5) return imgRat4
        if (rat < 9.5) return imgRat45
        return imgRat5
    }
    const handleFav = () => {
        if (!isAuthenticated) {
            swal({ title: "PRECAUCIÓN",text: "Debés loguearte primero",icon: "warning",
              button: {
                text: "Ok",
                value: true,
                visible: true,
                className: s.btnSwal,
                closeModal: true
              }
            });
        } else {
            const alreadyFavorite = favorites.find(f => f.idBike === idBike)
            if(!alreadyFavorite) {
                dispatch(addFavorite(idBike))
                swal({ title: "let's GO agregada a favoritos", text: "revisá tu perfil!", icon: "success",
                    button: {
                      confirm: {
                        text: "Ok",
                        value: true,
                        visible: true,
                        className: s.btnSwal,
                        closeModal: true
                      }
                    }
                })
            } else {
                dispatch(removeFavorite(idBike))
                console.log('desde card' + idBike)
            }
        }
    };

    const bikeIsFavorite = (idBike) => {
        return favorites.find(b => b.idBike === idBike) ? true : false
    };

    const iconStyle = {
        color: 'orange',
        width: '1.7rem',
        height: '1.7rem',
        padding: '0',
        margin: '0'
    };

    // calculo precio con descuento si tiene
    const newPrice = Math.round(Number(price) * (1 - Number(discount) / 100))

    return (
        <div className={id % 2 === 0 ? `${s.card}` : `${s.cardTwo}`}>
            {
                !!Number(discount) && 
                <div className={s.discountCont}>
                    <TbDiscount2 size='2rem' />
                    <span className={s.discount}>{`-${discount}%`}</span>
                </div>
            }
            { <button className={s.fav} onClick={handleFav}> { bikeIsFavorite(idBike)
                ? <AiFillHeart style= {iconStyle}/>
                : <AiOutlineHeart style= {iconStyle}/> }
            </button> }
            { /^(https?)[^\s]*$/i.test(image)
                ? <img src={image} alt='img not found' className={s.imgCard} />
                : <Link to={"/bike/" + idBike}><RenderOneImage publicId={image}></RenderOneImage></Link> 
            }
            <div>
                <Link to={"/bike/" + idBike}><h3 className={s.name}>{name}</h3></Link> 
                <div className={s.dataCont}>
                    <span className={s.type}>{type} </span>
                    {
                        traction === 'eléctrica' ? <GiElectric size='2.5rem' className={s.icon} /> : <GoGear size='2.5rem' className={s.icon} />
                    } 
                    <div className={s.rodadoCont}>
                        <img className={s.rueda} src={rodado} alt='Rodado '/>
                        <span className={s.rodado}>{wheelSize}</span>
                    </div>
                </div>              
                <div className={s.ratingCont}>
                    <img className={s.stars} src={imgRating(rating)} alt='Rating '/>
                    <span className={s.rating}>{rating}</span>
                </div>
                <div className={s.priceCont}>
                    <h4 className={Number(discount) ? s.oldPrice : s.price}>${price}/día</h4>
                    { !!Number(discount) && <h4 className={s.newPrice}>${newPrice}/día</h4> }
                </div>
            </div>
        </div>  
    )
};