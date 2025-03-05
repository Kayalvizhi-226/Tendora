import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";  // ✅ Correct import
import { useWishlist } from "../context/WishlistContext";  // ✅ Correct import
import { fetchProducts } from "../data/fetchProducts";
import ProductCard from "../components/ProductCard";
import { Snackbar, Alert, Button } from "@mui/material";  // ✅ Import MUI components
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);  // ✅ Snackbar state

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const products = await fetchProducts();
        const foundProduct = products.find((p) => p.id === id);

        setProduct(foundProduct);

        if (foundProduct) {
          const categoryNormalized = foundProduct.category.toLowerCase();
          const similar = products.filter(
            (p) => p.category.toLowerCase() === categoryNormalized && p.id !== foundProduct.id
          );
          setSimilarProducts(similar);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    getProductsData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="product-not-found">Product not found.</div>;

  // ✅ Handle Payment Success (Shows Snackbar)
  const handlePayment = () => {
    setOpen(true);
  };

  return (
    <div className="product-page">
      <div className="product-details">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} className="product-detail-image" />
        <p>{product.description}</p>
        <p className="product-price">₹{product.price}</p>
        <div className="product-actions">
          <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="add-to-wishlist" onClick={() => addToWishlist(product)}>Add to Wishlist</button>
          
          {/* ✅ Updated Button */}
          <Button 
            variant="contained" 
            color="success" 
            onClick={handlePayment} 
            className="proceed-payment"
          >
            Proceed to Payment
          </Button>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="similar-products-section">
          <h3>Similar Products</h3>
          <div className="similar-products-grid">
            {similarProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

      {/* ✅ Snackbar Alert for Payment Success */}
      <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert 
          onClose={() => setOpen(false)} 
          severity="success" 
          variant="filled"
        >
          🎉 Payment Successful!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductPage;
