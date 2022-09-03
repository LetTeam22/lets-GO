import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill, scale, resize} from "@cloudinary/url-gen/actions/resize";

const RenderOneImage = ({publicId,alt="imagen"}) => {


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
  myImage.resize(scale(400));

  return (
        <AdvancedImage cldImg={myImage} alt={alt}/>
  )
};

export default RenderOneImage;