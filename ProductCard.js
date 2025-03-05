import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, minimal }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="product-card">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="product-card-image"
      />

      {/* Product Name */}
      <h3 className="product-card-name">{product.name}</h3>

      {/* Only show rating, price, and buttons if NOT minimal */}
      {!minimal && (
        <div className="product-card-details">
          {/* Rating */}
          {product.rating && (
            <div className="product-card-rating">
              ⭐ {product.rating}
            </div>
          )}

          {/* Price */}
          {product.price && (
            <div className="product-card-price">
              ₹ {product.price}
            </div>
          )}

          {/* Action Buttons */}
          <div className="product-card-actions">
            <button className="add-to-cart">Add to Cart</button>
            <button className="add-to-wishlist">Add to Wishlist</button>

            {/* New "View Details" Button */}
            <button onClick={() => setShowDetails(true)} className="view-details">
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Modal for Product Details & Payment */}
      {showDetails && (
        <div className="modal">
          <div className="modal-content">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>

            {/* Payment Button */}
            <button 
              onClick={() => navigate('/payment', { state: { product } })} 
              className="proceed-to-payment"
            >
              Proceed to Payment
            </button>

            {/* Close Modal */}
            <button onClick={() => setShowDetails(false)} className="close-modal">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
