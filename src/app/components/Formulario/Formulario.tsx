"use client";
import { Resend } from "resend";
import { useEffect, useState } from "react";
import s from "./formulario.module.css";

export function validate(form: {
  nombre: string;
  email: string;
  mensaje: string;
}) {
  let error = "";

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
export default function Formulario() {
  const [Alert, setAlert] = useState("");
  const [Form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const resend = new Resend("re_Zpz4Zhtf_MXFWzZRS53MJGoPDub8Ht2LG");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!Form.email && !Form.mensaje && !Form.nombre) {
      setAlert("Complete todos los campos");
    } else {
      const error = validate(Form);
      if (error) {
        setAlert(error);
      } else {
        setAlert("Mensaje enviado correctamente");
        resend.emails.send({
          from: "onboarding@resend.dev",
          to: "darioquintero73@hotmail.com", // Form.email
          subject: `Email enviado desde la prueba tecnica de Dario Quintero`,
          html: `<p>Autor: ${Form.nombre}
          Mensaje:${Form.mensaje}</p>`,
        });
        setForm({
          nombre: "",
          email: "",
          mensaje: "",
        });
      }
    }
  };

  const handleTrowErrorAlert = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setAlert("Error al enviar el mensaje");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert("");
    }, 3000);
  }, [Alert]);

  return (
    <form className={s.form}>
      <h3 className={`${s.zoom} ${s.h3}`}>Contacto</h3>

      <div className={s.input_container}>
        <input
          className={s.input}
          type="text"
          name="nombre"
          value={Form.nombre}
          placeholder="Nombre"
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          className={s.input}
          type="email"
          name="email"
          value={Form.email}
          placeholder="Email"
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <textarea
        className={s.textarea}
        name="mensaje"
        placeholder="Mensaje"
        value={Form.mensaje}
        rows={4}
        onChange={handleTextareaChange}
        required
      />
      {!Alert ? (
        <div className={s.box_input}>
          <button className={s.input_submit} onClick={(e) => handleSubmit(e)}>
            Enviar
          </button>
          <button
            className={s.input_error}
            onClick={(e) => handleTrowErrorAlert(e)}
          >
            Probar Error
          </button>
        </div>
      ) : (
        <span
          className={`${
            Alert === "Mensaje enviado correctamente"
              ? s.alert_succes
              : s.alert_error
          }`}
        >
          {Alert}
        </span>
      )}
    </form>
  );
}
