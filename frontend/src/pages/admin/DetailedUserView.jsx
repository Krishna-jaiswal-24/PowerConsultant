import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios'; 

function DetailedUserView() {
  const location = useLocation();
  const admin = location.state?.admin;
  const [attendanceDetails, setAttendanceDetails] = useState([]);

  const fetchAttendanceDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/attendance/${user._id}`);
      setAttendanceDetails(response.data.data);
      console.log("Attendance details:", response.data.data);
    } catch (error) {
      console.error("Error fetching attendance details:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceDetails();
  }, []);

  const userData = {
    fullName: "John Doe",
    userName: "johndoe123",
    password: "securepassword",
    fatherOrHusbandName: "Robert Doe",
    dob: "1990-01-01",
    age: 34,
    sex: "Male",
    doj: "2020-01-15",
    designation: "Software Engineer",
    category: "Full-time",
    perDay: 8,
    address: "123 Main St, Springfield, IL",
    phone: "123-456-7890",
    grossSalary: "100000",
    email: "john.doe@example.com"
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-col p-16">
        <div className="pb-10">
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Full Name:</strong> {userData.fullName}</div>
            <div><strong>Username:</strong> {userData.userName}</div>
            <div><strong>Password:</strong> {userData.password}</div>
            <div><strong>Father/Husband Name:</strong> {userData.fatherOrHusbandName}</div>
            <div><strong>Date of Birth:</strong> {userData.dob}</div>
            <div><strong>Age:</strong> {userData.age}</div>
            <div><strong>Sex:</strong> {userData.sex}</div>
            <div><strong>Date of Joining:</strong> {userData.doj}</div>
            <div><strong>Designation:</strong> {userData.designation}</div>
            <div><strong>Category:</strong> {userData.category}</div>
            <div><strong>Per Day:</strong> {userData.perDay}</div>
            <div><strong>Address:</strong> {userData.address}</div>
            <div><strong>Phone:</strong> {userData.phone}</div>
            <div><strong>Gross Salary:</strong> {userData.grossSalary}</div>
            <div><strong>Email:</strong> {userData.email}</div>
          </div>
        </div>
        <div>
          <div className="overflow-scroll md:overflow-hidden">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Duty Type</th>
                  <th className="py-2 px-4 border">Duty Hours</th>
                  <th className="py-2 px-4 border">OT Hours</th>
                  <th className="py-2 px-4 border">Site Location</th>
                  <th className="py-2 px-4 border">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendanceDetails.map((detail) => (
                  <tr key={detail._id} className="text-center">
                    <td className="py-2 px-4 border">{detail.date}</td>
                    <td className="py-2 px-4 border">{detail.dutyType}</td>
                    <td className="py-2 px-4 border">{detail.dutyHours}</td>
                    <td className="py-2 px-4 border">{detail.otHours}</td>
                    <td className="py-2 px-4 border">{detail.siteLocation}</td>
                    <td className="py-2 px-4 border">{detail.remark}</td>
                    <td className="py-2 px-4 border"></td>
                  </tr>
                ))}
              </tbody>
              
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedUserView;
