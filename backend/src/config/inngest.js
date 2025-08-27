import { Inngest } from "inngest";
import { User } from "../models/user.model";
import { connectDB } from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-clone" });

const syncUser = inngest.createFunction(
	{ id: "sync-user" },
	{ event: "clerk/user.created" },
	async ({ event }) => {
		await connectDB();

		const { id, email_addresses, first_name, last_name, image_url } =
			event.data;

		const newUser = {
			email: email_addresses[0]?.email_address,
			name: `${first_name || ""} ${last_name || ""}`,
			image: image_url,
		};

		await User.create(newUser);

		// TODO: You can also handle errors and edge cases as needed
	}
);

const deleteUserFromDB = inngest.createFunction(
	{ id: "delete-user-from-db" },
	{ event: "clerk/user.deleted" },
	async ({ event }) => {
		connectDB();
		const { id } = event.data;
		await User.deleteOne({ clerkId: id });
		// ToDo: do more things here
	}
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];
