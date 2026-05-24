'use strict';

import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

const reservationSchema = new Schema(
{
  restaurantId: {
    type: Schema.Types.ObjectId,
    required: [true, "El restaurante es requerido."]
  },
  tableId: {
    type: Schema.Types.ObjectId,
    required: false
  },
  customerName: {
    type: String,
    required: [true, "El nombre del cliente es requerido."],
    trim: true,
    minLength: [3, "El nombre del cliente debe tener al menos 3 caracteres."],
    maxLength: [200,"El nombre del cliente no puede exceder 200 caracteres."],
  },
  customerPhone: {
    type: String,
    required: [true, "El teléfono del cliente es requerido."],
    trim: true,
    match: [/^\d{8}$/, "El teléfono debe contener exactamente 8 dígitos."],
  },
  type: {
    type: String,
    required: [true, "El tipo de reservacion es requerido."],
    lowercase: true,
    enum: {
      values: ["mesa", "domicilio", "para llevar"],
      message: "{VALUE} no es un tipo de reservacion válida."
    },
  },
  date: {
    type: Date,
    required: [true, "La fecha de la reserva es requerida."],
    validate: {
      validator: function(v) {
        return v >= new Date().setHours(0, 0, 0, 0);
      },
      message: "La fecha de la reserva no puede ser anterior a hoy."
    }
  },
  guests: {
    type: Number,
    required: [true, "El número de personas es requerido."],
    min: [1, "Debe haber al menos 1 invitado."],
    max: [50, "Para grupos de más de 50 personas, contacte directamente al restaurante."],
    default: 1
  },
  status: {
    type: String,
    enum: {
      values: ["pendiente", "confirmada", "en curso", "completada", "cancelada"],
      message: "{VALUE} no es un estado válido."
    },
    default: "pendiente"
  },
  notes: {
    type: String,
    trim: true,
    maxLength: [500, "Las notas no pueden exceder los 500 caracteres."]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAvalible: {
    type: Boolean,
    default: true
  }
}, { timestamps: true, versionKey: false });

reservationSchema.pre(/^find/, function () {
  this.where({ isActive: true });
});

reservationSchema.pre("validate", function () {
  if (this.type === "mesa" && !this.tableId) {
    this.invalidate("tableId", "Una reserva de tipo 'mesa' requiere asignar una mesa (tableId).");
  }
});

reservationSchema.index({ isActive: 1 });

export default mongoose.model("Reservation", reservationSchema);