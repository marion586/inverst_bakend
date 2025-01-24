//import
import express from "express";
import mongoose from "mongoose";
import auth from "./src/routes/autRoutes/index.js";
import categorie from "./src/routes/categorie/categorie.js";
import project from "./src/routes/project/project.js";
import detail from "./src/routes/detail/detail.js";
import invest from "./src/routes/invest/invest.js";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();
import subs from "./src/routes/sub/subs.js";
//expreess function
const app = express();

//connect to mongoDB database

mongoose.connect("mongodb://127.0.0.1:27017/invest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connected"));

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/auth", auth);
app.use("/categorie", categorie);
app.use("/project", project);
app.use("/subs", subs);
app.use("/detail", detail);
app.use("/invest", invest);
app.listen("3002", () => console.log("Server Running at port : 3002"));
