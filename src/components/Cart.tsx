import React, { SetStateAction } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteItem,
  getCartItemCount,
  getCartItems,
} from "../utils/CartFunctionality";

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
  quantity?: string;
};

interface cartProps {
  cart: itemType[];
  updateQuantity: (itemId: number, quantity: string) => void;
  setCart: React.Dispatch<SetStateAction<itemType[]>>;
  setCartItemCount: React.Dispatch<SetStateAction<number>>;
}

function Cart({ cart, updateQuantity, setCart, setCartItemCount }: cartProps) {
  const navigate = useNavigate();

  const total = () => {
    let price = 0;
    cart.forEach((item) => (price += item.price * +(item.quantity || 1)));
    return price;
  };

  if (!cart || cart.length < 1) {
    return (
      <div className="cart cartEmpty">
        <h1>Your Cart Is Empty!</h1>
        <Button
          onClick={() => {
            navigate("/allproducts");
          }}
          variant="contained"
        >
          Go To Products
        </Button>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__left">
        {cart &&
          cart.length > 0 &&
          cart.map((item) => (
            <div key={item.id} className="cartItem">
              <figure>
                <img className="cartItem--img" src={item.image} />
              </figure>
              <div className="cartItem__desc">
                <h3 className="cartItem__desc--title">{item.title}</h3>
                <div className="cartItem__desc--order">
                  <p className="cartItem__desc--price">${item.price}</p>
                  <input
                    type="number"
                    className="cartItem__desc--quantity"
                    min={0}
                    max={99}
                    value={item.quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateQuantity(item.id, e.target.value);
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "." || e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <p className="cartItem__desc--total">
                    $
                    {item.quantity === undefined || item.quantity === ""
                      ? 0
                      : (item.price * parseInt(item.quantity)).toFixed(2)}
                  </p>
                  <DeleteIcon
                    className="cartItem__desc--remove"
                    onClick={() => {
                      deleteItem(item.id);
                      setCart(getCartItems());
                      setCartItemCount(getCartItemCount());
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      {cart && cart.length > 0 && (
        <div className="cart__right">
          <h2>Cart:</h2>
          <div className="cart__right--subtotal">
            <span>Subtotal:</span>
            <span>${(0.85 * total()).toFixed(2)}</span>
          </div>
          <div className="cart__right--tax">
            <span>Tax:</span>
            <span>${(0.15 * total()).toFixed(2)}</span>
          </div>
          <div className="cart__right--price">
            <span>Price:</span>
            <span>${total().toFixed(2)}</span>
          </div>
          <Button variant="contained" fullWidth>
            Proceed To Checkout
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
