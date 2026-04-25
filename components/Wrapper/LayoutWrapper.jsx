"use client";

import { usePathname } from "next/navigation";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideLayoutRoutes = ["/login", "/signup", "/admin"];

  const shouldHide = hideLayoutRoutes.includes(pathname);

  return (
    <>
      {!shouldHide && <Header />}
      {children}
      {!shouldHide && <Footer />}
    </>
  );
}