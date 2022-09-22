import React from "react";
import s from "./Card.module.css";
import RenderOneImage from "../Cloudinary/renderOneImage";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteToDb, removeFavoriteFromDb } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import swal from "sweetalert";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GiElectric } from "react-icons/gi";
import { GoGear } from "react-icons/go";
import { TbDiscount2 } from "react-icons/tb";
import { finalPrice } from "../../helpers/applyDiscount";

export const Card = ({
  name,
  type,
  image,
  traction,
  wheelSize,
  price,
  discount,
  rating,
  id,
  idBike,
}) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();
  const favorites = useSelector((state) => state.favorites);
  // const [iconStyle, setIconStyle] = useState({
  //   color: "orange",
  //   width: "1.7rem",
  //   height: "1.7rem",
  //   position: "absolute",
  //   top: "1rem",
  //   left: "50%",
  //   transform: "translate(-50%)",
  //   zIndex: '1'
  // });
  const imgRat0 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686116/Let/image/stars/0stars_e0ehyc.png";
  const imgRat05 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686112/Let/image/stars/0.5star_kbkxqg.png";
  const imgRat1 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686133/Let/image/stars/1star_cbqaj3.png";
  const imgRat15 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686119/Let/image/stars/1.5stars_gwm63h.png";
  const imgRat2 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686133/Let/image/stars/2stars_nnodhd.png";
  const imgRat25 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686133/Let/image/stars/2.5stars_tzskis.png";
  const imgRat3 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686134/Let/image/stars/3stars_mfspbx.png";
  const imgRat35 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686133/Let/image/stars/3.5stars_wbsdlh.png";
  const imgRat4 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686135/Let/image/stars/4stars_duh9ag.png";
  const imgRat45 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686135/Let/image/stars/4.5stars_wjm9o0.png";
  const imgRat5 =
    "https://res.cloudinary.com/pflet/image/upload/v1662686135/Let/image/stars/5stars_dphk3f.png";

  const imgRating = (rat) => {
    if (rat < 0.5) return imgRat0;
    if (rat < 1.5) return imgRat05;
    if (rat < 2.5) return imgRat1;
    if (rat < 3.5) return imgRat15;
    if (rat < 4.5) return imgRat2;
    if (rat < 5.5) return imgRat25;
    if (rat < 6.5) return imgRat3;
    if (rat < 7.5) return imgRat35;
    if (rat < 8.5) return imgRat4;
    if (rat < 9.5) return imgRat45;
    return imgRat5;
  };
  const handleFav = () => {
    if (!isAuthenticated) {
      swal({
        title: "PRECAUCIÓN",
        text: "Debés loguearte primero",
        icon: "warning",
        button: {
          text: "Ok",
          value: true,
          visible: true,
          className: s.btnSwal,
          closeModal: true,
        },
      });
    } else {
      const alreadyFavorite = favorites.find((f) => f.idBike === idBike);
      const email = user.email;
      if (!alreadyFavorite) {
        dispatch(addFavoriteToDb({ bikeId: idBike, email: email }));
        swal({
          title: "let's GO agregada a favoritos",
          text: "revisá tu perfil!",
          icon: "success",
          button: {
            confirm: {
              text: "Ok",
              value: true,
              visible: true,
              className: s.btnSwal,
              closeModal: true,
            },
          },
        });
        // handleFilledOut()
      } else {
        dispatch(removeFavoriteFromDb({ bikeId: idBike, email: email }));
        // console.log('desde card' + idBike)
      }
    }
  };

  const bikeIsFavorite = (idBike) => {
    return favorites.find((b) => b.idBike === idBike) ? true : false;
  };

  const iconStyle = {
    color: "orange",
    width: "1.7rem",
    height: "1.7rem",
    position: "absolute",
    top: "1rem",
    left: "50%",
    transform: "translate(-50%)",
    zIndex: '1'
  };

  // const handleOver = () => {
  //   setIconStyle({color: "orange",
  //     width: "2.2rem",
  //     height: "2.2gisrem",
  //     position: "absolute",
  //     top: "1.1rem",
  //     left: "50%",
  //     transform: "translate(-50%)",
  //     zIndex: '1'
  //   })
  // }

  // const handleOut = () => {
  //   setIconStyle({color: "orange",
  //   width: "1.7rem",
  //   height: "1.7rem",
  //   position: "absolute",
  //   top: "1rem",
  //   left: "50%",
  //   transform: "translate(-50%)",
  //   zIndex: '1'
  //   })
  // }

  // const handleFilledOver = () => {
  //   setIconStyle({color: "orange",
  //     width: "2.2rem",
  //     height: "2.2rem",
  //     position: "absolute",
  //     top: "1.1rem",
  //     left: "50%",
  //     transform: "translate(-50%)",
  //     zIndex: '1'
  //   })
  // }

  // const handleFilledOut = () => {
  //   setIconStyle({color: "orange",
  //   width: "1.7rem",
  //   height: "1.7rem",
  //   position: "absolute",
  //   top: "1rem",
  //   left: "50%",
  //   transform: "translate(-50%)",
  //   zIndex: '1'
  //   })
  // }

  return (
    <div className={s.container}>
          {bikeIsFavorite(idBike) ? (
            <AiFillHeart cursor='pointer' style={iconStyle} onClick={handleFav} />
          ) : (
            <AiOutlineHeart cursor='pointer' style={iconStyle} onClick={handleFav} />
          )}
      
      <Link to={"/bike/" + idBike}>
        <div className={id % 2 === 0 ? `${s.card}` : `${s.cardTwo}`}>
          {!!Number(discount) && (
            <div className={s.discountCont}>
              <TbDiscount2 size="2rem" />
              <span className={s.discount}>{`-${discount}%`}</span>
            </div>
          )}
          {/^(https?)[^\s]*$/i.test(image) ? (
            <img src={image} alt={name} className={s.imgCard} />
          ) : (
            <RenderOneImage publicId={image} alt={name}></RenderOneImage>
          )}
          <div>
            <h3 className={s.name}>{name}</h3>
            <div className={s.dataCont}>
              <span className={s.type}>{type} </span>
              {traction === "eléctrica" ? (
                <GiElectric size="2.5rem" className={s.icon} />
              ) : (
                <GoGear size="2.5rem" className={s.icon} />
              )}
              <div className={s.rodadoCont}>
                <img
                  className={s.rueda}
                  src="https://res.cloudinary.com/pflet/image/upload/v1662686110/Let/image/rueda_bici_kouezn.png"
                  alt="Rodado "
                />
                <span className={s.rodado}>{wheelSize}</span>
              </div>
            </div>
            <div className={s.ratingCont}>
              <img className={s.stars} src={imgRating(rating)} alt="Rating " />
              <span className={s.rating}>{rating}</span>
            </div>
            <div className={s.priceCont}>
              <h4 className={Number(discount) ? s.oldPrice : s.price}>
                ${price}/día
              </h4>
              {!!Number(discount) && (
                <h4 className={s.newPrice}>
                  ${finalPrice(price, discount)}/día
                </h4>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
