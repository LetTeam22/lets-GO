import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import { scale} from "@cloudinary/url-gen/actions/resize";

const RenderAccesories = ({publicId,alt="imagen"}) => {


  // creamos una instancia con nuestro cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'pflet'
    }
  });

  const myImage = cld.image(publicId); 

  // Opcional, podemos cambiar las dimensiones CORTANDO LA IMAGEN con fill
  // Resize to 250 x 250 pixels using the 'fill' crop mode.
  myImage.resize(scale(120))

  return (
        <AdvancedImage cldImg={myImage} alt={alt}/>
  )
};

export default RenderAccesories;