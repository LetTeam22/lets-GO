import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import { pad } from "@cloudinary/url-gen/actions/resize";
// import {fill, resize, pad } from "@cloudinary/url-gen/actions/resize";

export const RenderBikeRating = ({publicId, alt="imagen"}) => {


  // creamos una instancia con nuestro cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'pflet'
    }
  });

  const myImage = cld.image(publicId); 

  // Opcional, podemos cambiar las dimensiones CORTANDO LA IMAGEN con fill
  // Resize to 250 x 250 pixels using the 'fill' crop mode.
  // myImage.resize(fill().width(250).height(200));
  myImage.resize(pad().width(300).height(200))
  // myImage.resize(scale(400));


  return (
        
        <AdvancedImage cldImg={myImage} />
        
  )
};
