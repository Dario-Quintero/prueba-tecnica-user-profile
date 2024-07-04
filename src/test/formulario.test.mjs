import { validate } from "../app/components/Formulario/Formulario";

test("Test de validaciones del formulario", () => {
  describe("handleSubmit", () => {
    it("debería mostrar un mensaje de error si falta algún campo", () => {
      const form = {
        nombre: "",
        email: "",
        mensaje: "",
      };

      const result = validate(form);

      expect(result).toEqual("Complete todos los campos");
    });

    it("debería mostrar un mensaje de error si el correo electrónico no es válido", () => {
      const form = {
        nombre: "John Doe",
        email: "correo-invalido",
        mensaje: "Hola, este es un mensaje de prueba",
      };

      const result = validate(form);

      expect(result).toEqual(
        "Ingrese una dirección de correo electrónico válida"
      );
    });

    it("debería devolver null si todos los campos son válidos", () => {
      const form = {
        nombre: "John Doe",
        email: "correo@ejemplo.com",
        mensaje: "Hola, este es un mensaje de prueba",
      };

      const result = validate(form);

      expect(result).toBeNull();
    });
  });
});
