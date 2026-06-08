import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DJ RaphX – DJ Kärnten | Hochzeits-DJ & Event-DJ buchen",
  description: "DJ RaphX (Raphael Taxer) – professioneller DJ aus Kärnten für Geburtstage, Firmenevents, Club-Auftritte und öffentliche Veranstaltungen. Jetzt buchen!",
  keywords: "DJ Kärnten, DJ buchen Kärnten, Hochzeits-DJ Kärnten, Event-DJ Kärnten, DJ RaphX, Raphael Taxer, DJ Klagenfurt, DJ Villach, DJ Feffernitz, Firmenevent DJ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#05060d" />
      </head>
      <body>{children}</body>
    </html>
  );
}
