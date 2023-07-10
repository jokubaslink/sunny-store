import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type navbarProps = {
  cartItemCount: number;
};

function Navbar({ cartItemCount }: navbarProps) {
  return (
    <nav>
      <div className="logoWrapper">
        <Link to="/">
          <h1 className="logo">Sunny Store</h1>
        </Link>
      </div>
      <div className="menu">
        <Link to="/allproducts" className="menu-item">
          Products
        </Link>
        <Link to="/cart" className="menu-item">
          <ShoppingCartIcon /> {/* <span className="cartItemCount">2</span> */}
          {cartItemCount > 0 && (
            <span className="cartItemCount">{cartItemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
