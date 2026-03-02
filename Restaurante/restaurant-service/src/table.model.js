'use strict';

import { Schema, model } from "mongoose";

const tableSchema = new Schema(
{
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  capacity: {
    type: Number,
    required: [true, 'La capacidad de la mesa es requerida.'],
    min: [1, 'La capacidad de la mesa debe ser mayor o igual a 1.'],
  },
  location: {
    type: String,
    required: [true, 'La localizacion de la mesa es requerida.'],
    trim: true,
    maxLength: [200, 'La localizacion no puede exceder 200 caracteres.'],
  },
  availableHours: [
    {
      start: {
        type: String,
        required: [true, 'El horario de inicio es requerido.'],
        trim: true,
        maxLength: [100, 'El horario de inicio no puede exceder 100 caracteres.'],
      },
      end: {
        type: String,
        required: [true, 'El horario de fin es requerido.'],
        trim: true,
        maxLength: [100, 'El horario de fin no puede exceder 100 caracteres.'],
      }
    }
  ],
  isAvailable: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, 
{ timestamps: true, versionKey: false });

tableSchema.pre(/^find/, function (next) {
  this.where({ isActive: true });
  next();
});

tableSchema.index({ isActive: 1 });
export default model("Table", tableSchema);