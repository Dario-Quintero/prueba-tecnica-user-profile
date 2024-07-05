import { Resend } from "resend";
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "../../components/email-template";
const resend = new Resend("re_Zpz4Zhtf_MXFWzZRS53MJGoPDub8Ht2LG");

export async function POST(req: NextApiRequest | any, res: NextApiResponse) {
  interface FormType {
    email: string;
    nombre: string;
    mensaje: string;
  }
  const Form : FormType = await req.json()
  const { email, nombre, mensaje } = Form 

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["darioquintero73@hotmail.com"], // con esta key solo puedo enviar mails a mi direccion unicamente
    subject: `Email enviado por ${nombre} desde Prueba técnica de Dario Quintero`,
    react: EmailTemplate({ form: { nombre, email, mensaje} }),
    text: "",
  });

  

  if (error ) {
    return Response.json({ error });
  }

  return Response.json(data);
}
