import {User } from "../models/user.model.js";
import status from "http-status";

// // Retrieve profile retrieves the information of the requested user email
// export const retrieveProfileByEmail = async (req, res) => {
// 	const { email } = req.query;

// 	try {
// 		if (!email) {
// 			throw new Error("All fields are required");
// 		}

// 		const user = await User.findOne({ email });
// 		console.log("user", user);

// 		if (!user) {
// 			return res.status(status.NOT_FOUND).json({ success: false, message: "User not found" });
// 		}

// 		res.status(status.OK).json({
// 			success: true,
// 			message: "Profile retrieved successfully",
// 			user: {
// 				...user._doc,
// 				password: undefined,
// 			},
// 		});
// 	} catch (error) {
// 		res.status(status.BAD_REQUEST).json({ success: false, message: error.message });
// 	}
// }

// // Update the info as needed according to the request by the user email
// export const updateProfileByEmail = async (req, res) => {
// 	const { email, 
// 			password, 
// 			name,
// 			dob,
// 			nationalID,
// 			phoneNumber,
// 		} = req.body;

// 	try {
// 		if (!email || !password || !name || !dob || !nationalID || !phoneNumber) {
// 			throw new Error("All fields are required");
// 		}

// 		const user = await User.findOne({ email });
// 		console.log("user", user);

// 		if (!user) {
// 			return res.status(status.BAD_REQUEST).json({ success: false, message: "User already exists" });
// 		}
// 		user.password = password;
// 		user.name = name;
// 		user.dob = dob;
// 		user.nationalID = nationalID;
// 		user.phoneNumber = phoneNumber;
// 		await user.save();

// 		res.status(status.OK).json({
// 			success: true,
// 			message: " successfully",
// 			user: {
// 				...user._doc,
// 				password: undefined,
// 			},
// 		});
// 	} catch (error) {
// 		res.status(status.BAD_REQUEST).json({ success: false, message: error.message });
// 	}
// }

// // Delete the profile of the user email
// export const deleteProfileByEmail = async (req, res) => {
// 	const { email } = req.body;

// 	try {
// 		if (!email) {
// 			throw new Error("All fields are required");
// 		}

// 		const user = await User.findOne({ email });
// 		console.log("user", user);

// 		if (!user) {
// 			return res.status(status.BAD_REQUEST).json({ success: false, message: "User not found" });
// 		}

// 		await User.deleteOne({ email });

// 		res.status(status.OK).json({
// 			success: true,
// 			message: "Profile deleted successfully",
// 		});
// 	} catch (error) {
// 		res.status(status.BAD_REQUEST).json({ success: false, message: error.message });
// 	}
// }

export const fetchAllUsers = async (req, res) => {
	try {
		const users = await User.find({});

		res.status(status.OK).json({
			success: true,
			message: "Users retrieved successfully",
			list: users.map((user) => ({
				...user._doc,
				password: undefined,
			})),
		});
	} catch (error) {
		res.status(status.BAD_REQUEST).json({ success: false, message: error.message });
	}
}

export const retrieveProfileByID = async (req, res) => {
	const { uid } = req.params;

	try {
		if (!uid) {
			throw new Error("All fields are required");
		}

		const user = await User.findById(uid);

		if (!user) {
			return res.status(status.NOT_FOUND).json({ success: false, message: "User not found" });
		}
		res.status(status.OK).json({
			success: true,
			message: "Profile retrieved successfully",
			data: {
				...user._doc,
				password: undefined,
			},
		});
	}
	catch (error) {
		res.status(status.BAD_REQUEST).json({ success: false, message: error.message });
	}
}

export const deleteProfileByID = async (req, res) => {
	const { uid } = req.params;

	try {
		if (!uid) {
			throw new Error("All fields are required");
		}

		const user = await User.findById(uid);

		if (!user) {
			return res.status(status.NOT_FOUND).json({ success: false, message: "User not found" });
		}

		await User.deleteOne({ _id: uid });

		res.status(status.OK).json({
			success: true,
			message: "Profile deleted successfully",
		});
	}
	catch (error) {
		res.status(status.BAD_REQUEST).json({ success: false, message: error.message });
	}
}

export const updateProfileByID = async (req, res) => {
	const { uid } = req.params;

	try {
		if (!uid) {
			throw new Error("All fields are required");
		}

		const user = await User.findById(uid);

		if (!user) {
			return res.status(status.NOT_FOUND).json({ success: false, message: "User not found" });
		}
		
		await User.updateOne({ _id: uid}, req.body);

		res.status(status.OK).json({
			success: true,
			message: "Profile updated successfully",
		});
	} catch (error) {
		res.status(status.BAD_REQUEST).json({ success: false, message: error.message });
	}
}