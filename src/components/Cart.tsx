import { useEffect, useState } from "react";
import Layout from "./Layout";
import { Button } from "@mui/material";

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

function Cart() {
  const [cartData, setCartData] = useState<itemType[]>([]);
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart !== null) {
      setCartData(JSON.parse(cart));
    }
  }, []);
  return (
    <div className="cart">
      <div className="cart__left">
        {cartData.map((item) => (
          <div className="cartItem">
            <figure>
              <img className="cartItem--img" src={item.image} />
            </figure>
            <div className="cartItem--desc">
              <h3>{item.title}</h3>
              <p>{item.price}</p>
              <input type="number" />
            </div>
          </div>
        ))}
      </div>
      <div className="cart__right">
        <h2>Cart:</h2>
        <div className="cart__right--subtotal">
          <span>Subtotal:</span>
          <span>$56.43</span>
        </div>
        <div className="cart__right--tax">
          <span>Tax:</span>
          <span>$4.43</span>
        </div>
        <div className="cart__right--price">
          <span>Price:</span>
          <span>$60.86</span>
        </div>
        <div className="cart__right--promo">
          <span>Coupon</span>
          <input type="text" />
        </div>
        <Button
          variant="contained"
          sx={{
            paddingY: "12px",
            paddingX: "24px",
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
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
