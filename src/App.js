import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import Cart from './components/Cart';
import HomeScreen from './components/HomeScreen'
import ProductListScreen from "./components/ProductListScreen"
import ProductDetailScreen from "./components/ProductDetailScreen"

export const config = {
  endpoint: "http://localhost:3000",
  endpoint2: "https://fakestoreapi.com"
};


function App() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    const productAvailable = cartItems.find((item) => item.id === product.id);
    if(product.quantity!==0){
      if (productAvailable) {
        alert("Product is already in the cart!");
      } else {
      setCartItems([...cartItems, { ...product, productinCart: 1 }]);
      alert("Product added to cart!");
      }
    }
    else{
      alert("Product is out of stock!");
  }
  };

  console.log("handleAddToCart prop:", handleAddToCart);
  const handleAddition = (product) => {
    const productAvailable = cartItems.find((item) => item.id === product.id);
    if (productAvailable && productAvailable.productinCart < product.quantity) {
      setCartItems( cartItems.map((item) => item.id === product.id ? { ...productAvailable, productinCart: productAvailable.productinCart + 1 }: item )
      );
    } else {
      alert("Product is out of stock!");
    }
  };

  const removeFromCart = (product) => {
    const productAvailable = cartItems.find((item) => item.id === product.id);
    if (productAvailable.productinCart === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productAvailable, productinCart: productAvailable.productinCart - 1 }
            : item
        )
      );
    }
  };

  const handleDelete = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  const totalQuantity = (cartItems) => {
    if (!cartItems.length) return 0;

    const totalItem = cartItems
      .map((item) => item.productinCart)
      .reduce((totalItem, n) => totalItem + n);

    return totalItem;
  };

  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={HomeScreen} />

      <Route exact path="/products/:category">
        {(props) => (
        <ProductListScreen
        {...props}
        cartItems={cartItems}
        handleAddToCart={handleAddToCart}
        totalQuantity={totalQuantity}
        />
        )}
      </Route>
 
      <Route exact path="/products/:category/:productId">
        {(props) => (
        <ProductDetailScreen
        {...props}
        cartItems={cartItems}
        handleAddToCart={handleAddToCart}
        totalQuantity={totalQuantity}
        />
        )}
        </Route>
        <Route exact path="/cart">
        <Cart
               cartItems={cartItems}
               handleAdd={handleAddition}
               removeFromCart={removeFromCart}
               handleDelete={handleDelete}
               totalQuantity={totalQuantity}
             />
        </Route>
        </Switch>
        
          </div>
          );
        }
        export default App;
    