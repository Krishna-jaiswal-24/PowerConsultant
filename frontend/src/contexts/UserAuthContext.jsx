import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios  from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("site") || "");
	const navigate = useNavigate();
	const loginAction = async (data) => {
		try {
			const response = await axios.post('http://localhost:8000/api/user/login', data);
			const res = await response.json();
			if (res.data) {
				setUser(res.data.user);
				console.log(res.data.token);
				console.log(user);
				navigate("/user/dashboard");
				return;
			}
			throw new Error(res.message);
		} catch (err) {
			console.error(err);
		}
	};

	const logOut = () => {
		setUser(null);
		setToken("");
		localStorage.removeItem("site");
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ token, user, loginAction, logOut }}>
			{children}
		</AuthContext.Provider>
	);

};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};