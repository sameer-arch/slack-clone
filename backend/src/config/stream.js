import { StreamChat } from "stream-chat";
import { env } from "../config/env.js";

const streamClient = StreamChat.getInstance(
	env.STREAM_API_KEY,
	env.STREAM_API_SECRET
);

export const upsertSteamUser = async (userData) => {
	try {
		await streamClient.upsertUser(userData);
		console.log("Stream user upserted successfully:", userData.name);
		return userData;
	} catch (error) {
		console.error("Error upserting Stream user:", error);
		throw error;
	}
};

export const deleteStreamUser = async (userId) => {
	try {
		await streamClient.deleteUser(userId);
		console.log("Stream user deleted successfully:", userId);
	} catch (error) {
		console.error("Error deleting Stream user:", error);
		throw error;
	}
};

export const generateStreamToken = (userId) => {
	try {
		const userIdString = userId.toString();
		return streamClient.createToken(userIdString);
	} catch (error) {
		console.error("Error creating Stream token:", error);
		return null;
	}
};
