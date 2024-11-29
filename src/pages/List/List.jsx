import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import './List.css';

const API_BASE_URL = "http://localhost:1111";

const List = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [error, setError] = useState(null);

  // Fetch products using axios
  useEffect(() => {
    const GetAllProducts = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No token found. Please login.");
        }

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${API_BASE_URL}/api/admin/product/get-All-Product`,
          { headers }
        );

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError(error.response?.data?.message || "Failed to load products.");
      }
    };

    GetAllProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      {/* Add Product Button */}
      <div className="flex justify-end mb-4">
        <NavLink to="/product_add">
          <button className="add-product-button">Add Product</button>
        </NavLink>
      </div>

      {/* Display error if exists */}
      {error && <p className="text-center text-red">{error}</p>}

      {/* Responsive Product Table */}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Price</th>
              <th>Slash Price</th>
              <th>Discount</th>
              <th>Category</th>
              <th>Size</th>
              <th>Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.title}</td>
                  <td>{product.description.slice(0, 30)}...</td>
                  <td>
                    {product.productImage?.length > 0 && (
                      <img
                        src={`${API_BASE_URL}/${product.productImage[0]}`}
                        alt={product.title}
                      />
                    )}
                  </td>
                  <td>${product.price}</td>
                  <td>${product.slashPrice}</td>
                  <td>{product.discount}</td>
                  <td>{product.category}</td>
                  <td>{product.size.join(", ")}</td>
                  <td>{product.color.join(", ")}</td>
                  <td>
                    <div className="flex space-x-2 justify-center">
                      <NavLink>
                        <FaEdit className="icon-edit" />
                      </NavLink>
                      <MdDelete className="icon-delete" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No products available or Token Problem
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(products.length / productsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default List;
