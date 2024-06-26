import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import { CgUserAdd } from "react-icons/cg";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const AdminDashboard = () => {
  const location = useLocation();
  const admin = location.state?.admin;
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userSpecificId, setUserSpecificId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({ phone: "" });
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [perDay, setPerDay] = useState({});

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

  const [industries, setIndustries] = useState([]);
  const [categories, setCategories] = useState([]);
  const isSmallScreen = window.innerWidth <= 768;

  const customStyles = {
    content: {
      borderRadius: "25px",
      width: isSmallScreen ? "80%" : "40%",
      margin: "auto",
      height: "90%",
      padding: "2rem",
    },
  };

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

  const fetchIndustriesAndCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getIndustriesAndCategories"
      );
      setIndustries(response.data.industries);
      setCategories(response.data.categories);
      setPerDay(response.data.perDay);
    } catch (error) {
      console.error("Error fetching industries and categories:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchIndustriesAndCategories();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.name &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.username &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.phone && user.phone.includes(searchTerm))
  );

  useEffect(() => {
    if (formData.dob) {
      const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
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

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "designation" || name === "category") {
      updatePerDayWage(value, name);
    }

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        [name]: numericValue,
      });

      if (numericValue.length !== 10) {
        setErrors({
          ...errors,
          phone: "Phone number must be exactly 10 digits.",
        });
      } else {
        setErrors({
          ...errors,
          phone: "",
        });
      }
    }
  };

  const updatePerDayWage = (value, field) => {
    const designation = field === "designation" ? value : formData.designation;
    const category = field === "category" ? value : formData.category;

    if (
      designation &&
      category &&
      perDay[designation] &&
      perDay[designation][category]
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        perDay: perDay[designation][category],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        perDay: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalIsOpen(false);

    const submitFormData = async () => {
      if (!isEdit) {
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
          const response = await axios.post(
            "http://localhost:8000/api/user/create",
            mappedData
          );
          setUsers([...users, response.data]);
          fetchUsers();
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      } else {
        const mappedData = {
          name: formData.fullName,
          username: formData.userName,
          // password: formData.password,
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
          const response = await axios.put(
            `http://localhost:8000/api/admin/editUser/${userSpecificId}`,
            mappedData
          );
          setUsers([...users, response.data]);
          fetchUsers();
          setIsEdit(false);
        } catch (error) {
          console.error("Error submitting form:", error);
          setIsEdit(false);
        }
      }
    };

    submitFormData();

    setFormData({
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
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEdit = (user) => {
    setIsEdit(true);
    setUserSpecificId(user._id);
    setFormData({
      fullName: user.name,
      userName: user.username,
      password: null,
      fatherOrHusbandName: user.guardianName,
      dob: formatDate(user.dob),
      age: user.age,
      sex: user.sex,
      doj: formatDate(user.joiningDate),
      designation: user.designation,
      category: user.workCategory,
      perDay: perDay[user.designation]?.[user.workCategory] || "",
      address: user.address,
      phone: user.phone,
      grossSalary: user.actualGrossSalary,
      email: user.email,
    });
    setModalIsOpen(true);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/delete/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`http://localhost:8000/api/user/reset-password`, {
        newPassword: passwordData.newPassword,
        username: userSpecificId,
      });
      alert("Password updated successfully!");
      setPasswordModalIsOpen(false);
      setPasswordData({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleUpdatePassword = (user) => {
    setUserSpecificId(user.username);
    setPasswordModalIsOpen(true);
  };

  return (
    <div className="w-full">
      <AdminNavbar UserName={admin.name} />
      <div className="p-8">
        <div className="ViewUser overflow-scroll md:overflow-hidden">
          <div className="AllUserHeading tpHead flex flex-col md:justify-between mx-2 md:mx-8 md:my-4 mb-4 md:flex-row">
            <h2 className="text-2xl flex justify-center pb-4 md:mt-4">
              All Users
            </h2>
            <div className="flex flex-row">
              <div className="flex mt-2 md:mt-1">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="p-2 border border-black rounded mb-4 w-full md:w-96 md:mt-[0.3rem]"
                />
                {searchTerm && (
                  <IoClose
                    className="text-4xl mt-1 cursor-pointer mb-5"
                    onClick={clearSearch}
                  />
                )}
              </div>
              <div
                className="flex border m-2 p-2 h-10 text-lg rounded items-center cursor-pointer transform transition-transform hover:scale-105 md:w-30 md:h-11  bg-green-600 text-white  hover:bg-green-200 hover:text-green-600"
                onClick={() => setModalIsOpen(true)}
              >
                <CgUserAdd className="text-xl mr-2 " />
                <h2 className="text-xs">Add User</h2>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Modal
              isOpen={modalIsOpen}
              contentLabel="Example Modal"
              style={customStyles}
            >
              <div className="">
                <div
                  className="flex justify-end"
                  onClick={() => {
                    setModalIsOpen(false);
                    setFormData({
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
                    setIsEdit(false);
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
                  {!isEdit && (
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
                  )}
                  <div>
                    <label>Father/Husband Name</label>
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
                      <option value="">Select Industry</option>
                      {industries.map((industry, index) => (
                        <option key={index} value={industry}>
                          {industry}
                        </option>
                      ))}
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
                      <option value="">Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Per Day Wage</label>
                    <input
                      type="number"
                      disabled={true}
                      value={formData.perDay}
                      className="block w-full mt-1 p-2 border"
                    />
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
                    {errors.phone && (
                      <p className="text-red-500">{errors.phone}</p>
                    )}
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
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </Modal>

            <Modal
              isOpen={passwordModalIsOpen}
              contentLabel="Update Password Modal"
              style={customStyles}
            >
              <div className="">
                <div
                  className="flex justify-end"
                  onClick={() => {
                    setPasswordModalIsOpen(false);
                    setPasswordData({
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  <IoClose className="text-4xl" />
                </div>

                <form onSubmit={handlePasswordSubmit} className="p-4 space-y-4">
                  <div>
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="block w-full mt-1 p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="block w-full mt-1 p-2 border"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </Modal>
          </div>

          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 border border-slate-950 bg-gray-100">
                  Name
                </th>
                <th className="py-2 border border-slate-950 bg-gray-100">
                  Username
                </th>
                <th className="hidden md:table-cell py-2 border border-slate-950 bg-gray-100">
                  Email
                </th>
                <th className="hidden md:table-cell py-2 border border-slate-950 bg-gray-100">
                  Phone
                </th>
                <th className=" md:table-cell py-2 border border-slate-950 bg-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t text-center">
                  <td className="py-2 px-4 border">
                    <Link
                      to={`/admin/dashboard/individual-user-detail/${user._id}`}
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border">
                    <Link
                      to={`/admin/dashboard/individual-user-detail/${user._id}`}
                    >
                      {user.username}
                    </Link>
                  </td>
                  <td className="hidden md:table-cell py-2 px-4 border">
                    <Link
                      to={`/admin/dashboard/individual-user-detail/${user._id}`}
                    >
                      {user.email}
                    </Link>
                  </td>
                  <td className="hidden md:table-cell py-2 px-4 border">
                    <Link
                      to={`/admin/dashboard/individual-user-detail/${user._id}`}
                    >
                      {user.phone}
                    </Link>
                  </td>
                  <td className="flex flex-row py-2 items-center justify-center w-80 md:w-auto">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white p-2 rounded mr-2 flex items-center justify-center gap-1 hover:bg-yellow-200 hover:text-yellow-600"
                    >
                      <MdEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white p-2 rounded flex items-center justify-center gap-1 hover:bg-red-100 hover:text-red-600"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleUpdatePassword(user)}
                      className="bg-blue-600 text-white text-sm p-2 ml-2 rounded flex items-center justify-center gap-1 hover:bg-blue-100 hover:text-blue-600"
                    >
                      <RxUpdate /> Update Password
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
