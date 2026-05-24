"use strict";

import { Schema, model } from "mongoose";

const restaurantSchema = new Schema(
  {
    restaurantName: {
      type: String,
      required: [true, "El nombre del restaurante es requerido."],
      trim: true,
      minLength: [2, "El nombre debe tener al menos 2 caracteres."],
      maxLength: [200, "El nombre del restaurante no puede exceder 200 caracteres."],
    },
    restaurantAddress: {
      type: String,
      required: [true, "La direccion del restaurante es requerido."],
      trim: true,
      minLength: [5, "La dirección debe tener al menos 5 caracteres."],
      maxLength: [500, "La direccion del restaurante no puede exceder 500 caracteres."],
    },
    restaurantSchedule: {
      type: String,
      required: [true, "El horario del restaurante es requerido."],
      trim: true,
      maxLength: [150, "El horario del restaurante no puede exceder 150 caracteres.",
      ],
    },
    restaurantCategory: {
      type: String,
      required: [true, "La categoria del restaurante es requerido."],
      trim: true,
      maxLength: [100, "La categoria del restaurante no puede exceder 100 caracteres."],
    },
    averagePrice: {
      type: Number,
      required: [true, "El precio promedio del restaurante es requerido."],
      min: [0, "El precio promedio del restaurante debe ser mayor o igual a 0."],
    },
    contact: {
      phone: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Correo inválido."],
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    photos: {
      type: [
        {
          url: {type: String, required: true},
          public_id: {type: String, required: true},
        },
      ],
      default: [
        {
          url: "https://res.cloudinary.com/dsbibfrfc/image/upload/v1/Heaven_flavor/restaurant_uur74f",
          public_id: "Heaven_flavor/restaurant_uur74f",
        },
      ],
    },
  },
  { timestamps: true, versionKey: false },
);

restaurantSchema.pre(/^find/, function () {
  this.where({ isActive: true });
});

restaurantSchema.index({ isActive: 1 });
export default model("Restaurant", restaurantSchema);
