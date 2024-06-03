import User from "../../models/user.js";
import AttendanceDetails from "../../models/attendance.js"; // Adjust the path as necessary

export const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}

		// Delete the associated attendance instances
		await AttendanceDetails.deleteMany({ userId: id });

		// Remove the user
		await User.deleteOne({ _id: id });

		res.status(200).json({
			success: true,
			message: 'User and associated attendance deleted successfully'
		});

	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'Error deleting user',
			error: err.message
		});
	}
}
