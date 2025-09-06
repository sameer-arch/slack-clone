import express from "express";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";

import * as Sentry from "@sentry/node";

const app = express();

app.use(express.json());
app.use(clerkMiddleware()); // req.auth will be available in the request object

app.get("/debug-sentry", (req, res) => {
	throw new Error("Sentry is configured correctly! This is an error message");
});

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
	try {
		await connectDB();
		if (env.NODE_ENV !== "production") {
			app.listen(env.PORT, () => {
				console.log("Server is running on http://localhost:" + env.PORT);
				// connectDB();
			});
		}
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1); // Exit the process with an error code
	}
};

startServer();

export default app;
