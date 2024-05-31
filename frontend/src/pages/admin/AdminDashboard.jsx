import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import { CgUserAdd } from "react-icons/cg";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

const AdminDashboard = () => {
  const location = useLocation();
  const admin = location.state.admin;
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    fatherOrHusbandName: "",
    dob: "",
    age: "",
    sex: "",
    doj: "",
    designation: "",
    category: "",
    perDay: "",
    address: "",
    phone: "",
    grossSalary: "",
    email: "",
  });

  const customStyles = {
    content: {
      borderRadius: '25px',
      height: '90%',
      padding: '2rem',
    },
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
            "http://localhost:8000/api/admin/getAllUsers"
        );
        console.log(response.data.data);
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (formData.dob) {
      const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

      const age = calculateAge(formData.dob);
      setFormData((prevFormData) => ({
        ...prevFormData,
        age: age,
      }));
    }
  }, [formData.dob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setModalIsOpen(false);
    console.log('modal closed');
    console.log(formData);

    const submitFormData = async () => {
      const mappedData = {
        name: formData.fullName,
        username: formData.userName,
        password: formData.password,
        guardianName: formData.fatherOrHusbandName,
        dob: formData.dob,
        sex: formData.sex,
        joiningDate: formData.doj,
        designation: formData.designation,
        workCategory: formData.category,
        address: formData.address,
        phone: formData.phone,
        actualGrossSalary: formData.grossSalary,
        email: formData.email,
      };

      try {
        const response = await axios.post('http://localhost:8000/api/user/create', mappedData);
        console.log('Response:', response.data);
        setUsers([...users, response.data]); // Update users list with the new user
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    submitFormData();
  };

  const handleEdit = (user) => {
    setFormData({
      fullName: user.name,
      userName: user.username,
      password: "", // Keep password empty for security reasons
      fatherOrHusbandName: user.guardianName,
      dob: user.dob,
      age: user.age,
      sex: user.sex,
      doj: user.joiningDate,
      designation: user.designation,
      category: user.workCategory,
      perDay: "", // This is not needed
      address: user.address,
      phone: user.phone,
      grossSalary: user.actualGrossSalary,
      email: user.email,
    });
    setModalIsOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/deleteUser/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
      <div className="w-full">
        <AdminNavbar UserName={admin.name} />
        <div className="p-8">
          <div className="ViewUser overflow-scroll md:overflow-hidden">
            <div className="tpHead flex justify-between mx-12 md:mx-32">
              <h2 className="text-2xl">All Users</h2>
              <div
                  className="flex border border-black p-2 rounded items-center "
                  onClick={() => {
                    setModalIsOpen(true);
                  }}
              >
                <CgUserAdd className="text-2xl mr-2" />
                <h2>Add User</h2>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <Modal isOpen={modalIsOpen} contentLabel="Example Modal" style={customStyles}>
                <div
                    className="flex justify-end"
                    onClick={() => {
                      setModalIsOpen(false);
                    }}
                >
                  <IoClose className="text-4xl" />
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                  <div>
                    <label>Full Name of the Employee</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    />
                  </div>
                  <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    />
                  </div>
                  <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    />
                  </div>
                  <div>
                    <label>Father's/Husband's Name</label>
                    <input
                        type="text"
                        name="fatherOrHusbandName"
                        value={formData.fatherOrHusbandName}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    />
                  </div>
                  <div>
                    <label>DOB</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    />
                  </div>
                  <div>
                    <label>Age</label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        readOnly
                        className="block w-full mt-1 p-2 border"
                    />
                  </div>
                  <div>
                    <label>Sex</label>
                    <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label>DOJ</label>
                    <input
                        type="date"
                        name="doj"
                        value={formData.doj}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    />
                  </div>
                  <div>
                    <label>Nature of Work / Designation</label>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    >
                      <option value="opt1">Option 1</option>
                      <option value="opt2">Option 2</option>
                      <option value="opt3">Option 3</option>
                    </select>
                  </div>
                  <div>
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    >
                      <option value="ctg1">Category 1</option>
                      <option value="ctg2">Category 2</option>
                      <option value="ctg3">Category 3</option>
                    </select>
                  </div>
                  <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    />
                  </div>
                  <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    />
                  </div>
                  <div>
                    <label>Actual Gross Salary</label>
                    <input
                        type="number"
                        name="grossSalary"
                        value={formData.grossSalary}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    />
                  </div>
                  <div>
                    <label>Email ID</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border"
                        required
                    />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Submit
                  </button>
                </form>
              </Modal>
            </div>

            <table className="min-w-full bg-white">
              <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Username</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Actions</th>
              </tr>
              </thead>
              <tbody>
              {users.map((user) => (
                  <tr key={user.id} className="border-t text-center">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.username}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.phone}</td>
                    <td className="py-2 px-4">
                      <button
                          onClick={() => handleEdit(user)}
                          className="bg-yellow-500 text-white p-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;
