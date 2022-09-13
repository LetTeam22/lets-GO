const validateFunctionAcc = (input, id, errors) => {
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
    if(id === 'price'){
      // acepta solo numeros, del 10 al 999
      !/^[0-9]\d+$/.test(input.price) || input.price < 10 || input.price > 999 ?
      errors = {...errors, price: 'Solo se aceptan numeros del 100 al 9999'}
      :
      delete errors.price
      if(!input.price) delete errors.price;
    }
return errors
}

export default validateFunctionAcc