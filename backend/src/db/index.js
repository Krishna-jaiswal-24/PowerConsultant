import mongoose from "mongoose";

const DB_NAME = "powerConsultant";

const connectDb = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.MONGODB_URI}/${DB_NAME}`
		);
		console.log(
			`MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`
		);
	} catch (error) {
		console.log("MONGO DB FAILED", error);
		process.exit(1);
	}
}

export default connectDb