import express from "express"; // Importing the Express framework
import morgan from "morgan"; // Importing the morgan module for logging HTTP requests
import { config } from "dotenv"; // Importing the dotenv module for loading environment variables from .env file
import appRouter from "./routes/index.js"; 
import cookieParser from "cookie-parser";

config(); // Calling the config function to load the environment variables

const app = express(); // Creating an instance of the Express application

app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser(process.env.COOKIE_SECRET)); // Middleware to parse cookies
app.use(morgan("dev")); // Using morgan middleware to log HTTP requests
app.use("/api/v1",appRouter); // Using the appRouter to handle requests

export default app; // Enabling other modules to use this application
