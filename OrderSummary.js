// src/components/OrderSummary.js
import React from "react";
import { useCart } from "../context/CartContext";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { cartItems, totalPrice } = useCart();

  // Calculate values
  const subtotal = totalPrice;
  const shipping = subtotal > 5000 ? 0 : 200; // Free shipping if subtotal > ₹5000
  const tax = subtotal * 0.05; // 5% tax
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      {cartItems.length === 0 ? (
        <p>No items in your order.</p>
      ) : (
        <>
          <ul className="order-items">
            {cartItems.map((item) => (
              <li key={item.id} className="order-item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="order-totals">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="shipping">
              <span>Shipping:</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="tax">
              <span>Tax (5%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="grand-total">
              <span>Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="place-order-button">Place Order</button>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
