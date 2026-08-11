import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DJ RAPHX – DJ Kärnten | Hochzeits-DJ & Event-DJ buchen",
  description: "DJ RAPHX (Raphael Taxer) – professioneller DJ aus Kärnten für Geburtstage, Hochzeiten, Firmenevents, Club-Auftritte und öffentliche Veranstaltungen. Jetzt Termin buchen!",
  keywords: "DJ Kärnten, DJ buchen Kärnten, Hochzeits-DJ Kärnten, Event-DJ Kärnten, DJ RAPHX, Raphael Taxer, DJ Klagenfurt, DJ Villach, DJ Feffernitz, Firmenevent DJ, Geburtstag DJ Kärnten",
  authors: [{ name: "Raphael Taxer" }],
  creator: "Raphael Taxer",
  metadataBase: new URL("https://www.djraphx.at"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: "https://www.djraphx.at",
    siteName: "DJ RAPHX",
    title: "DJ RAPHX – DJ Kärnten | Hochzeits-DJ & Event-DJ buchen",
    description: "Professioneller DJ aus Kärnten für Geburtstage, Hochzeiten, Firmenevents und Club-Auftritte. Unvergessliche Abende – jetzt Termin buchen!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DJ RAPHX – Professioneller DJ aus Kärnten",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ RAPHX – DJ Kärnten",
    description: "Professioneller DJ aus Kärnten für Events, Hochzeiten & Club-Auftritte.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "-GhOAIZFnuJ8eaM9vPNWrURy0uGJg4uExtALtpXYKm4",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DJ RAPHX",
    "alternateName": "Raphael Taxer DJ",
    "description": "Professioneller DJ aus Kärnten für Geburtstage, Hochzeiten, Firmenevents, Club-Auftritte und öffentliche Veranstaltungen.",
    "url": "https://www.djraphx.at",
    "telephone": "+436605459207",
    "email": "dj.raphx@icloud.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Lina-Domenig Straße 118",
      "addressLocality": "Feffernitz",
      "postalCode": "9710",
      "addressCountry": "AT",
    },
    "areaServed": {
      "@type": "State",
      "name": "Kärnten",
    },
    "priceRange": "€€",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:30",
      "closes": "18:30",
    },
    "sameAs": [
      "https://www.instagram.com/dj_raphx/",
      "https://www.facebook.com/raphael.taxer.7/",
      "https://www.tiktok.com/@dj_raphx",
    ],
  };

  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#05060d" />
        <meta name="geo.region" content="AT-2" />
        <meta name="geo.placename" content="Feffernitz, Kärnten" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
