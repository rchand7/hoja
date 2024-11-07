import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./utils/db.js"; // Importing DB connection function
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === "production"
        ? 'https://jobshijobss-2.onrender.com' // Your production frontend URL
        : 'http://localhost:3000',  // Local development URL
    credentials: true
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve static files and index.html in production
if (process.env.NODE_ENV === "production") {
    const dirpath = path.resolve();

    // Serve static files from the frontend build folder
    app.use(express.static(path.join(dirpath, "frontend", "dist")));

    // Serve the frontend's index.html file for any unknown paths
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirpath, "frontend", "dist", "index.html"));
    });
}

// Start the server and connect to the database
app.listen(PORT, () => {
    connectDB();  // Connect to MongoDB
    console.log(`Server running at port ${PORT}`);
});

