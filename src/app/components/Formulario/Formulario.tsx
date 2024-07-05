"use client";
import { useEffect, useState } from "react";
import s from "./formulario.module.css";
import { validate } from "./validate";

export default function Formulario() {
  const [Alert, setAlert] = useState("");
  const [Form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!Form.email && !Form.mensaje && !Form.nombre) {
      setAlert("Complete todos los campos");
    } else {
      const error = validate(Form);
      if (error) {
        setAlert(error);
      } else {
        setAlert("Mensaje enviado correctamente");

        //! Peticion
        const res = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Form),
        });

        if(res.status === 200){
          console.log(res.body)
        }else{
          console.log(`ERROR - ${res}`)
          setAlert("Error al enviar el mensaje")
        }

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
