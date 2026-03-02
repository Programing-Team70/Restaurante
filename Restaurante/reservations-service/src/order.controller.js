import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    const total = items.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);

    const order = await Order.create({
      ...req.body,
      total
    });

    res.status(201).json({
      message: "Pedido creado correctamente",
      order,
      notification: {
        type: "ORDER_CREATED",
        text: "Tu pedido está en preparación"
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({
      message: "Estado actualizado",
      updated,
      notification: {
        type: "ORDER_STATUS_UPDATE",
        text: `Tu pedido ahora está: ${req.body.status}`
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByRestaurant = async (req, res) => {
  try {
    const orders = await Order.find({
      restaurantId: req.params.restaurantId
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};