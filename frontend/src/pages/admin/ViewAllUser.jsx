import React, { useEffect, useState } from "react";
import AdminNavbar from '../../components/AdminNavbar';
import axios from "axios";

function ViewAllUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getAllUsers"
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div>
      <AdminNavbar />
      <div className="p-12">
        <input 
          type="text" 
          placeholder="Search users..." 
          value={searchTerm} 
          onChange={handleSearch} 
          className="p-2 border rounded mb-4 w-full"
        />
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border">Name</th>
              <th className="py-2 border">Username</th>
              <th className="py-2 border">Email</th>
              <th className="py-2 border">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t text-center">
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.username}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAllUser;
