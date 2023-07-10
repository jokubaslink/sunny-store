import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import Index from "./components/Index";
import Product from "./components/Product";
import Cart from "./components/Cart";
import "./styles/App.css";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { getCartItemCount, getCartItems } from "./utils/CartFunctionality";

type productData = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
  quantity?: string;
};

function App() {
  const [cart, setCart] = useState<productData[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCart(getCartItems());
    setCartItemCount(getCartItemCount());
  }, []);

  function updateQuantity(itemId: number, quantity: string) {
    const JSONCart = localStorage.getItem("cart");
    if (JSONCart !== null) {
      const cartData: productData[] = JSON.parse(JSONCart);
      const object = cartData.filter((item) => item.id === itemId)[0];
      const newArr = cartData.map((item) => {
        if (item.id === itemId) {
          return { ...object, quantity };
        }
        return item;
      });
      setCart(newArr);
      localStorage.setItem("cart", JSON.stringify(newArr));
    }
  }

  return (
    <Router>
      <Layout>
        <Navbar cartItemCount={cartItemCount} />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route
            path="/product/:id"
            element={
              <Product
                setCartItemCount={setCartItemCount}
                cart={cart}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                updateQuantity={updateQuantity}
                setCartItemCount={setCartItemCount}
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
