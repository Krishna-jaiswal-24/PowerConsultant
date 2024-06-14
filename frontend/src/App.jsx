import React from 'react';
import { Link } from "react-router-dom";

function App() {
	return (
		<>
			<nav className="dark:bg-gray-900 px-8 py-4 shadow-md">
			<span className="self-center text-2xl md:ml-2 font-semibold whitespace-nowrap dark:text-white">Power Consultant</span>

			</nav>
			<div className="flex flex-col items-center justify-center border-2 border-gray-300 bg-white w-3/4 md:w-1/3 mx-auto mt-16 p-8 rounded-lg shadow-2xl">
				<h1 className="text-4xl font-semibold mb-6 text-gray-800">Welcome!</h1>
				<div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
					<Link to='/admin/login' className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105">
						Login as Admin
					</Link>
					<Link to='/user/login' className="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105">
						Login as User
					</Link>
				</div>
			</div>
		</>
	);
}

export default App;
