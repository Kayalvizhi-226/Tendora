export const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const fakeStoreData = await response.json();

    const mapCategory = (apiCategory) => {
      const cat = apiCategory.toLowerCase();
      if (cat.includes("electronics")) return "Electronics";
      if (cat.includes("jewelery")) return "Jewelry";
      if (cat.includes("men's clothing")) return "Men's Fashion";
      if (cat.includes("women's clothing")) return "Women's Fashion";
      return apiCategory;
    };

    const products = fakeStoreData.map((product) => ({
      id: `fs-${product.id}`,
      name: product.title,
      image: product.image,
      category: mapCategory(product.category),
      description: product.description,
      price: product.price,
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const products = await fetchProducts();
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
