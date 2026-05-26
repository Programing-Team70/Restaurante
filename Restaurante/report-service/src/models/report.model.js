'use strict';

import { Schema, model } from "mongoose";

const reportSchema = new Schema(
{
    restaurantId: {
        type: Schema.Types.ObjectId,
        required: [true, "El restaurante es requerido."]
    },
    title: {
        type: String,
        required: [true, "El título del reporte es requerido."],
        trim: true,
        maxLength: [150, "Máximo 150 caracteres."]
    },
    reportType: {
        type: String,
        required: true,
        enum: {
            values: [
                "demanda",
                "platos_populares",
                "horas_pico",
                "reservaciones",
                "desempeño"
            ],
            message: "{VALUE} no es un tipo de reporte válido."
        }
    },
    startDate: {
        type: Date,
        required: [true, "La fecha inicial es requerida."]
    },
    endDate: {
        type: Date,
        required: [true, "La fecha final es requerida."],
        validate: {
            validator: function(v) {
                return v >= this.startDate;
            },
            message: "La fecha final no puede ser menor que la inicial."
        }
    },

    data: {
        demand: Number,
        topDishes: [
            {
                dishId: Schema.Types.ObjectId,
                name: String,
                quantitySold: Number
            }
        ],
        peakHours: [
            {
                hour: String,
                reservations: Number
            }
        ],
        totalReservations: Number
    },

    format: {
        type: String,
        enum: ["pdf", "excel", "json"],
        default: "json"
    },

    fileUrl: {
        type: String // link del archivo generado (PDF/Excel)
    },

    status: {
        type: String,
        enum: ["pendiente", "generado", "error"],
        default: "pendiente"
    },

    isActive: {
        type: Boolean,
        default: true
    },

    performance: {
        totalIncome: Number,
        averageOccupancy: Number,
        ordersPerDay: Number,
        customerSatisfaction: Number
    }

}, { timestamps: true, versionKey: false });

reportSchema.pre(/^find/, function() {
    this.where({ isActive: true });
});

reportSchema.pre("validate", async function() {
    const existing = await this.constructor.findOne({
        restaurantId: this.restaurantId,
        reportType: this.reportType,
        startDate: this.startDate,
        endDate: this.endDate,
        _id: { $ne: this._id }
    });

    if (existing) {
        throw new Error("Ya existe un reporte con ese rango y tipo.");
    }
});

reportSchema.index({ restaurantId: 1, reportType: 1 });

export default model("Report", reportSchema);