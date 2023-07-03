import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logoWrapper">
        <Link to="/">
          <h1 className="logo">Sunny Store</h1>
        </Link>
      </div>
      <div className="menu">
        <a href="/products" className="menu-item">
          Products
        </a>
        <a href="/products" className="menu-item">
          Cart
        </a>
      </div>
    </div>
  );
}

export default Navbar;
