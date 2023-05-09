import { color } from "@mui/system";
import React, { useState } from "react";
import "./Cart.css";
import Header from "./Header";

const Cart =  ({cartItems, handleAdd, removeFromCart, handleDelete, totalQuantity}) => {

  const getTotalCartValue = (cartItems = []) => {
    if (!cartItems.length) return 0;

    const total = cartItems
      .map((item) => item.price * item.productinCart)
      .reduce((total, n) => total + n);

    return total;
  };

  const totalPrice = getTotalCartValue(cartItems);

  return (

      <>
      <Header cartItems={cartItems} totalQuantity={totalQuantity} open />

      <div className="main">
        <div className="main-heading" >Shopping Cart</div>
        <div className="main-subheading">
          {cartItems.length ? (
            <>
              <div className="main-box">
                <div className="sub-box">
                  {cartItems.map((item) => (
                    <div className="item" key={item.id}>
                      <div className="product">
                        <div className="productImage">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div className="space-between"></div>
                        <div className="space-between"></div>

                        <div className="productDetail">
                          <div className="card-content1">
                            <p style={{ fontWeight: "bold", color:"#535B4E", objectFit:"contain"}}>{item.title}</p>
                          </div>  
                          <div className="space-between"></div>
                          <div className="card-content2">
                            <p style={{ fontSize: "15px", fontWeight: "700", color: "grey"}}>
                              $ {item.price}
                            </p>
                            <p style={{ fontWeight: "bold" }}>Quantity: {item.productinCart}</p>
                          </div>
                        </div>
                      </div>
                      <div className="buttons">
                        <button
                          className="change"
                          onClick={(e) => handleAdd(item)}
                        >
                          +
                        </button>
                        <div className="space"></div>
                        <button
                          className="change"
                          onClick={(e) => removeFromCart(item)}
                        >
                          -
                        </button>
                        <div className="space"></div>
                        <button
                          className="delete"
                          onClick={(e) => handleDelete(item)}
                        >
                          DELETE
                        </button>
                        <i
                          onClick={(e) => handleDelete(item)}
                          className="fa fa-trash deleteIcon"
                          style={{ fontSize: "25px", color: "gray" }}
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="seperator"></div>
                <div className="total data">
                  <div className="totalprice" style={{color:"black"}}>
                    Total Amount: $ {totalPrice}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-box">
            <h2>Your Cart is Found Empty</h2>
            <p>
              Please visit the products page and add some items to your cart for
              purchase as your cart was found to be empty.
            </p>
            <img src="https://www.nicepng.com/png/detail/322-3224210_your-cart-is-currently-empty-empty-shopping-cart.png" height="400"/>
          </div>
          )}
        </div>
      </div>
    </>
    );
}

export default Cart;
