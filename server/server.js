import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";

// Create a new Express application instance
const app = express();

// Load environment variables from a.env file
dotenv.config();

//Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`New request: ${req.method} ${req.url}`);
  next();
});

//API Endpoint
app.use("/api/notes", notesRoutes);

//Error handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

// Define the port number for the server
const port = process.env.PORT || 3000;

//Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
