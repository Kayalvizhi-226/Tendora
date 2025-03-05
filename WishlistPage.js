import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import './WishlistPage.css'; // Ensure this import matches the file path

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <>
          <ul>
            {wishlistItems.map(item => (
              <li key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.name} className="wishlist-item-image" />
                <div className="wishlist-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button className="clear-wishlist-btn" onClick={clearWishlist}>Clear Wishlist</button>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
