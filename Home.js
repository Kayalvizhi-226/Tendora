import React, { useState, useEffect, useMemo } from 'react';
import MinimalProductCard from '../components/MinimalProductCard';
import { fetchProducts } from '../data/fetchProducts';
import './Home.css';

const Home = ({ searchQuery = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(true);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Memoize filtered products based on search query
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter(product => {
      const matchesSearch = query
        ? (product.name && product.name.toLowerCase().includes(query)) ||
          (product.description && product.description.toLowerCase().includes(query))
        : true;
      return matchesSearch;
    });
  }, [products, searchQuery]);

  return (
    <div className="home-container">
      {loading ? (
        <div className="home-loading">Loading products...</div>
      ) : error ? (
        <div className="home-error">Error fetching products. Please try again later.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <MinimalProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products">No products found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
