import express from "express";
import mongoose from "mongoose";
import auth from "./src/routes/autRoutes/index.js";
import categorie from "./src/routes/categorie/categorie.js";
import project from "./src/routes/project/project.js";
import detail from "./src/routes/detail/detail.js";
import invest from "./src/routes/invest/invest.js";
import cors from "cors";
import dotenv from "dotenv";
import subs from "./src/routes/sub/subs.js";

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// MongoDB connection with error handling
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  });

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/auth", auth);
app.use("/categorie", categorie);
app.use("/project", project);
app.use("/subs", subs);
app.use("/detail", detail);
app.use("/invest", invest);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong, please try again later",
  });
});

// Start the server
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
  console.log(`Server Running at port: ${PORT}`);
});

// Graceful Shutdown
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

function shutdown() {
  console.log("Shutting down gracefully...");
  server.close(() => {
    console.log("HTTP server closed");
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });
}
