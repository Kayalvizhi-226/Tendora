import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar'; // ✅ Added Navbar
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PaymentPage from './pages/PaymentPage';
import debounce from 'lodash.debounce';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced search to optimize performance
  const debouncedSearch = useMemo(
    () => debounce((query) => setSearchQuery(query), 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          {/* ✅ Navbar added here so it's visible across all pages */}
          <Navbar onSearch={debouncedSearch} />

          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/category/:category" element={<CategoryPage />} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>

          {/* ✅ Footer added here so it's visible across all pages */}
          <Footer />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
