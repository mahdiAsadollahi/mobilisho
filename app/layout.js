import "./globals.css";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";

export const metadata = {
  title: "موبایلی شو",
  description: "فروشگاه اینترنتی موبایل و لوازم جانبی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
