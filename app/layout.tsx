import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Clepher Test 1",
  description: "This is a demo app using Alpha Vantage API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="mt-20 flex justify-center items-center">{children}</div>
      </body>
    </html>
  );
}
