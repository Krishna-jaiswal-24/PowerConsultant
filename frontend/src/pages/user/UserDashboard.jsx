import React, { useState } from "react";
import UserAttendanceModal from "../../components/UserAttendanceModal";

const UserDashboard = () => {
  // const location = useLocation();
  // const user = location.state.user;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddUser = (event) => {
    event.preventDefault();
    // Handle the form submission logic
    closeModal();
  };

  return (
    <div>
      <nav className="bg-blue-600 px-8 py-3 flex justify-between">
        <h1 className="text-white text-2xl">Power Consultant</h1>
        <h2 className="text-white text-xl">Random user</h2>
      </nav>

      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">ATTENDANCE DETAILS</h2>
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add User
          </button>
        </div>
		<UserAttendanceModal
		 isOpen={modalIsOpen}
		 onRequestClose={closeModal}
		 onSubmit={handleAddUser}
		/>

        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Duty Hours Details</th>
              <th className="py-2 px-4 border">OT Hours</th>
              <th className="py-2 px-4 border">Site Location</th>
              <th className="py-2 px-4 border">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder for data rows */}
            <tr className="text-center">
              <td className="py-2 px-4 border">2024-05-23</td>
              <td className="py-2 px-4 border">8 hours</td>
              <td className="py-2 px-4 border">2 hours</td>
              <td className="py-2 px-4 border">New York</td>
              <td className="py-2 px-4 border">No remarks</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
