import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserShow.css";

function UserShow() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(searchQuery);
  

  console.log(users);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1111/api/auth/get-admin"
        );
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError("Error fetching users data");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const searchUserData = (e) => {
    const query = e.target.value.toLowerCase();
    console.log(query);
    setSearchQuery(query);
    const filtered = users.filter(
      (user) => 
        user.email.toLowerCase().includes(query) || 
        user.mobileNo.toString().toLowerCase().startsWith(query.toLowerCase())
    );
    console.log('filterData' , filtered);
    setFilteredUsers(filtered);
  };

  return (
    <div className="main">
      <h1>This is a user data page</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Email & MobileNo"
          value={searchQuery}
          onChange={searchUserData}
          className="search-Input"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Gender</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNo}</td>
                  <td>{user.gender}</td>
                  <td>{user.dateOfBirth}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserShow;
