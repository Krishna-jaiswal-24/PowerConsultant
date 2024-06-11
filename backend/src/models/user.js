import mongoose from "mongoose";
import validator from 'validator';  // To validate email format

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	guardianName: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				return /\d{10}/.test(v);  // Simple regex for a 10-digit phone number
			},
			message: props => `${props.value} is not a valid phone number!`
		}
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				return validator.isEmail(v);
			},
			message: props => `${props.value} is not a valid email!`
		}
	},
	username: {
		type: String,
		required: true,
		unique: true  // Ensures the username is unique
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	actualGrossSalary: {
		type: Number,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
		validate: {
			validator: function(v) {
				return v < Date.now();  // Date of birth should be in the past
			},
			message: props => `${props.value} is not a valid date of birth!`
		}
	},
	joiningDate: {
		type: Date,
		required: true,
		validate: {
			validator: function(v) {
				return v > this.dob;  // Joining date should be after date of birth
			},
			message: props => `Joining date must be after date of birth!`
		}
	},
	sex: {
		type: String,
		required: true,
		enum: ["Male", "Female", "Other", "Prefer not to say"]  // More inclusive options
	},
	workCategory: {
		type: String,
		required: true,
	},
	designation: {
		type: String,
		required: true,
	},
	wage: {
		type: Number,
	},

}, {timestamps: true});

// Virtual property to calculate age from dob
userSchema.virtual('age').get(function() {
	const today = new Date();
	const birthDate = new Date(this.dob);
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();
	if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
});

const User = mongoose.model('User', userSchema);
export default User;
