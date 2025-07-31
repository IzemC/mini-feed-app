import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import { PORT } from "./config/constants.js";
import routes from "./routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
