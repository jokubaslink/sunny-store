import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

function Index() {
  const navigate = useNavigate();
  const [topSellers, setTopSellers] = useState<itemType[]>([]);

  type itemType = {
    category: string;
    description: string;
    id: number;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    title: string;
  };

  useEffect(() => {
    async function fetchStoreItems() {
      const { data } = await axios.get<itemType[]>(
        "https://fakestoreapi.com/products"
      );
      setTopSellers(data);
    }
    fetchStoreItems();
  }, []);

  return (
    <Layout>
      <div className="mainPage">
        <div className="mainPage--topSellers">
          {topSellers.slice(0, 4).map((item) => (
            <div>{item.title}</div>
          ))}
        </div>
        <div className="mainPage--route">
          <h2>All Store Items down below</h2>{" "}
          <button
            onClick={() => {
              navigate("/allproducts");
            }}
          >
            Find More Products
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
