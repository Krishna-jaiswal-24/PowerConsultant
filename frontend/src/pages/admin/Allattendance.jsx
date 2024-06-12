import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import axios from "axios";
import { CiCalendarDate } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Allattendance() {
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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
    setStartDate(null);
    setEndDate(null);
    setIsCalendarOpen(false);
  };

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

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

    const matchesDateRange =
      (!startDate || new Date(user.date) >= startDate) &&
      (!endDate || new Date(user.date) <= endDate);

    return matchesSearchTerm && matchesDateRange;
  });

  return (
    <div>
      <AdminNavbar />
      <div className='p-6 md:p-14 overflow-scroll  min-h-[30rem]'>
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
            <div className='ml-4 relative'>
              <CiCalendarDate className='text-4xl mt-1 cursor-pointer hover:scale-125 transition duration-300' onClick={handleCalendarClick} />
              {isCalendarOpen && (
                <div className='absolute top-12 right-1  z-10  border p-2'>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                  />
                </div>
              )}
              
            </div>
            <div className='items-center'>
                <IoClose className='text-4xl mt-1 hover:scale-125 transition duration-300 cursor-pointer'
                onClick={clearSearch}/>
              </div>
          </div>
          <div className='my-4 text-2xl'>
            All Attendance:
          </div>
        </div>
        <div>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 border">Name</th>
                <th className="py-2 border">Date</th>
                <th className="py-2 border">Duty Type</th>
                <th className="py-2 border">Site Location</th>
                <th className="py-2 border">Designation</th>
                <th className="py-2 border">Work Category</th>
                <th className="py-2 border">Actual Gross Salary</th>
                <th className="py-2 border">Gender</th>
                <th className="py-2 border">Duty Hour</th>
                <th className="py-2 border">Overtime Hour</th>
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
                    {user.otHours }
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
