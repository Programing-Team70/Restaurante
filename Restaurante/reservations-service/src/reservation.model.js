import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
{
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    default: null
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    default: null
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ["mesa", "domicilio", "para llevar"],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    min: 1,
    default: 1
  },
  status: {
    type: String,
    enum: [
      "pendiente",
      "confirmada",
      "en curso",
      "completada",
      "cancelada"
    ],
    default: "pendiente"
  },
  notes: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false, });

reservationSchema.pre("find", function () {
  this.where({ isActive: true });
});

reservationSchema.pre("validate", function () {
  if (this.type === "mesa" && !this.tableId) {
    throw new Error("Una reserva de mesa requiere tableId");
  }
});

reservationSchema.index({ isActive: 1 });

export default mongoose.model("Reservation", reservationSchema);