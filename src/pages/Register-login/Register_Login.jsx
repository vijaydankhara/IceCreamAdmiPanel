// import React, { useState } from 'react';
// import { FaUser } from 'react-icons/fa';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';
// import './Register_Login.css';

// const Register_Login = () => {
//   const navigate = useNavigate();

//   const [isRegister, setIsRegister] = useState(false); 
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     gender: '',
//     email: '',
//     dateOfBirth: '',
//     password: '',
//     mobileNo: '',
//   });
//   const [errors, setErrors] = useState({});

//   const toggleForm = () => {
//     setIsRegister(!isRegister);
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       firstName: '',
//       lastName: '',
//       gender: '',
//       email: '',
//       dateOfBirth: '',
//       password: '',
//       mobileNo: '',
//     });
//     setErrors({});
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const formErrors = {};
//     if (isRegister) {
//       if (!formData.firstName) formErrors.firstName = 'First Name is required';
//       if (!formData.lastName) formErrors.lastName = 'Last Name is required';
//       if (!formData.gender) formErrors.gender = 'Gender is required';
//       if (!formData.dateOfBirth) formErrors.dateOfBirth = 'Date of Birth is required';
//       if (!formData.mobileNo) formErrors.mobileNo = 'Mobile Number is required';
//     }

//     if (!formData.email || !validateEmail(formData.email)) {
//       formErrors.email = 'Valid Email is required';
//     }

//     if (!formData.password) {
//       formErrors.password = 'Password is required';
//     }

//     return formErrors;
//   };

//   const onSubmitForm = async (e) => {
//     e.preventDefault();

//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     try {
//       if (isRegister) {
//         await axios.post('http://localhost:1111/api/auth/register-admin', {
//           ...formData,
//           isAdmin: true,
//         });
//         toast.success('Admin registered successfully!');
//         toggleForm(); // Switch to login after successful registration
//       } else {
//         const response = await axios.post('http://localhost:1111/api/auth/login', {
//           email: formData.email,
//           password: formData.password,
//         });
//         const token = response.data.token;
//         localStorage.setItem('authToken', token);
//         toast.success('Logged in successfully!');
//         navigate('/getAdmin');
//       }
//       resetForm();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="form-container">
//       <ToastContainer /> {/* Add ToastContainer for notifications */}
//       <div className="form-box">
//         <div className="form-header">
//           <FaUser className="form-icon" />
//           <h2>{isRegister ? 'Admin Registration' : 'Login'}</h2>
//         </div>

//         <form onSubmit={onSubmitForm}>
//           {isRegister && (
//             <>
//               <div className="form-group">
//                 <label>First Name <span>*</span></label>
//                 <input
//                   name="firstName"
//                   placeholder="John"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   className={errors.firstName ? 'error-input' : ''}
//                   type="text"
//                 />
//                 {errors.firstName && <p className="error-message">{errors.firstName}</p>}
//               </div>

//               <div className="form-group">
//                 <label>Last Name <span>*</span></label>
//                 <input
//                   name="lastName"
//                   placeholder="Doe"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className={errors.lastName ? 'error-input' : ''}
//                   type="text"
//                 />
//                 {errors.lastName && <p className="error-message">{errors.lastName}</p>}
//               </div>

//               <div className="form-group">
//                 <label>Gender <span>*</span></label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   className={errors.gender ? 'error-input' : ''}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//                 {errors.gender && <p className="error-message">{errors.gender}</p>}
//               </div>

//               <div className="form-group">
//                 <label>Date of Birth <span>*</span></label>
//                 <input
//                   name="dateOfBirth"
//                   type="date"
//                   value={formData.dateOfBirth}
//                   onChange={handleInputChange}
//                   className={errors.dateOfBirth ? 'error-input' : ''}
//                 />
//                 {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
//               </div>

//               <div className="form-group">
//                 <label>Mobile Number <span>*</span></label>
//                 <input
//                   name="mobileNo"
//                   placeholder="1234567890"
//                   value={formData.mobileNo}
//                   onChange={handleInputChange}
//                   className={errors.mobileNo ? 'error-input' : ''}
//                   type="text"
//                 />
//                 {errors.mobileNo && <p className="error-message">{errors.mobileNo}</p>}
//               </div>
//             </>
//           )}

