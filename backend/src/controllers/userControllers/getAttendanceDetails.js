import Attendance from "../../models/attendance.js";
import User from "../../models/user.js";

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

const allUsersAttendance = async (req, res) => {
    try {
        // Fetch attendance details
        const attendanceDetails = await Attendance.find();

        // Fetch user details for each userId
        const userIds = attendanceDetails.map(detail => detail.userId);
        const users = await User.find(
            { _id: { $in: userIds } },
            'name workCategory designation sex actualGrossSalary'
        );

        console.log(users);
        // Create a map of userIds to user details
        const userMap = users.reduce((map, user) => {
            map[user._id] = {
                name: user.name,
                workCategory: user.workCategory,
                designation: user.designation,
                sex: user.sex,
                actualGrossSalary: user.actualGrossSalary,
            };
            return map;
        }, {});

        // Add user details to each attendance detail
        const attendanceWithUserDetails = attendanceDetails.map(detail => ({
            ...detail._doc, // Spread the document properties
            ...userMap[detail.userId] // Add user details
        }));

        res.status(200).json({
            success: true,
            data: attendanceWithUserDetails,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



export { getAttendanceDetails, allUsersAttendance};