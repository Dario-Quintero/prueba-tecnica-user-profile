import * as React from 'react';

interface FormType{
    email: string,
    nombre: string,
    mensaje: string
}
interface EmailTemplateProps {
  form: FormType;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  form,
}) => (
  <div>
    <p>Direccion: {form.email}</p>
    <p>Nombre: {form.nombre}</p>
    <p>Mensaje: {form.mensaje}</p>
  </div>
);
