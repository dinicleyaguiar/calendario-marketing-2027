import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calendário de Marketing 2027",
  description: "Planeje campanhas e conteúdos com as principais datas de marketing de 2027.",
  applicationName: "Calendário de Marketing 2027",
  keywords: ["marketing", "calendário 2027", "datas comemorativas", "planejamento de conteúdo"],
  openGraph: {
    title: "Calendário de Marketing 2027",
    description: "94 datas e ideias para planejar campanhas ao longo de 2027.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f0e8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
