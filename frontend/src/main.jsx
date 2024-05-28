import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from "./pages/admin/Login.jsx";
import UserLogin from "./pages/user/UserLogin.jsx";
import UserRegister from "./pages/user/UserRegister.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UserAddAttendance from "./pages/user/UserAddAttendance.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
	},
	{
		path: "/admin/login",
		element: <Login/>
	},
	{
		path: "/user/login",
		element: <UserLogin/>,
	},
	{
		path: "/user/register",
		element: <UserRegister/>,
	}, {
		path: "/user/dashboard",
		element: <UserDashboard/>,
	},{
	path: "/admin/dashboard",
		element: <AdminDashboard/>,
	},
	{
		path: '/user/add-details',
		element: <UserAddAttendance />,
	}

]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>,
)
