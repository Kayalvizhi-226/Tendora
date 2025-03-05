// src/context/WishlistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  // Initialize wishlist from localStorage or as an empty array
  const [wishlistItems, setWishlistItems] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlistItems');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Function to add a product to the wishlist
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      // If product is not already in the wishlist, add it
      if (!prevItems.find(item => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  // Function to remove a product from the wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
