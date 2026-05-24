'use strict';

import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
  restaurantId: {
    type: Schema.Types.ObjectId,
    required: [true, "El restaurante es requerido."]
  },
  reservationId: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    required: [true, "La reservacion es requerido."]
  },
  customerName: {
    type: String,
      required: [true, "El nombre del cliente es requerido."],
      trim: true,
      minLength: [3, "El nombre debe tener al menos 3 caracteres."],
      maxLength: [200, "El nombre del cliente no puede exceder 200 caracteres."]
  },
  items: {
    type: [
      {
        menuItemId: {
          type: Schema.Types.ObjectId,
          ref: "MenuItem",
          required: [true, "El plato del menú es requerido."]
        },
        quantity: {
          type: Number,
          required: [true, "La cantidad es requerida."],
          min: [1, "La cantidad debe ser al menos 1."],
          validate: {
            validator: Number.isInteger,
            message: "La cantidad debe ser un número entero."
          }
        },
        price: {
          type: Number,
          required: [true, "El precio del plato es requerido."],
          min: [0, "El precio no puede ser negativo."]
        },
        subtotal: {
          type: Number,
          default: 0
        }
      }
    ],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "Un pedido debe tener al menos un artículo."
    }
  },
  total: {
    type: Number,
    required: [true, "El total del pedido es requerido."],
    min: [0, "El total no puede ser negativo."],
    default: 0
  },
  status: {
    type: String,
    lowercase: true,
    enum: {
      values: ["en preparación", "listo", "entregado", "cancelado"],
      message: "{VALUE} no es un estado de pedido válido."
    },
    default: "en preparación"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAvalible: {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false, });

orderSchema.pre(/^find/, function () {
  this.where({ isActive: true });
});

orderSchema.pre("save", function () {
  if (this.items && this.items.length > 0) {
    this.total = this.items.reduce((acc, item) => {
      item.subtotal = item.quantity * item.price;
      return acc + item.subtotal;
    }, 0);
  } else {
    this.total = 0;
  }
});

orderSchema.index({ isActive: 1 });

export default model("Order", orderSchema);