import React, { useEffect, useState } from "react";
import axios from "axios";
import UserAttendanceModal from "../../components/UserAttendanceModal";
import { useLocation } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { CgUserAdd } from "react-icons/cg";

const UserDashboard = () => {
	const location = useLocation();
	const user = location.state.user;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [attendanceDetails, setAttendanceDetails] = useState([]);
	const [editDetail, setEditDetail] = useState(null); // State for editing detail

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
		fetchAttendanceDetails(); // Refresh the attendance details after adding/editing

		setEditDetail(null); // Reset edit detail on modal close
	};

	const fetchAttendanceDetails = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/user/attendance/${user._id}`
			);
			setAttendanceDetails(response.data.data);
			console.log("Attendance details:", response.data.data);
		} catch (error) {
			console.error("Error fetching attendance details:", error);
		}
	};

	useEffect(() => {
		fetchAttendanceDetails();
	}, []);

	const handleAddAttendanceDetails = async (formData) => {
		try {
			if (editDetail) {
				// Edit existing detail
				await axios.put(
					`http://localhost:8000/api/user/attendance/${editDetail._id}`,
					formData
				);
			} else {
				// Add new detail
				await axios.post(`http://localhost:8000/api/user/attendance`, formData);
			}
			closeModal();
			fetchAttendanceDetails(); // Refresh the attendance details after adding/editing
		} catch (error) {
			console.error("Error adding/editing attendance detail:", error);
		}
	};

	const handleEditClick = (detail) => {
		setEditDetail(detail);
		openModal();
	};

	const handleDeleteClick = async (detailId) => {
		const userConfirmed = window.confirm("Are you sure you want to delete this attendance detail?");
		if (userConfirmed) {
			try {
				await axios.delete(`http://localhost:8000/api/user/attendance/${detailId}`);
				fetchAttendanceDetails(); // Refresh the attendance details after deletion
			} catch (error) {
				console.error("Error deleting attendance detail:", error);
			}
		}
	};

	const customStyles = {
		content: {
		  borderRadius: '25px',
		  height: '90%',
		  padding: '1rem',
		},
	  };
	

	return (
		<div>
			<AdminNavbar />
			<div className="p-12">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl">Attendance Details</h2>
					<div
						className="flex border border-black p-2 rounded items-center cursor-pointer transform transition-transform hover:scale-105"
						onClick={openModal}
					>
						<CgUserAdd className="text-2xl mr-2" />
						<h2>Add Attendance</h2>
					</div>
				</div>
				<div>
					<UserAttendanceModal
						isOpen={modalIsOpen}
						onRequestClose={closeModal}
						onSubmit={handleAddAttendanceDetails}
						userId={user._id}
						editDetail={editDetail} 
						customStyles = {customStyles}
						
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
							<th className="py-2 px-4 border">Actions</th>
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
								<td className="py-2 px-4 border">
									<div className="flex justify-center space-x-2">
										<button
											className="bg-blue-500 text-white px-2 py-1 rounded"
											onClick={() => handleEditClick(detail)}
										>
											Edit
										</button>
										<button
											className="bg-red-500 text-white px-2 py-1 rounded"
											onClick={() => handleDeleteClick(detail._id)}
										>
											Delete
										</button>
									</div>
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

export default UserDashboard;
