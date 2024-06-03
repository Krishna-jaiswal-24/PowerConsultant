import React, { useState, useEffect } from "react";
import axios from "axios";
import UserAttendanceModal from "../../components/UserAttendanceModal";
import { useLocation } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";

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
      <UserNavbar/>

      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">ATTENDANCE DETAILS</h2>
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Attendance Details
          </button>
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
