import express from 'express';
import 'dotenv/config';
import connectDb from "./src/db/index.js";
import cors from 'cors';
import morgan  from "morgan";

const app = express();
morgan('tiny')
morgan(':method :url :status :res[content-length] - :response-time ms')
// morgan(function (tokens, req, res) {
// 	return [
// 		tokens.method(req, res),
// 		tokens.url(req, res),
// 		tokens.status(req, res),
// 		tokens.res(req, res, 'content-length'), '-',
// 		tokens['response-time'](req, res), 'ms'
// 	].join(' ')
// })

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
	res.send('Hello World');
})

connectDb()
	.then(async () => app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	}))
	.catch((error) => {
		console.log("MONGO DB connection FAILED", error);
	});


import AdminRouter from "./src/routes/adminRoute.js";
import UserRouter from "./src/routes/userRoute.js";

app.use('/api/admin', AdminRouter);
app.use('/api/user', UserRouter);