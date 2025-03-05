import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../data/fetchProducts'; // Ensure this function works properly
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

// Normalize function ensures category matching works correctly
const normalize = (str) => str?.toLowerCase().replace(/[\s-]/g, '') || '';

const CategoryPage = () => {
  const { category } = useParams(); // Gets category from the URL (e.g., "makeup")
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        console.log("Fetched Products:", allProducts);
        console.log("Category from URL:", category);

        // Filter products based on category match
        const filtered = allProducts.filter((product) => {
          console.log("Checking:", normalize(product.category), "vs", normalize(category));
          return product.category && normalize(product.category) === normalize(category);
        });

        setProducts(filtered);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    getProducts();
  }, [category]);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;
  if (products.length === 0)
    return <div className="no-products">No products found in the "{category}" category.</div>;

  return (
    <div className="category-page">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
