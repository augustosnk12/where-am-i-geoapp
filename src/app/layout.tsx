import type { Metadata } from "next";
import { Poppins } from "@next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marques Geo App",
  description:
    "Site que exibe os locais onde estão os clientes da Marques Consult",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
