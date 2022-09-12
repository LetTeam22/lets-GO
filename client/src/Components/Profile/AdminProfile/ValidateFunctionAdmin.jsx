const validateFunctionAdmin = (input, id, errors) => {
        if(id === 'name'){
          // acepta letras, numeros y espacios
          /^([[:alnum:]]+)(\s[[:alnum:]]+)*$/.test(input.name)?
            //  !/^([A-Z]+)(\s[A-Z]+)*$/i.test()?
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
          // !/^[0-9]\d{2}$/.test(input.wheelSize) 
          input.wheelSize !== (16||20||24||26||29) ? 
          errors = {...errors, wheelSize: 'Solo se aceptan rodados validos'}
          :
          delete errors.wheelSize
          if(!input.wheelSize) delete errors.wheelSize;
        }
        if(id === 'price'){
          // acepta solo numeros, 2 caracteres 
          !/^[0-9]$/.test(input.price) || input.price < 100 || input.price > 9999 ?
          errors = {...errors, price: 'Solo se aceptan numeros del 100 al 9999'}
          :
          delete errors.price
          if(!input.price) delete errors.price;
        }
        if(id === 'color'){
          // acepta letras y espacios
          !/^([A-Z]+)(\s[A-Z]+)*$/i.test(input.color)? 
          errors = {...errors, color: 'Solo se aceptan letras'}
          :
          delete errors.color
          if(!input.color) delete errors.color;
        } 
    return errors
}

export default validateFunctionAdmin