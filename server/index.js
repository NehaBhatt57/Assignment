import dotenv from "dotenv";
dotenv.config({
    path : './.env'
});

import express from "express"
import {connectDB} from "./config/db.js";
import passport from "./config/passport.js";  
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());


connectDB();


import {router} from "./routes/authRoutes.js";
app.use("/api/auth", router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));