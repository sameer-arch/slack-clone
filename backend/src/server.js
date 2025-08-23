import express from "express";
import { env } from "./config/env.js";
const app = express();

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

console.log("MONGO_URI:", env.MONGO_URI);
app.listen(env.PORT, () => {
	console.log("Server is running on http://localhost:" + env.PORT);
});
