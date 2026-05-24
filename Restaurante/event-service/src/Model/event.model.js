'use strict';

import { Schema, model } from "mongoose";

const eventSchema = new Schema(
    {
    restaurantId: {
        type: Schema.Types.ObjectId,
        required: [true, "El restaurante es requerido."]
    },
    title: {
        type: String,
        required: [true, "El nombre del evento es requerido."],
        trim: true,
        minLength: [3, "El nombre debe tener al menos 3 caracteres."],
        maxLength: [200, "El nombre del evento no puede exceder 120 caracteres."]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "La descripción del evento es necesaria."]
    },
    eventType: {
        type: String,
        enum: {
            values: ["cena temática", "promoción", "degustación", "festival", "privado"],
            message: "{VALUE} no es un tipo de evento válido."
        },
        required: true,
    },
    eventDate: {
        type: Date,
        required: [true, "La fecha del evento es requerida."],
        validate: {
        validator: function(v) {
            return v >= new Date().setHours(0, 0, 0, 0);
        },
        message: "La fecha del evento no puede ser anterior a hoy."
        }
    },
    capacity: {
        type: Number,
        required: [true, "La capacidad es requerida."],
        min: [1, "La capacidad debe ser de al menos una persona."],
        max: [50, "Para grupos de más de 50 personas, contacte directamente al restaurante."],
        default: 1
    },
    status: {
        type: String,
        enum: {
            values: ["programado", "activo", "finalizado", "cancelado"],
            message: "{VALUE} no es un estado válido."
        },
        default: "programado"
    },
    resources: {
        music: {
            type: String,
            default: "No requerida",
            trim: true
        },
        decoration: {
            type: String,
            default: "No requerida",
            trim: true
        },
        extraStaffNeeded: {
            type: Number,
            default: 0,
            min: [0, "El precio no puede ser negativo."]
        },
        specialMenuItems: [
            {
                type: Schema.Types.ObjectId
            }
        ]
    },
    notes: {
        type: String,
        trim: true,
        maxLength: [500, "Las notas no pueden exceder los 500 caracteres."]
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, versionKey: false });

eventSchema.pre(/^find/, function () {
    this.where({ isActive: true });
});

eventSchema.pre("validate", async function () {
    if (!this.isModified('eventDate') && !this.isModified('restaurantId')) return next();
    const existingEvent = await this.constructor.findOne({
        restaurantId: this.restaurantId,
        eventDate: this.eventDate,
        isActive: true,
        _id: { $ne: this._id }
    });
    if (existingEvent) {
        return next(new Error("Ya existe un evento programado para esta fecha en este restaurante."));
    }
});

eventSchema.index({ isActive: 1 });

export default model("Event", eventSchema);