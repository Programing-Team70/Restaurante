import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  reservationId: {
    type: mongoose.Schema.Types.ObjectId
  },
  customerName: {
    type: String,
    required: true
  },
  items: [
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      name: String,
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  total: Number,
  status: {
    type: String,
    enum: ["en preparación", "listo", "entregado", "cancelado"],
    default: "en preparación"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);