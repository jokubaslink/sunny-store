import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import Index from "./components/Index";
import Product from "./components/Product";
import Cart from "./components/Cart";
import "./styles/App.css";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <Router>
      <Layout>
        <Navbar count={count} />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route
            path="/product/:id"
            element={<Product setCount={setCount} count={count} />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
