import Client from '../../models/client.js';


const addClient = async (req, res) => {
	const {
		clientName,
		clientPhone,
		clientEmail,
		clientAddress,
		siteLocation
	} = req.body;
	if (!clientName || !clientPhone || !clientEmail || !clientAddress || !siteLocation) {
		return res.status(400).json({
			success: false,
			message: "Please fill in all fields",
		});
	}

	const client = new Client({
		clientName,
		clientPhone,
		clientEmail,
		clientAddress,
		siteLocation
	});
	try {
		await client.save();
		res.status(201).json({
			success: true,
			message: "Client created successfully",
			data: client,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Error creating client",
			error: err.message,
		});
	}
}

const getClientAndSite=async(req,res)=>{
	try{
		const clientDetails=await Client.find();
		res.status(200).json({
			success:true,
			data:clientDetails
		});
	}catch(error){
		res.status(500).json({
			success:false,
			message:"Server error"
		});
	}
}


export {addClient, getClientAndSite};