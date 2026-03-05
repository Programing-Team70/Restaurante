'use strict';

import { Schema, model } from "mongoose";

const eventSchema = new Schema(
    {
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: [true, "El restaurante es obligatorio."]
    },
    title: {
        type: String,
        required: [true, "El nombre del evento es requerido."],
        trim: true,
        maxLength: [120, "El nombre del evento no puede exceder 120 caracteres."]
    },
    description: {
        type: String,
        required: [true, "La descripción es necesaria."]
    },
    eventType: {
        type: String,
        enum: [
            "cena temática",
            "promoción",
            "degustación",
            "festival"
        ],
        required: true
    },
    eventDate: {
        type: Date,
        required: [true, "La fecha y hora del evento son requeridas."]
    },
    capacity: {
        type: Number,
        min: [1, "La capacidad debe ser al menos 1 persona."],
        default: 10
    },
    status: {
        type: String,
        enum: [
            "programado",
            "activo",
            "finalizado",
            "cancelado"
        ],
        default: "programado"
    },
    resources: {
        music: {
            type: String,
            default: "No requerida"
        },
        decoration: {
            type: String,
            trim: true
        },
        extraStaffNeeded: {
            type: Number,
            default: 0,
            min: 0
        },
        specialMenu: [
            {
                type: Schema.Types.ObjectId,
                ref: "MenuItem"
            }
        ]
    },
    notes: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{ timestamps: true, versionKey: false });

eventSchema.pre(/^find/, function () {
    this.where({ isActive: true });
});

eventSchema.index({ restaurantId: 1, eventDate: 1 });

eventSchema.pre("validate", async function () {
    const existingEvent = await this.constructor.findOne({
        restaurantId: this.restaurantId,
        eventDate: this.eventDate,
        isActive: true
    });
    if(existingEvent){
        throw new Error("Ya existe un evento programado para esta fecha.");
    }
});

export default model("Event", eventSchema);