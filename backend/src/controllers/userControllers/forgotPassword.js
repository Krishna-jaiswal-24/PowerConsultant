import User from "../../models/user.js";
import bcrypt from "bcrypt";

export const forgotPassword = async (req, res) => {
	  const { username, email,password , newPassword } = req.body;
  if (!username) {
	return res.status(400).json({
	  success: false,
	  message: "Please fill in all fields",
	});
  }
  const user = await User.findOne({ username: username});
  if (!user) {
	return res.status(404).json({
	  success: false,
	  message: "User not found",
	});
  }
  const saltRounds = 10;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
	return res.status(400).json({
	  success: false,
	  message: "Invalid password",
	});
  }

  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  try {
	await User.updateOne({ _id: user._id }, { password: hashedPassword });
	res.status(200).json({
	  success: true,
	  message: "Password reset successfully",
	  data: newPassword,
	});
  } catch (err) {
	res.status(400).json({
	  success: false,
	  message: "Error resetting password",
	  error: err.message,
	});
  }
}