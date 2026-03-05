'use strict';

import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "El restaurante es requerido."]
  },
  reservationId: {
    type: Schema.Types.ObjectId,
    ref: "Reservation"
  },
  customerName: {
    type: String,
    required: [true, "El nombre del cliente es requerido."],
    trim: true,
    maxLength: [100, "El nombre del cliente no puede exceder 100 caracteres."]
  },
  items: [
    {
      menuItemId: {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",
        required: [true, "El plato del menú es requerido."]
      },
      name: {
        type: String,
        required: [true, "El nombre del plato es requerido."]
      },
      quantity: {
        type: Number,
        required: [true, "La cantidad es requerida."],
        min: [1, "La cantidad debe ser al menos 1."]
      },
      price: {
        type: Number,
        required: [true, "El precio del plato es requerido."],
        min: [0, "El precio debe ser mayor o igual a 0."]
      }
    }
  ],
  total: {
    type: Number,
    required: [true, "El total del pedido es requerido."],
    min: [0, "El total no puede ser negativo."]
  },
  status: {
    type: String,
    enum: ["en preparación", "listo", "entregado", "cancelado"],
    default: "en preparación"
  },
  isActive: {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false, });

orderSchema.pre(/^find/, function () {
  this.where({ isActive: true });
});

orderSchema.pre("save", function () {
  this.total = this.items.reduce((acc, item) => {
    return acc + (item.quantity * item.price);
  }, 0);
});

orderSchema.index({ isActive: 1 });

export default model("Order", orderSchema);