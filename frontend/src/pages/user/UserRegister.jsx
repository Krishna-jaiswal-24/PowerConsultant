import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const UserRegister = () => {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	const validatePhone = (phone) => {
		const re = /^[0-9\b]+$/;
		return re.test(String(phone));
	};

	const validatePassword = (password) => {
		const re = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
		return re.test(String(password));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = {};

		if (!name) newErrors.name = 'Name is required';
		if (!username) newErrors.username = 'Username is required';
		if (!email) newErrors.email = 'Email is required';
		else if (!validateEmail(email)) newErrors.email = 'Email is invalid';
		if (!password) newErrors.password = 'Password is required';
		else if (!validatePassword(password)) newErrors.password = 'Password must be at least 8 characters and include a special character';
		if (!phone) newErrors.phone = 'Phone number is required';
		else if (!validatePhone(phone)) newErrors.phone = 'Phone number is invalid';

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			try {
				const {data} = await axios.post('http://localhost:8000/api/user/create', {
					name,
					username,
					email,
					password,
					phone
				});
				console.log(data.data);
				if (data.success)
					navigate('/user/dashboard', { state: { user: data.data } });
			} catch (error) {
				console.error('Error registering user:', error);
			}
		}
	};

	return (
		<>
			<nav className="bg-blue-600 px-8 py-3">
				<h1 className="text-white text-2xl">Power Consultant</h1>
			</nav>
			<div className="flex justify-center items-center h-screen bg-gray-100">
				<div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
								Name
							</label>
							<input
								type="text"
								id="name"
								placeholder="Enter name"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
						</div>
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
							{errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
						</div>
						<div className="mb-4">
							<label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								placeholder="Enter email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
						</div>
						<div className="mb-4">
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
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
						</div>
						<div className="mb-6">
							<label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
								Phone Number
							</label>
							<input
								type="text"
								id="phone"
								placeholder="Enter phone number"
								required
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
						</div>
						<div className="flex items-center justify-between">
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default UserRegister;
