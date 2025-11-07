import Footer from "@/app/components/Footer/Footer";
import "./globals.css";
import Navbar from "@/app/components/Navbar/Navbar";

export const metadata = {
  title: "موبایلی شو",
  description: "فروشگاه اینترنتی موبایل و لوازم جانبی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
