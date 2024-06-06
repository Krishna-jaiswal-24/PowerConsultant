import Attendance from "../../models/attendance.js";

const deleteAttendance= async (req, res) => {
	try {
		const attendance = await Attendance.findById(req.params.id);
		if (!attendance) {
			return res.status(404).json({
				success: false,
				message: 'Attendance not found'
			});
		}

		await Attendance.deleteOne({ _id: req.params.id });

		res.status(200).json({
			success: true,
			message: 'Attendance deleted successfully'
		});

	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'Error deleting attendance',
			error: err.message
		});
	}
}

export {deleteAttendance};