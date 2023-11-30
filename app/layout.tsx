import { Metadata } from "next";
import "../styles/global.css";
import { IBM_Plex_Sans } from "next/font/google";

const plexSans = IBM_Plex_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plexSans.className} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Brendan Smith",
  description: "Brendan Smith's personal portfolio",
  keywords: "HTML, CSS, JavaScript",
  authors: { name: "Brendan Smith" },
  // viewport: "width=device-width, initial-scale=1.0",
  icons: "favicon.ico",
  robots: "index, follow",
};
