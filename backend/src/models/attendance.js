import mongoose from "mongoose";

const attendanceDetailsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	dutyHours: {
		type: String,
		required: true,
	},
	otHours: {
		type: String,
		required: true,
	},
	siteLocation: {
		type: String,
		required: true,
	},
	remark: {
		type: String,
		required: true,
	},
}, {
	timestamps: true,
});

const AttendanceDetails = mongoose.model('AttendanceDetails', attendanceDetailsSchema);

export default AttendanceDetails;
