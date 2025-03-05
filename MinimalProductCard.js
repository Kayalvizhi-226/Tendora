// src/components/MinimalProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './MinimalProductCard.css';

const MinimalProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Prevent navigation when clicking the overlay "Add to Cart" button
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Prevent navigation when clicking the overlay "Wishlist" button
  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };

  return (
    <div className="minimal-card">
      <div className="img-container">
        <img
          src={product.image}
          alt={product.name}
          className="minimal-card-image"
        />
        <div className="overlay">
          <button className="overlay-btn overlay-add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="overlay-btn overlay-add-to-wishlist" onClick={handleAddToWishlist}>
            Wishlist
          </button>
        </div>
      </div>
      <h3 className="minimal-card-name">{product.name}</h3>
      <Link to={`/product/${product.id}`} className="minimal-card-link">
        View Details
      </Link>
    </div>
  );
};

export default MinimalProductCard;
