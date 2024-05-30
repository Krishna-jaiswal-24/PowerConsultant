import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import busboy from 'busboy';
import csvParser from 'csv-parser';
import xlsx from 'xlsx';
import MinWage from '../models/minWages.js';


//Added the creation of admin and also checking for if admin already exists and hashing the password
const createAdmin = async (req, res) => {
	const {username, password,name} = req.body;

	const adminExists = await Admin.findOne({username: username});
	if (adminExists) {
		return res.status(400).json({
			success: false,
			message: 'Admin already exists'
		});
	}

	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	try {
		const newAdmin = new Admin({username,name, password: hashedPassword});
		await newAdmin.save();
		res.status(201).json({
			success: true,
			message: 'Admin created successfully',
			data: newAdmin
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'Error creating admin',
			error: err.message
		});
	}
};


const loginAdmin = async (req, res) => {
	const {username, password} = req.body;
	if (!username || !password) {
		return res.status(400).json({
			success: false,
			message: 'Please fill in all fields'
		});
	}
	const admin = await Admin.findOne({username: username});
	if (!admin) {
		return res.status(400).json({
			success: false,
			message: 'Admin does not exist'
		});
	}
	const validPassword = await bcrypt.compare(password, admin.password);
	if (!validPassword) {
		return res.status(400).json({
			success: false,
			message: 'Invalid password'
		});
	}
	res.status(200).json({
		success: true,
		message: 'Admin logged in successfully',
		data: admin

	});
}

const uploadWages=async(req,res)=>{
    const bb = busboy({ headers: req.headers });
    let fileBuffer = Buffer.from('');

    bb.on('file', (_, file) => {
        file.on('data', (data) => {
            fileBuffer = Buffer.concat([fileBuffer, data]);
        });

        file.on('end', async () => {
				try {
					const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
					const sheetName = workbook.SheetNames[0];
					const worksheet = workbook.Sheets[sheetName];
					const results = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

				
					const formattedResults = results.slice(3).map(row => ({
						industry: row[0],
						category: row[1],
						zone: row[2],
						perDay: parseFloat(row[8]), 
					}));

					
					const validData = formattedResults.filter(row => 
						row.industry && row.category && row.zone && !isNaN(row.perDay)
					);

					await MinWage.insertMany(validData);

					res.status(200).send('Excel file processed and data stored in MongoDB');
				} catch (error) {
					console.error('Error storing data:', error);
					res.status(500).send('Error storing data: ' + error.message);
				}
			});
    });

    bb.on('error', (error) => {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file: ' + error.message);
    });

    req.pipe(bb);
}

export {createAdmin, loginAdmin,uploadWages};
