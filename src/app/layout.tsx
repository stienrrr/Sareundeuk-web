import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Karang Taruna Sareundeuk | Desa Sukamanah",
  description:
    "Website resmi Karang Taruna Sareundeuk, Desa Sukamanah, Kecamatan Rancaekek, Kabupaten Bandung.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
