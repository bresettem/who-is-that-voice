import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import { Providers } from "@/app/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Who is that voice?",
  description: "Discover the voices you have been curious about",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers attribute="data-bs-theme" defaultTheme="system">
          {children}
        </Providers>
      </body>
    </html>
  );
}
