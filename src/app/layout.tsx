import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prueba Tecnica",
  description: "Perfil de usuario, renderizacion de informacion y formulario de contacto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

  

}>) {
  return (
    <html lang="es" data-mode="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
