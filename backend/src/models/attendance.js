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
	dutyType: {
		type: String,
		required: true,
		enum: ['Onsite', 'Leave', 'Travelling', 'Holiday'],
	},
	otHours: {
		type: Number,
	},
	siteLocation: {
		type: String,
	},
	dutyHours: {
		type: Number,
	},
	remark: {
		type: String,
	},
}, {
	timestamps: true,
});

const AttendanceDetails = mongoose.model('AttendanceDetails', attendanceDetailsSchema);

export default AttendanceDetails;
