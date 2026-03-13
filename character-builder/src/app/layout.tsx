import type { Metadata } from "next";
import { Bangers, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ZoomLinesBackdrop from "@/components/ZoomLinesBackdrop";

const bangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OP the RPG — Character Builder",
  description: "Build your hero for OP the RPG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.className=t}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${bangers.variable} ${inter.variable} antialiased min-h-screen text-foreground`}
      >
        <ThemeProvider>
          <ZoomLinesBackdrop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
