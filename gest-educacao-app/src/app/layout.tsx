'use client'

import { AppWrapper } from "@/context/AuthContext";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <title>Gestão Educação</title>
      <body>
        <Toaster />
          <AppWrapper>
            {children}
            </AppWrapper>
      </body>
    </html>
  );
}
