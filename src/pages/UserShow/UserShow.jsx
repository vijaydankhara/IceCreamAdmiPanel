import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserShow.css";

function UserShow() {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:1111/api/auth/get-admin");
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError('Error fetching users data');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); 

 

  return (
    <div className='main'>
      <h1>This is a user data page</h1>
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
          {users.length > 0 ? (
            users.map((user) => (
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
    </div>
  );
}

export default UserShow;
