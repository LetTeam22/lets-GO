const validateFunctionAdv = (input, id, errors) => {
    if(id === 'name'){
      // acepta letras, numeros y espacios
      !/^([a-zA-Z0-9_-]+)(\s[a-zA-Z0-9_-]+)*$/.test(input.name)?
      errors = {...errors, name: 'No acepta caracteres especiales'}
      :
      delete errors.name
      if(!input.name) delete errors.name;
    }  
    if(id === 'description'){
      // acepta letras, numeros y espacios
      !/^([a-zA-Z0-9_-]+)(\s[a-zA-Z0-9_-]+)*$/.test(input.description)? 
      errors = {...errors, description: 'Solo se aceptan letras, numeros y espacios'}
      :
      delete errors.description
      if(!input.description) delete errors.description;
    } 
    if(id === 'conditions'){
      // acepta letras, numeros y espacios
      !/^([a-zA-Z0-9_-]+)(\s[a-zA-Z0-9_-]+)*$/.test(input.conditions)? 
      errors = {...errors, conditions: 'Solo se aceptan letras, numeros y espacios'}
      :
      delete errors.conditions
      if(!input.conditions) delete errors.conditions;
    } 
    if(id === 'price'){
      // acepta solo numeros, del 1000 al 99999
      !/^[0-9]\d+$/.test(input.price) || input.price < 1000 || input.price > 99999 ?
      errors = {...errors, price: 'Solo se aceptan numeros del 1000 al 99999'}
      :
      delete errors.price
      if(!input.price) delete errors.price;
    }
    if(id === 'dificulty'){
        // acepta solo baja, media o alta
        input.traction.toLowerCase() !== 'baja' && input.traction.toLowerCase() !== 'media' && 
        input.traction.toLowerCase() !== 'alta' ?
        errors = {...errors, traction: 'Solo se aceptan dificultades validas'}
        :
        delete errors.traction
        if(!input.traction) delete errors.traction;
      }
return errors
}

export default validateFunctionAdv