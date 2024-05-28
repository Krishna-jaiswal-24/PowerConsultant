import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const UserDashboard = () => {
	const location = useLocation();
	const user = location.state.user;

	return (
		<div>
			<nav className="bg-blue-600 px-8 py-3 flex justify-between">
				<h1 className="text-white text-2xl">Power Consultant</h1>
				<h2 className="text-white text-xl">{user.name}</h2>
			</nav>

			<div className="p-8">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">ATTENDANCE DETAILS</h2>
					<Link to='/user/add-details' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Add Details
					</Link>
				</div>
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
					<tr className='text-center'>
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
