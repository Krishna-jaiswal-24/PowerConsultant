import React, { useState, useEffect } from "react";
import axios from "axios";
import UserAttendanceModal from "../../components/UserAttendanceModal";
import { useLocation } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import AdminNavbar from "../../components/AdminNavbar";
import { CgUserAdd } from "react-icons/cg";


const UserDashboard = () => {
  const location = useLocation();
  const user = location.state.user;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchAttendanceDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/attendance/${user._id}`);
      setAttendanceDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching attendance details:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceDetails();
  }, []);

  const handleAddAttendanceDetails = (event) => {
    event.preventDefault();
    // Handle the form submission logic
    closeModal();
    fetchAttendanceDetails(); // Refresh the attendance details after adding new details
  };

  return (
    <div>
      <AdminNavbar/>

      

      <div className="p-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Attendance Details</h2>  
          <div
                  className="flex border border-black p-2 rounded items-center cursor-pointer transform transition-transform hover:scale-105"
                  onClick={openModal}
              >
                <CgUserAdd className="text-2xl mr-2" />
                <h2>Add Attendance Details</h2>
              </div>
        </div>
        <div>

        <UserAttendanceModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onSubmit={handleAddAttendanceDetails}
          userId={user._id}
        />
        </div>

        
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
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
