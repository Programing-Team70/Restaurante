import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./config/db.js";

import reservationRoutes from "./src/routes/reservation.routes.js";
import orderRoutes from "./src/routes/order.routes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Orders & Reservations Service running on port ${PORT}`);
});