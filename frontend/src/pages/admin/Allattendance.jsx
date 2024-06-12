import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import axios from "axios";
import { CiCalendarDate } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

function Allattendance() {
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from(new Array(30), (val, index) => index + 2020); // Adjust the range as needed

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/attendance"
      );
      setAttendance(response.data.data);
      console.log('All the user attendance is shown: ', attendance);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedMonth("")
    setSelectedYear("")
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredAttendance = attendance.filter(user => {
    const matchesSearchTerm =
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.date && user.date.includes(searchTerm)) ||
      (user.dutyType && user.dutyType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.siteLocation && user.siteLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.designation && user.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.workCategory && user.workCategory.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.actualGrossSalary && user.actualGrossSalary.toString().includes(searchTerm)) ||
      (user.sex && user.sex.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.dutyHourse && user.dutyHourse.toString().includes(searchTerm)) ||
      (user.otHours && user.otHours.toString().includes(searchTerm));

    const matchesDateFilter = user.date && (
      (selectedMonth === "" || new Date(user.date).getMonth() === months.indexOf(selectedMonth)) &&
      (selectedYear === "" || new Date(user.date).getFullYear().toString() === selectedYear)
    );

    return matchesSearchTerm && matchesDateFilter;
  });

  return (
    <div>
      <AdminNavbar />
      <div className='p-6 md:p-14 overflow-scroll min-h-[30rem]'>
        <div className='py-4 flex md:flex-row w-full md:justify-between flex-col-reverse '>
          <div className='flex'>
            <div className='flex w-full'>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 border border-black rounded mb-4 w-full"
              />
            </div>
            
            <div className='items-center'>
              <IoClose className='text-4xl mt-1 hover:scale-125 transition duration-300 cursor-pointer'
                onClick={clearSearch} />
            </div>
          </div>
          <div className='my-4 text-2xl'>
            All Attendance:
          </div>
        </div>
        <div className='flex mb-4'>
          <select value={selectedMonth} onChange={handleMonthChange} className='p-2 border border-black rounded mr-4'>
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange} className='p-2 border border-black rounded'>
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 border bg-gray-200">Name</th>
                <th className="py-2 border bg-gray-200">Date</th>
                <th className="py-2 border bg-gray-200">Duty Type</th>
                <th className="py-2 border bg-gray-200">Site Location</th>
                <th className="py-2 border bg-gray-200">Designation</th>
                <th className="py-2 border bg-gray-200">Work Category</th>
                <th className="py-2 border bg-gray-200">Actual Gross Salary</th>
                <th className="py-2 border bg-gray-200">Gender</th>
                <th className="py-2 border bg-gray-200">Duty Hour</th>
                <th className="py-2 border bg-gray-200">Overtime Hour</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((user) => (
                <tr key={user._id} className="border-t text-center">
                  <td className="py-2 px-4 border">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.date}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.dutyType}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.siteLocation}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.designation}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.workCategory}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.actualGrossSalary}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.sex}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.dutyHours}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.otHours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Allattendance;
