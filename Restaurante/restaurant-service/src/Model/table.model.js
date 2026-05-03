"use strict";

import { Schema, model } from "mongoose";

const tableSchema = new Schema(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "El restaurante es requerido."],
    },
    capacity: {
      type: Number,
      required: [true, "La capacidad de la mesa es requerida."],
      min: [1, "La capacidad de la mesa debe ser mayor o igual a 1."],
    },
    location: {
      type: String,
      required: [true, "La localizacion de la mesa es requerida."],
      trim: true,
      maxLength: [200, "La localizacion no puede exceder 200 caracteres."],
    },
    availableHours: {
      type: [{
        start: {
          type: String,
          required: [true, "Horario de inicio requerido."],
          match: [/^([01]\d|2[0-3]):?([0-5]\d)$/, "Formato de hora inválido (HH:mm)"],
        },
        end: {
          type: String,
          required: [true, "Horario de fin requerido."],
          match: [/^([01]\d|2[0-3]):?([0-5]\d)$/, "Formato de hora inválido (HH:mm)"],
        },
      }],
      validate: [
        {
          validator: function(val) { return val.length > 0; },
          message: "Debe haber al menos un horario disponible."
        }
      ]
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false },
);

tableSchema.pre(/^find/, function (next) {
  this.where({ isActive: true });
  next();
});

tableSchema.index({ isActive: 1 });
export default model("Table", tableSchema);
