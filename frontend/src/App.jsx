import React from 'react';
import {Link} from "react-router-dom";

function App() {
	return (
		<>
			<nav className="bg-blue-600 px-8 py-3">
				<h1 className="text-white text-2xl">Power Consultant</h1>
			</nav>
			<div
				className="flex flex-col items-center justify-center border-2 w-1/2 mx-auto mt-10 p-5 rounded-lg shadow-lg">
				<h1 className="text-3xl font-semibold mb-5">Welcome!</h1>
				<div className="space-x-4">
					<Link to='/admin/login'
					      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Login as Admin
					</Link>
					<Link to='/user/login'
					      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
						Login as User
					</Link>
				</div>
			</div>
		</>
	);
}

export default App;
