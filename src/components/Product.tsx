import { useNavigate, useParams } from "react-router-dom";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import { CircularProgress } from "@mui/joy";
import Button from "@mui/material/Button";

type productDataType = {
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
};

type productProps = {
  setCount: React.Dispatch<SetStateAction<number>>;
  count: number;
};

function Product({ setCount }: productProps) {
  const { id } = useParams();
  const [productData, setProductData] = useState<productDataType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductData() {
      const { data } = await axios.get<productDataType>(
        `https://fakestoreapi.com/products/${id}`
      );
      setProductData(data);
      setLoading(false);
    }
    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="productPage">
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
    <div className="productPage">
      <figure className="productPage__left">
        <img src={productData?.image} alt="" />
      </figure>
      <div className="productPage__right">
        <h1 className="productPage__right--title">{productData?.title}</h1>
        <p className="productPage__right--category">
          Category: {productData?.category}
        </p>
        <p className="productPage__right--desc">{productData?.description}</p>
        <p className="productPage__right--price">${productData?.price}</p>
        <p className="productPage__right--rating">
          Rating: {productData?.rating.rate} / 5
        </p>
        <Button
          variant="contained"
          onClick={() => {
              setCount((prev) => prev + 1)
              console.log([{...productData, quantity: 1}])
          }}
          sx={{
            paddingY: "12px",
            paddingX: "36px",
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
          Add To Cart
        </Button>
      </div>
    </div>
  );
}

export default Product;
