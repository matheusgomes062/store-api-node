import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    name: "",
    company: "",
    featured: "",
    sort: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = new URLSearchParams(searchParams).toString();
      try {
        const response = await fetch(`/api/v1/products?${query}`);
        const result = await response.json();
        setData(result.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      sort: e.target.value,
    }));
  };

  const handleFeaturedChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      featured: e.target.value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product List</h1>
        <div className="search-filters">
          <input
            type="text"
            name="name"
            placeholder="Search by name"
            className="search-input"
            value={searchParams.name}
            onChange={handleSearch}
          />
          <input
            type="text"
            name="company"
            placeholder="Search by company"
            className="search-input"
            value={searchParams.company}
            onChange={handleSearch}
          />
          <select name="featured" className="search-input" onChange={handleFeaturedChange} value={searchParams.featured}>
            <option value="">All</option>
            <option value="true">Featured</option>
            <option value="false">Not Featured</option>
          </select>
          <select name="sort" className="search-input" onChange={handleSortChange} value={searchParams.sort}>
            <option value="">Sort by</option>
            <option value="price">Price (asc)</option>
            <option value="-price">Price (desc)</option>
            <option value="name">Name (asc)</option>
            <option value="-name">Name (desc)</option>
          </select>
        </div>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <div className="card-container">
            {data.map((product) => (
              <div className="card" key={product._id}>
                <h3>{product.name}</h3>
                <p>Company: {product.company}</p>
                <p>Price: ${product.price}</p>
                {product.featured && <p>Featured Product</p>}
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
