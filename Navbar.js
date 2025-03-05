import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import { useCart } from "../context/CartContext";     
import { useWishlist } from "../context/WishlistContext"; 
import { useAuth } from "../context/AuthContext"; 
import { fetchProducts } from "../data/fetchProducts"; 
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth(); 

  const cartItemCount = cartItems?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
  const wishlistItemCount = wishlistItems?.length || 0;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const products = await fetchProducts();
        const uniqueCategories = [...new Set(products.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-icon" onClick={toggleMenu} aria-label="Toggle category menu">
          &#9776;
        </button>
        <div className="brand-name">
          <Link to="/">Tendora</Link>
        </div>
      </div>

      <div className="search-bar">
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={handleSearchChange} />
          <button type="submit">🔍</button>
        </form>
      </div>

      <div className="navbar-right">
        <Link to="/" className="nav-button">Home</Link>
        {!user && <Link to="/login" className="nav-button">Login</Link>} 
        <Link to="/wishlist" className="nav-button">
          Wishlist {wishlistItemCount > 0 && <span className="badge">{wishlistItemCount}</span>}
        </Link>
        <Link to="/cart" className="nav-button">
          Cart {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
        </Link>
        <Link to="/profile" className="nav-button profile-icon" title="Profile">
          <FaUserCircle size={28} />
        </Link>

        {user && (
          <button onClick={handleLogout} className="nav-button logout-btn">
            Logout
          </button>
        )}
      </div>

      {isMenuOpen && (
        <div className="dropdown-menu">
          <ul>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <li key={index}>
                  <button onClick={() => handleCategoryClick(category)}>{category}</button>
                </li>
              ))
            ) : (
              <li>Loading categories...</li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
