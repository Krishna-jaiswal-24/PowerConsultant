import Mongoose from "mongoose";

const clientSchema = new Mongoose.Schema({

	clientName: {
		type: String,
		required: true,
	},
	clientAddress: {
		type: String,
		required: true,
	},
	clientPhone: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				return /\d{10}/.test(v);  // Simple regex for a 10-digit phone number
			},
			message: props => `${props.value} is not a valid phone number!`
		}
	},
	clientEmail: {
		type: String,
		required: true,
	},
	siteLocation:{
		type: String,
		required: true,
	},

}, { timestamps: true });


const Client = Mongoose.model("Client", clientSchema);
export default Client;