//           <div className="form-group">
//             <label>Email <span>*</span></label>
//             <input
//               name="email"
//               placeholder="admin@example.com"
//               value={formData.email}
//               onChange={handleInputChange}
//               className={errors.email ? 'error-input' : ''}
//               type="email"
//             />
//             {errors.email && <p className="error-message">{errors.email}</p>}
//           </div>

//           <div className="form-group">
//             <label>Password <span>*</span></label>
//             <input
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className={errors.password ? 'error-input' : ''}
//               type="password"
//             />
//             {errors.password && <p className="error-message">{errors.password}</p>}
//           </div>

//           <button type="submit" className="submit-button">
//             {isRegister ? 'Register as Admin' : 'Login'}
//           </button>
//         </form>

//         <button onClick={toggleForm} className="toggle-button">
//           {isRegister ? 'Switch to Login' : 'Switch to Admin Registration'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register_Login;

///////////////////////////////////////////////////////

import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register_Login.css';

const Register_Login = () => {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    dateOfBirth: '',
    password: '',
    mobileNo: '',
  });
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsRegister(!isRegister);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      dateOfBirth: '',
      password: '',
      mobileNo: '',
    });
    setErrors({});
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (isRegister) {
      if (!formData.firstName) formErrors.firstName = 'First Name is required';
      if (!formData.lastName) formErrors.lastName = 'Last Name is required';
      if (!formData.gender) formErrors.gender = 'Gender is required';
      if (!formData.dateOfBirth) formErrors.dateOfBirth = 'Date of Birth is required';
      if (!formData.mobileNo) formErrors.mobileNo = 'Mobile Number is required';
    }

    if (!formData.email || !validateEmail(formData.email)) {
      formErrors.email = 'Valid Email is required';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    }

    return formErrors;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      if (isRegister) {
        await axios.post('http://localhost:1111/api/auth/register-admin', {
          ...formData,
          isAdmin: true,
        });
        toast.success('Admin registered successfully!');
        toggleForm();
      } else {
        const response = await axios.post('http://localhost:1111/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        toast.success('Logged in successfully!');
    
      }
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <div className="form-box">
        <div className="form-header">
          <FaUser className="form-icon" />
          <h2>{isRegister ? 'Admin Registration' : 'Login'}</h2>
        </div>
        <form onSubmit={onSubmitForm}>
          {isRegister && (
            <>
              <div className="form-group">
                <label>First Name <span>*</span></label>
                <input
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error-input' : ''}
                  type="text"
                />
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
              </div>
              <div className="form-group">
                <label>Last Name <span>*</span></label>
                <input
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error-input' : ''}
                  type="text"
                />
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
              </div>
              <div className="form-group">
                <label>Gender <span>*</span></label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={errors.gender ? 'error-input' : ''}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="error-message">{errors.gender}</p>}
              </div>
              <div className="form-group">
                <label>Date of Birth <span>*</span></label>
                <input
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={errors.dateOfBirth ? 'error-input' : ''}
                />
                {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
              </div>
              <div className="form-group">
                <label>Mobile Number <span>*</span></label>
                <input
                  name="mobileNo"
                  placeholder="1234567890"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  className={errors.mobileNo ? 'error-input' : ''}
                  type="text"
                />
                {errors.mobileNo && <p className="error-message">{errors.mobileNo}</p>}
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email <span>*</span></label>
            <input
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error-input' : ''}
              type="email"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Password <span>*</span></label>
            <input
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error-input' : ''}
              type="password"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit" className="submit-button">
            {isRegister ? 'Register as Admin' : 'Login'}
          </button>
        </form>
        <button onClick={toggleForm} className="toggle-button">
          {isRegister ? 'Switch to Login' : 'Switch to Admin Registration'}
        </button>
      </div>
    </div>
  );
};

export default Register_Login;
