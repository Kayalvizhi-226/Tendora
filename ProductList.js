// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../data/fetchProducts';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ searchQuery = '', selectedCategory = 'Show All' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Show All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="product-list-loading">Loading products...</div>;
  }

  if (error) {
    return <div className="product-list-error">{error}</div>;
  }

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">No products found.</div>
      )}
    </div>
  );
};

export default ProductList;
