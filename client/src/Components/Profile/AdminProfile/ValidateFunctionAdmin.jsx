const validateFunctionAdmin = (input, id, errors) => {
        if(id === 'firstName'){
          // acepta letras y espacios
             !/^([A-Z]+)(\s[A-Z]+)*$/i.test(input.firstName)?
          errors = {...errors, firstName: 'Solo se aceptan letras'}
          :
          delete errors.firstName
          if(!input.firstName) delete errors.firstName;
        }  
        if(id === 'lastName'){
          // acepta letras y espacios
          !/^([A-Z]+)(\s[A-Z]+)*$/i.test(input.lastName)? 
          errors = {...errors, lastName: 'Solo se aceptan letras'}
          :
          delete errors.lastName
          if(!input.lastName) delete errors.lastName;
        } 
        if(id === 'cellphone'){
          // acepta solo numeros, entre 9 y 10 caracteres porque puede estar o no el primer 0
          !/^[0-9]\d{9,10}$/.test(input.cellphone)? 
          errors = {...errors, cellphone: 'Solo se aceptan numeros'}
          :
          delete errors.cellphone
          if(!input.cellphone) delete errors.cellphone;
        }
        if(id === 'userName'){
          // acepta hasta 2 palabras, cada una con un maximo de 10 caracteres
          !/^(\w{1,10})(\s\w{1,10})?$/i.test(input.userName)? 
          errors = {...errors, userName: 'Válido hasta 10 caracteres por palabra'}
          :
          delete errors.userName
          if(!input.userName) delete errors.userName;
        }
    return errors
}

export default validateFunctionAdmin