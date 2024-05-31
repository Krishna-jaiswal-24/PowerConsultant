import Attendance from "../../models/attendance.js";

const getAttendanceDetails = async (req, res) => {
    try {
        const attendanceDetails = await Attendance.find({ userId: req.params.userId });
        res.status(200).json({
        success: true,
        data: attendanceDetails,
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
}

export { getAttendanceDetails };