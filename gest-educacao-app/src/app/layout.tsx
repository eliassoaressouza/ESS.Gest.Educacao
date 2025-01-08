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
      <body>
        <Toaster />
        <section className="main-content w-full overflow-auto p-6">
          <div className="overflow-x-auto">
          <AppWrapper>
            {children}
            </AppWrapper>
          </div>
        </section>
      </body>
    </html>
  );
}
