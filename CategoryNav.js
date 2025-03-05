// src/components/CategoryNav.js
import React from 'react';
import PropTypes from 'prop-types';
import './CategoryNav.css';

const CategoryNav = ({ categories, selectedCategory, onSelectCategory, loading, error }) => {
  if (loading) {
    return <div className="category-nav-loading">Loading categories...</div>;
  }

  if (error) {
    return <div className="category-nav-error">Error loading categories.</div>;
  }

  return (
    <nav className="category-nav" aria-label="Product Categories">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          aria-pressed={selectedCategory === category}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

CategoryNav.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

CategoryNav.defaultProps = {
  loading: false,
  error: false,
};

export default CategoryNav;
