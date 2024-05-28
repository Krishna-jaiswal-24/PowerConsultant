import Admin from "../models/admin.js";
import bcrypt from "bcrypt";

//Added the creation of admin and also checking for if admin already exists and hashing the password
const createAdmin = async (req, res) => {
	const {username, password,name} = req.body;

	const adminExists = await Admin.findOne({username: username});
	if (adminExists) {
		return res.status(400).json({
			success: false,
			message: 'Admin already exists'
		});
	}

	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	try {
		const newAdmin = new Admin({username,name, password: hashedPassword});
		await newAdmin.save();
		res.status(201).json({
			success: true,
			message: 'Admin created successfully',
			data: newAdmin
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'Error creating admin',
			error: err.message
		});
	}
};


const loginAdmin = async (req, res) => {
	const {username, password} = req.body;
	if (!username || !password) {
		return res.status(400).json({
			success: false,
			message: 'Please fill in all fields'
		});
	}
	const admin = await Admin.findOne({username: username});
	if (!admin) {
		return res.status(400).json({
			success: false,
			message: 'Admin does not exist'
		});
	}
	const validPassword = await bcrypt.compare(password, admin.password);
	if (!validPassword) {
		return res.status(400).json({
			success: false,
			message: 'Invalid password'
		});
	}
	res.status(200).json({
		success: true,
		message: 'Admin logged in successfully',
		data: admin

	});
}



export {createAdmin, loginAdmin};
