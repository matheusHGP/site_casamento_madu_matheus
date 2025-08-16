import { Geist, Geist_Mono, Biryani } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const biryani = Biryani({
  subsets: ["latin"],
  weight: ['200', '300', '400', '600', '700', '800', '900']
})

export const metadata = {
  title: "Casamento Madu e Matheus",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${biryani.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
