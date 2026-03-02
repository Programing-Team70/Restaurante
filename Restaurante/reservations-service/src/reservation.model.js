import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: String,
  type: {
    type: String,
    enum: ["mesa", "domicilio", "para llevar"],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  guests: Number,
  status: {
    type: String,
    enum: ["pendiente", "confirmada", "cancelada"],
    default: "pendiente"
  }
}, { timestamps: true });

export default mongoose.model("Reservation", reservationSchema);