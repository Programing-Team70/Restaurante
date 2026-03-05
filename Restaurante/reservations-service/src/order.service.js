'use strict';

import Order from "./order.model.js";

const allowedStatus = [
    "en preparación",
    "listo",
    "entregado",
    "cancelado"
];

export const createOrderService = async (orderData) => {
    const { items } = orderData;
    const total = items.reduce((acc, item) => {
        return acc + item.quantity * item.price;
    }, 0);
    const order = await Order.create({
        ...orderData,
        total
    });
    return order;
};

export const updateOrderStatusService = async (id, status) => {
    if (!allowedStatus.includes(status)) {
        throw new Error("Estado de pedido inválido");
    }
    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
    if (!updatedOrder) {
        throw new Error("Pedido no encontrado");
    }
    return updatedOrder;
};

export const getOrdersByRestaurantService = async (restaurantId) => {
    const orders = await Order.find({
        restaurantId
    });
    return orders;
};

export const deleteOrderService = async (id) => {
    const deletedOrder = await Order.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );
    if (!deletedOrder) {
        throw new Error("Pedido no encontrado");
    }
    return deletedOrder;
};