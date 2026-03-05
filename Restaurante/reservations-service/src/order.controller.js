'use strict';

import {
  createOrderService,
  updateOrderStatusService,
  getOrdersByRestaurantService
} from "./order.service.js";

export const createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.body);
    res.status(201).json({
      message: "Pedido creado correctamente",
      order,
      notification: {
        type: "ORDER_CREATED",
        text: "Tu pedido está en preparación"
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const updated = await updateOrderStatusService(
      req.params.id,
      req.body.status
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
    res.status(500).json({
      message: error.message
    });
  }
};

export const getOrdersByRestaurant = async (req, res) => {
  try {
    const orders = await getOrdersByRestaurantService(
      req.params.restaurantId
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleted = await deleteOrderService(req.params.id);
    res.json({
      message: "Pedido eliminado correctamente",
      deleted
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};