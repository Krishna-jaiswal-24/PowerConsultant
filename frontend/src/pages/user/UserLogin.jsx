import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import UserNavbar from '../../components/UserNavbar';

const UserLogin = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post('http://localhost:8000/api/user/login', { username, password });
			console.log(data);
			if (data.success) {
				navigate('/user/dashboard',{ state: { user: data.data } });
			}

		} catch (error) {
			console.log(error);
		}
		console.log('Username:', username);
		console.log('Password:', password); 
	};

	return (
		<>
			<nav className="dark:bg-gray-900 px-8 py-4 shadow-md">
			<span className="self-center text-2xl md:ml-2 font-semibold whitespace-nowrap dark:text-white">Power Consultant</span>

			</nav>
			{/* <nav className="bg-blue-600 px-8 py-3">
				<h1 className="text-white text-2xl">Power Consultant</h1>
			</nav> */}
			<div className="flex justify-center items-center h-screen bg-gray-100">
				<div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
								Username
							</label>
							<input
								type="text"
								id="username"
								placeholder="Enter username"
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="mb-6">
							<label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
								Password
							</label>
							<input
								type="password"
								id="password"
								placeholder="Enter password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="flex items-center justify-between">
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default UserLogin;
