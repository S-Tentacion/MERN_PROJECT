import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import defaultData from "./default.js";
import cors from "cors";
import Router from "./routes/index.js";
import bodyParser from "body-parser";
const app = express();
dotenv.config();
const port = 8000;
app.use(cors());
app.use(bodyParser.json({ extened: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

Connection();

app.listen(port, () => {
  console.log(`Server is working as expected ${port}`);
});

defaultData();
