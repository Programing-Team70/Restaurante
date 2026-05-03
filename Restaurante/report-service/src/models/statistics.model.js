'use strict';

import { Schema, model } from "mongoose";

const statisticsSchema = new Schema(
{
    restaurantId: {
        type: Schema.Types.ObjectId,
        required: [true, "El restaurante es requerido."]
    },

    date: {
        type: Date,
        required: true
    },

    period: {
        type: String,
        enum: ["diario", "semanal", "mensual"],
        required: true
    },

    performance: {
        totalIncome: {
            type: Number,
            default: 0
        },
        averageOccupancy: {
            type: Number, // porcentaje
            min: 0,
            max: 100,
            default: 0
        },
        ordersPerDay: {
            type: Number,
            default: 0
        },
        customerSatisfaction: {
            type: Number, // escala 1-5 o %
            default: 0
        }
    },

    demand: {
        totalReservations: Number,
        peakHour: String
    },

    topDishes: [
        {
            dishId: Schema.Types.ObjectId,
            name: String,
            quantitySold: Number
        }
    ],

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true, versionKey: false });

statisticsSchema.pre(/^find/, function(next) {
    this.where({ isActive: true });
    next();
});

statisticsSchema.pre("validate", async function(next) {
    const exists = await this.constructor.findOne({
        restaurantId: this.restaurantId,
        date: this.date,
        period: this.period,
        _id: { $ne: this._id }
    });

    if (exists) {
        return next(new Error("Ya existe estadística para esa fecha y periodo."));
    }

    next();
});

statisticsSchema.index({ restaurantId: 1, date: 1, period: 1 });

export default model("Statistics", statisticsSchema);