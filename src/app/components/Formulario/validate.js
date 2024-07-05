
export function validate(form) {
    let error = "";
    
    if(!form.email && !form.nombre && !form.mensaje){
        error = "Complete todos los campos"
        return error
    }

    if (!form.nombre) {
      error = "El nombre es obligatorio";
      return error;
    } else if (form.nombre.length <= 4) {
      error = "Ingrese un nombre completo";
      return error;
    }
  
    if (!form.email) {
      error = "El correo electrónico es obligatorio";
      return error;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email)) {
      error = "Ingrese una dirección de correo electrónico válida";
      return error;
    }
  
    if (!form.mensaje) {
      error = "El mensaje es obligatorio";
      return error;
    } else if (form.mensaje.length < 10) {
      error = "El mensaje debe tener al menos 10 caracteres";
      return error;
    }
  
    return error;
  }