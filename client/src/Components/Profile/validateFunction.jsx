const validate = (input, id, errors) => {
    if(id === 'firstName'){
      !/^[A-Z]+$/i.test(input.firstName)?
      errors = {...errors, firstName: 'Solo se aceptan letras'}
      :
      delete errors.firstName
    }  
    if(id === 'lastName'){
      !/^[A-Z]+$/i.test(input.lastName)? 
      errors = {...errors, lastName: 'Solo se aceptan letras'}
      :
      delete errors.lastName
    } 
    if(id === 'cellphone'){
      !/^[0-9]\d{10}$/.test(input.cellphone)? 
      errors = {...errors, cellphone: 'Solo se aceptan numeros'}
      :
      delete errors.cellphone
    }
    return errors
}

export default validate