import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { useSelector } from "react-redux";


// Import any actions required for transformations.
import { scale } from "@cloudinary/url-gen/actions/resize";
// import {fill, resize, pad } from "@cloudinary/url-gen/actions/resize";

const RenderProfilePic = ({publicId,alt="Profile Pic"}) => {

  const userLogged = useSelector(state => state.user);

  // creamos una instancia con nuestro cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'pflet'
    }
  });


  
  const myImage = cld.image(publicId); 

  // Opcional, podemos cambiar las dimensiones CORTANDO LA IMAGEN con fill
  // Resize to 250 x 250 pixels using the 'fill' crop mode.
  // myImage.resize(fill().width(250).height(250));
  // myImage.resize(pad().width(400).height(200))
  !!userLogged.isAdmin ? myImage.resize(scale(100)) : myImage.resize(scale(75));


  return (
        <AdvancedImage cldImg={myImage} alt={alt}/>
  )
};

export default RenderProfilePic;