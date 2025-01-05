'use client'
import { Header } from "@/components/layout/Header";
import "./globals.css";
import { SideBar } from "@/components/layout/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        <SideBar />
        <section className="main-content w-full overflow-auto p-6">
          <div className="overflow-x-auto">
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
