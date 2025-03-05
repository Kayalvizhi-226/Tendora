// src/components/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css"; // Ensure you create appropriate styles in Cart.css

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button 
                    className="remove-button" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
            <div className="cart-actions">
              <button className="clear-button" onClick={clearCart}>Clear Cart</button>
              <button 
                className="checkout-button" 
                onClick={() => {
                  // Add your checkout logic here, e.g., navigate to the checkout page
                  console.log("Proceeding to checkout");
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
