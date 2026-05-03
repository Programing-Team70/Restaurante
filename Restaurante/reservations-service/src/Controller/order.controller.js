"use strict";

import {
  createOrderService,
  updateOrderService,
  desactivateOrderService,
  getOrderService,
  getOrderByRestaurantService,
} from "../Service/order.service.js";

export const createOrder = async (req, res, next) => {
  try {
    const order = await createOrderService(req.body);
    return res.status(201).json({
      success: true,
      message: "Pedido creado correctamente.",
      order,
      notification: {
        type: "ORDER_CREATED",
        text: "Tu pedido ha sido recibido y está en preparación.",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await updateOrderService(id, req.body);
    const notificationText = req.body.status 
      ? `Tu pedido ahora está: ${req.body.status}`
      : "Los detalles de tu pedido han sido actualizados.";
    return res.json({
      success: true,
      message: "Pedido actualizado con éxito.",
      updated,
      notification: {
        type: "ORDER_UPDATED",
        text: notificationText,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const desactivateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await desactivateOrderService(id);
    return res.json({
      success: true,
      message: "Pedido desactivado correctamente.",
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { limit, skip } = req.query;
    const data = await getOrderService(limit, skip);
    return res.json({
      success: true,
      ...data,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersByRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const orders = await getOrderByRestaurantService(restaurantId);
    return res.json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};
