import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  name: {
    type: String,
    required: [true, "El nombre del evento es obligatorio"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "La descripción del evento es obligatoria"]
  },
  type: {
    type: String,
    enum: ["cena temática", "promoción", "degustación", "festival gastronómico", "otro"],
    required: true
  },
  date: {
    type: Date,
    required: [true, "La fecha del evento es obligatoria"]
  },
  startTime: {
    type: String,
    required: [true, "La hora de inicio es obligatoria"]
  },
  endTime: {
    type: String,
    required: [true, "La hora de finalización es obligatoria"]
  },
  menu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: [true, "El menú del evento es obligatorio"]
  }],
  maxCapacity: {
    type: Number,
    required: [true, "La capacidad máxima es obligatoria"]
  },
  currentAttendees: {
    type: Number,
    default: 0
  },
  resources: {
    music: { type: Boolean, default: false },
    decoration: { type: String, trim: true }, 
    additionalStaff: { type: Number, default: 0 },
    specialRequirements: { type: String, trim: true }
  },
  status: {
    type: String,
    enum: ["programado", "en progreso", "finalizado", "cancelado"],
    default: "programado"
  },
  pricePerPerson: {
    type: Number,
    required: [true, "El precio por persona es obligatorio"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
