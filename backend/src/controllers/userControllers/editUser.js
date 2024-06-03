import User from "../../models/user.js";

export const editUser = async (req, res) => {
	const { id } = req.params;
	const { name, guardianName, phone, email, username, password, address, actualGrossSalary, dob, joiningDate, sex, workCategory, designation } = req.body;

	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}

		// Update user fields
		if (name) user.name = name;
		if (guardianName) user.guardianName = guardianName;
		if (phone) user.phone = phone;
		if (email) user.email = email;
		if (username) user.username = username;
		if (password) user.password = password;  // Note: consider hashing the password before saving
		if (address) user.address = address;
		if (actualGrossSalary) user.actualGrossSalary = actualGrossSalary;
		if (dob) user.dob = dob;
		if (joiningDate) user.joiningDate = joiningDate;
		if (sex) user.sex = sex;
		if (workCategory) user.workCategory = workCategory;
		if (designation) user.designation = designation;

		await user.save();

		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			data: user
		});

	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'Error updating user',
			error: err.message
		});
	}
}
