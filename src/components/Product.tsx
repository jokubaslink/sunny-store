import { useNavigate, useParams } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/joy";
import Button from "@mui/material/Button";
import { addToCart, getCartItemCount } from "../utils/CartFunctionality";
import { getCartItems } from "../utils/CartFunctionality";

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
  quantity?: string;
};

type productProps = {
  cart: productDataType[];
  setCart: React.Dispatch<SetStateAction<productDataType[]>>;
  setCartItemCount: React.Dispatch<SetStateAction<number>>;
};

function Product({ cart, setCart, setCartItemCount }: productProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productData, setProductData] = useState<productDataType>();
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    async function fetchProductData() {
      const { data } = await axios.get<productDataType>(
        `https://fakestoreapi.com/products/${id}`
      );
      setProductData(data);
      setLoading(false);
      if (cart.find((item) => item.id === data.id)) {
        setIsInCart(true);
      }
    }
    fetchProductData();
  }, [id, cart]);

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
        {isInCart ? (
          <Button
            variant="contained"
            onClick={() => {
              navigate("/cart");
            }}
          >
            Proceed to checkout
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              if (productData) {
                addToCart(productData);
                setIsInCart(true);
                setCart(getCartItems());
                setCartItemCount(getCartItemCount());
              }
            }}
          >
            Add To Cart
          </Button>
        )}
      </div>
    </div>
  );
}

export default Product;
