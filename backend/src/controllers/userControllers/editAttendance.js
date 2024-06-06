import Attendance from "../../models/attendance.js";

const editAttendance= async (req, res) => {
	try {
		const attendance = await Attendance.findById(req.params.id);
		if (!attendance) {
			return res.status(404).json({
				success: false,
				message: 'Attendance not found'
			});
		}

		console.log(req.body);
		await Attendance.updateOne({ _id: req.params.id }, req.body);

		res.status(200).json({
			success: true,
			message: 'Attendance updated successfully'
		});

	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'Error updating attendance',
			error: err.message
		});
	}
}

export {editAttendance};