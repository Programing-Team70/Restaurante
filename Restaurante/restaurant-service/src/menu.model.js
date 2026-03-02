'use strict';

import { Schema, model } from "mongoose";

const menuSchema = new Schema(
  {
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  name: {
    type: String,
    required: [true, 'El nombre del restaurante es requerido.'],
    trim: true,
    maxLength: [200, 'El nombre del restaurante no puede exceder 200 caracteres.'],
  },
  description: {
    type: String,
    required: [true, 'La descripcion del plato es requerido.'],
    trim: true,
    maxLength: [500, 'La descripcion del plato no puede exceder 500 caracteres.'],
  },
  ingredients: {
    type: [String],
    required: [true, 'Los ingredientes del plato son requeridos.'],
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "Debe agregar al menos un ingrediente"
    }
  },
  price: {
    type: Number,
    required: [true, 'El precio del plato es requerido.'],
    min: [0, 'El precio del plato debe ser mayor o igual a 0'],
  },
  type: {
    type: String,
    enum: ["entrada", "plato fuerte", "postre", "bebida", "acompañamiento", "combo", "otro"],
    required: [true, 'El tipo del plato es requerido.'],
  },
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true, versionKey: false, });

menuSchema.pre(/^find/, function (next) {
  this.where({ isActive: true });
  next();
});

menuSchema.index({ isActive: 1 });
export default model("MenuItem", menuSchema);