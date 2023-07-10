import Footer from "./Footer";

type LayoutProp = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProp) {
  return (
    <div className="container">
      <div className="row">
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
