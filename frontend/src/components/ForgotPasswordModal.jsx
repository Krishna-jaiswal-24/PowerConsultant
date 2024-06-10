import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const ResetPasswordModal = ({ isOpen, onRequestClose, customStyles }) => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		newPassword: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:8000/api/user/forgot-password', formData);
			alert('Password has been reset successfully.');
			onRequestClose();
		} catch (error) {
			console.error('Error resetting password:', error);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			style={customStyles}
		>
			<h2 className="text-2xl mb-4">Reset Password</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2" htmlFor="username">
						Username:
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2" htmlFor="password">
						Current Password:
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2" htmlFor="newPassword">
						New Password:
					</label>
					<input
						type="password"
						id="newPassword"
						name="newPassword"
						value={formData.newPassword}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
					>
						Submit
					</button>
					<button
						type="button"
						onClick={onRequestClose}
						className="bg-gray-500 text-white px-4 py-2 rounded"
					>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default ResetPasswordModal;
