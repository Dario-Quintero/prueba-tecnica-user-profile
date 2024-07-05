import { validate } from "../app/components/Formulario/validate";

describe("Test de validaciones del formulario", () => {
  it("debería mostrar un mensaje de error si falta el nombre", () => {
    const form = {
      nombre: "",
      email: "correo@ejemplo.com",
      mensaje: "Hola, este es un mensaje de prueba",
    };

    const result = validate(form);

    expect(result).toEqual("El nombre es obligatorio");
  });

  it("debería mostrar un mensaje de error si el nombre es demasiado corto", () => {
    const form = {
      nombre: "Usua",
      email: "correo@ejemplo.com",
      mensaje: "Hola, este es un mensaje de prueba",
    };

    const result = validate(form);

    expect(result).toEqual("Ingrese un nombre completo");
  });

  it("debería mostrar un mensaje de error si el correo electrónico no es válido", () => {
    const form = {
      nombre: "Usuario",
      email: "correo-invalido",
      mensaje: "Hola, este es un mensaje de prueba",
    };

    const result = validate(form);

    expect(result).toEqual("Ingrese una dirección de correo electrónico válida");
  });

  it("debería mostrar un mensaje de error si falta el mensaje", () => {
    const form = {
      nombre: "Usuario",
      email: "correo@ejemplo.com",
      mensaje: "",
    };

    const result = validate(form);

    expect(result).toEqual("El mensaje es obligatorio");
  });

  it("debería mostrar un mensaje de error si el mensaje es demasiado corto", () => {
    const form = {
      nombre: "John Doe",
      email: "correo@ejemplo.com",
      mensaje: "Hola",
    };

    const result = validate(form);

    expect(result).toEqual("El mensaje debe tener al menos 10 caracteres");
  });

  it("debería mostrar un mensaje si los campos estan vacios", () => {
    const form = {
      nombre: "",
      email: "",
      mensaje: "",
    };

    const result = validate(form);

    expect(result).toEqual("Complete todos los campos");
  });
});
