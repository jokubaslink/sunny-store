import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./components/Layout";
import AllProducts from "./components/AllProducts";
import Index from "./components/Index";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/allproducts" element={<AllProducts />} />
        {/* <Route path="/product/:id element={<Product />} />" */}
      </Routes>
    </Router>
  );
}

export default App;
