/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Product_Add.css';

const Product_Add = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    productImage: '',
    discount: '',
    price: '',
    slashPrice: '',
    category: '',
    size: '',
    color: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'productImage') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Automatically calculate slashPrice
  useEffect(() => {
    if (formData.price && formData.discount) {
      const price = parseFloat(formData.price);
      const discount = parseFloat(formData.discount);
      if (!isNaN(price) && !isNaN(discount)) {
        const discountedPrice = price - (price * discount) / 100;
        setFormData((prev) => ({
          ...prev,
          slashPrice: discountedPrice.toFixed(2), // Ensuring two decimal points
        }));
      }
    }
  }, [formData.price, formData.discount]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });

      // Log for debugging
      for (let pair of formDataObj.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://localhost:1111/api/admin/product/add-New-Product",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Product added successfully!");
      console.log("Product added successfully:", response);

      setTimeout(() => {
        navigate("/list");
      }, 3000);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };
  

  return (
    <div className="product-form-container">
    <form className="product-form" onSubmit={onSubmitForm}>
      <h2 className="form-title">Product Form</h2>
  
      {successMessage && (
        <div className="success-message">
          {successMessage} <br />
          Redirecting to product list...
        </div>
      )}
  
      <div className="form-field">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
  
      <div className="form-field">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
          required
        ></textarea>
      </div>
  
      <div className="form-field">
        <label className="form-label">Product Image</label>
        <input
          type="file"
          name="productImage"
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
  
      <div className="form-group">
        <div className="form-field">
          <label className="form-label">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>
  
      <div className="form-group">
        <div className="form-field">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">Slash Price</label>
          <input
            type="number"
            name="slashPrice"
            value={formData.slashPrice}
            className="form-input"
            readOnly
          />
        </div>
      </div>
  
      <div className="form-group">
        <div className="form-field">
          <label className="form-label">Size</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Color</label>
          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Color</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Brick">Brick</option>
            <option value="Green">Green</option>
            <option value="Pink">Pink</option>
            <option value="Red">Red</option>
            <option value="White">White</option>
            <option value="Yellow">Yellow</option>
            <option value="Chocolate">Chocolate</option>
          </select>
        </div>
      </div>
  
      <div className="form-action">
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default Product_Add;
