import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { connectDB } from "@/services/connect-mongo";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "200", "300", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "EduConnect - World's Best Learning Platform",
  description: "Explore || Learn || Build || Share",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectDB();
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          poppins.className,
          "font-sans bg-white text-slate-900 antialiased",
        )}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
