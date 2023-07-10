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

function deleteItem(itemId: number) {
  const cartItems: productData[] = getCartItems();
  const pasirinktas = cartItems.find((item) => item.id === itemId);
  const newCart = cartItems.filter((item) => item !== pasirinktas);
  localStorage.setItem("cart", JSON.stringify(newCart));
}

function addToCart(productData: productData) {
  const JSONCart = localStorage.getItem("cart");
  if (JSONCart !== null) {
    const cartData: productData[] = JSON.parse(JSONCart);
    cartData.push({ ...productData, quantity: "1" });
    localStorage.setItem("cart", JSON.stringify(cartData));
  } else {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ ...productData, quantity: "1 " }])
    );
  }
}

function getCartItems() {
  const cart = localStorage.getItem("cart");
  if (cart !== null) {
    return JSON.parse(cart);
  }
}

function getCartItemCount() {
  const cart = localStorage.getItem("cart");
  if (cart !== null) {
    return JSON.parse(cart).length;
  }
}

export { deleteItem, addToCart, getCartItems, getCartItemCount };
