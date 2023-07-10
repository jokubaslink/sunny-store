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
    // Duomenu pridejimas jeigu yra sukurtas jau cartas!.
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

/* const JSONCart = localStorage.getItem("cart");
              if (JSONCart !== null) {
                const cartData: productDataType[] = JSON.parse(JSONCart);
                if (productData) {
                  cartData.push(productData);
                }
                const newCart = JSON.stringify(cartData);
                localStorage.setItem("cart", newCart);
              } else {
                localStorage.setItem("cart", JSON.stringify([productData]));
              } */

// Cia gauname informacija apie prideta itema! -> pridedame ji cia per funkcija addToCart(); kuri bus per propsus perkelta i product.
// Gauta informacija tures [{...productData, quantity: 1}];
// Ar is cia siusti informacija i cart? ar paciam carte gauti informacija is localStorage.getItem()?
// Reikia padaryti useState, kad jeigu paspaudei ant maikes ar ko tu nebegali daugiau spausti

// Del Carto:
// cia gal bus funkcija change quantity. Gauname informacija is localStorage arba is array'aus kuri turetume cia laikyti
// Gauname informacija is carto kuris mums perduoda prekes id ir quantity skaiciu
// Tada surandame ta elementa su funkcija const rastas = array.find(item => item.id === gautasID)
// [{...rastas, quantity: quantity}]
