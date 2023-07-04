import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProp = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProp) {
  return (
    <div className="container">
      <div className="row">
    {/*     <Navbar /> */}
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
