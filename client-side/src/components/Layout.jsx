import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto mb-8">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
