import User from "../models/user.js";
import Attendance from "../models/attendance.js";

export const search = async (req, res) => {
	const { query } = req.body;

	if (!query) {
		return res.status(400).json({
			success: false,
			message: 'Query parameter is required'
		});
	}

	try {
		// Build a dynamic query for the User model
		const userQuery = {
			$or: [
				{ name: { $regex: query, $options: 'i' } },
				{ guardianName: { $regex: query, $options: 'i' } },
				{ phone: { $regex: query, $options: 'i' } },
				{ email: { $regex: query, $options: 'i' } },
				{ username: { $regex: query, $options: 'i' } },
				{ address: { $regex: query, $options: 'i' } },
				{ sex: { $regex: query, $options: 'i' } },
				{ workCategory: { $regex: query, $options: 'i' } },
				{ designation: { $regex: query, $options: 'i' } }
			]
		};

		// Perform the search on the User model
		const users = await User.find(userQuery);

		// Build a dynamic query for the Attendance model
		const attendanceQuery = {
			$or: [
				{ userId: { $regex: query, $options: 'i' } },
				{ dutyType: { $regex: query, $options: 'i' } },
				{ siteLocation: { $regex: query, $options: 'i' } },
				{ remark: { $regex: query, $options: 'i' } }
			]
		};

		// Perform the search on the Attendance model
		const attendances = await Attendance.find(attendanceQuery);

		res.status(200).json({
			success: true,
			message: 'Search results',
			data: {
				users,
				attendances
			}
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Error performing search',
			error: err.message
		});
	}
}
