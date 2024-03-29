const validateFunctionBike = (input, id, errors) => {
        if(id === 'name'){
          // acepta letras, numeros y espacios
          !/^([a-zA-Z0-9_-]+)(\s[a-zA-Z0-9_-]+)*$/.test(input.name)?
          errors = {...errors, name: 'No acepta caracteres especiales'}
          :
          delete errors.name
          if(!input.name) delete errors.name;
        }  
        if(id === 'description'){
          // acepta letras y espacios
          !/^([A-Z]+)(\s[A-Z]+)*$/i.test(input.description)? 
          errors = {...errors, description: 'Solo se aceptan letras'}
          :
          delete errors.description
          if(!input.description) delete errors.description;
        } 
        if(id === 'wheelSize'){
          // acepta solo numeros, 2 caracteres 
          Number(input.wheelSize) !== 16 && Number(input.wheelSize) !== 20 && Number(input.wheelSize) !== 24 &&
          Number(input.wheelSize) !== 26 && Number(input.wheelSize) !== 29 ? 
          errors = {...errors, wheelSize: 'Solo se aceptan rodados validos'}
          :
          delete errors.wheelSize
          if(!input.wheelSize) delete errors.wheelSize;
        }
        if(id === 'price'){
          // acepta solo numeros, del 100 al 9999
          !/^[0-9]\d+$/.test(input.price) || input.price < 100 || input.price > 9999 ?
          errors = {...errors, price: 'Solo se aceptan numeros del 100 al 9999'}
          :
          delete errors.price
          if(!input.price) delete errors.price;
        }
        if(id === 'color'){
          // acepta solo los colores establecidos
          input.color.toLowerCase() !== 'negro' && input.color.toLowerCase() !== 'verde' && 
          input.color.toLowerCase() !== 'blanco' && input.color.toLowerCase() !== 'rojo'&& 
          input.color.toLowerCase() !== 'azul' && input.color.toLowerCase() !== 'gris' &&
          input.color.toLowerCase() !== 'amarillo'?
          errors = {...errors, color: 'Solo se aceptan los colores establecidos'}
          :
          delete errors.color
          if(!input.color) delete errors.color;
        } 
        if(id === 'traction'){
          // acepta solo mecanica o electrica
          input.traction.toLowerCase() !== 'mecanica' && input.traction.toLowerCase() !== 'electrica' && 
          input.traction.toLowerCase() !== 'mecánica' && input.traction.toLowerCase() !== 'eléctrica' ?
          errors = {...errors, traction: 'Solo se aceptan rodados validos'}
          :
          delete errors.traction
          if(!input.traction) delete errors.traction;
        }
        if(id === 'type'){
          // acepta solo las variantes ya establecidas
          input.type.toLowerCase() !== 'bmx' && input.type.toLowerCase() !== 'mtb' && 
          input.type.toLowerCase() !== 'city' && input.type.toLowerCase() !== 'tandem' && 
          input.type.toLowerCase() !== 'touring' && input.type.toLowerCase() !== 'folding' ? 
          errors = {...errors, type: 'Solo se aceptan tipos validos de bicicletas'}
          :
          delete errors.type
          if(!input.type) delete errors.type;
        }
    return errors
}

export default validateFunctionBike