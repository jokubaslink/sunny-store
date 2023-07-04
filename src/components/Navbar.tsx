import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";

type navbarProps = {
  count: number;
};

function Navbar({ count }: navbarProps) {
  const [cartItemCount, setCartItemCount] = useState(count);
  const cart = localStorage.getItem("cart");

  useEffect(() => {
    if (cart !== null) {
      setCartItemCount(JSON.parse(cart).length);
    }
  }, []);

  return (
    <nav>
      <div className="logoWrapper">
        <Link to="/">
          <h1 className="logo">Sunny Store {count > 0 && count}</h1>
        </Link>
      </div>
      <div className="menu">
        <Link to="/allproducts" className="menu-item">
          Products
        </Link>
        <Link to="/cart" className="menu-item">
          <ShoppingCartIcon />{" "}
          <span className="cartItemCount">2</span>
          {cartItemCount > 0 && (
            <span className="cartItemCount">2</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
