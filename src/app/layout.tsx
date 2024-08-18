import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth-provider";
import { Toaster } from "@/shadcnui/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BOULANGERIE NABISO",
  description: "Optimisez votre gestion du temps avec notre solution de pointage : sécurisée, précise et efficace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className='!scroll-smooth'>
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster/>
        </body>
      </AuthProvider>
    </html>
  );
}
