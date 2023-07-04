import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import axios from "axios";
import Layout from "./Layout";

function Index() {
  const navigate = useNavigate();
  const [topSellers, setTopSellers] = useState<itemType[]>([]);
  const [loading, setLoading] = useState(true);

  type itemType = {
    category: string;
    description: string;
    id: number;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    price: number;
    title: string;
  };

  useEffect(() => {
    async function fetchStoreItems() {
      const { data } = await axios.get<itemType[]>(
        "https://fakestoreapi.com/products"
      );
      setTopSellers(data);
      setLoading(false);
    }
    fetchStoreItems();
  }, []);

  if (loading) {
    return (

        <div className="mainPage" style={{ height: "80vh" }}>
          <CircularProgress
            determinate={false}
            size="lg"
            value={25}
            variant="plain"
          />
        </div>

    );
  }

  return (
      <div className="mainPage">
        <h1 className="mainPage__title">Top Sellers Today:</h1>
        <div className="mainPage__topSellers">
          {topSellers.slice(0, 4).map((item) => (
            <figure
              key={item.id}
              className="topSellers__item"
              onClick={() => {
                navigate(`/product/${item.id}`);
              }}
            >
              <img className="topSellers__item--img" src={item.image} alt="" />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mainPage__route">
          <h2 className="mainPage__route--title">More Products</h2>{" "}
          <Button
            variant="contained"
            onClick={() => {
              navigate("/allproducts");
            }}
            sx={{
              padding: "12px",
              fontSize: "16px",
              borderRadius: "16px",
              border: "1px solid rgb(245, 192, 102)",
              backgroundColor: "rgb(245, 180, 68)",
              color: "white",
              ":hover": {
                backgroundColor: "rgb(245, 192, 102)",
              },
            }}
          >
            Find More Products
          </Button>
        </div>
      </div>

  );
}

export default Index;
