"use strict";

import dotenv from "dotenv";
import { initServer } from "./config/app.js";

dotenv.config();

process.on("unhandledRejection", (err) => {
    console.error("!!! UNHANDLED REJECTION:", err.message);
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.error("!!! UNCAUGHT EXCEPTION:", err.message);
    process.exit(1);
});

initServer();
