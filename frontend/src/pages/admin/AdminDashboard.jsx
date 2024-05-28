import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
	const location = useLocation();
	const admin = location.state.admin;
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/admin/getAllUsers');
				console.log(response.data.data);
				setUsers(response.data.data);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div>
			<nav className="bg-blue-600 px-8 py-3 flex justify-between">
				<h1 className="text-white text-2xl">Power Consultant</h1>
				<h2 className="text-white text-xl">{admin.name}</h2>
			</nav>
			<div className="p-8">
				<h2 className="text-2xl mb-4">All Users</h2>
				<table className="min-w-full bg-white">
					<thead>
					<tr>
						<th className="py-2">Name</th>
						<th className="py-2">Username</th>
						<th className="py-2">Email</th>
						<th className="py-2">Phone</th>
					</tr>
					</thead>
					<tbody>
					{users.map((user) => (
						<tr key={user.id} className="border-t text-center">
							<td className="py-2 px-4">{user.name}</td>
							<td className="py-2 px-4">{user.username}</td>
							<td className="py-2 px-4">{user.email}</td>
							<td className="py-2 px-4">{user.phone}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminDashboard;
