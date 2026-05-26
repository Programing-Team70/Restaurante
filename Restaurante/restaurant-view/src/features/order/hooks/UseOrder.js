import { useOrderStore } from '../store/OrderStore';

export const useSaveOrder = () => {
    const updateOrder = useOrderStore((state) => state.updateOrder);
    const createOrder = useOrderStore((state) => state.createOrder);

    const saveOrder = async (data) => {
        const orderId = data._id || data.id;
        const payload = {
            customerName: data.customerName ? data.customerName.trim() : '',
            status: data.status ? data.status.toLowerCase() : "en preparación",
            notes: data.notes || "",
            isActive: data.isActive !== undefined ? data.isActive : true,
            isAvalible: data.isAvalible !== undefined ? data.isAvalible : true,
            items: Array.isArray(data.items) 
                ? data.items.map(item => ({
                    menuItemId: item.menuItemId || item.id || item._id,
                    quantity: Math.max(1, Math.floor(Number(item.quantity || 1))),
                    price: Number(item.price || 0),
                    subtotal: Number(item.quantity || 1) * Number(item.price || 0)
                }))
                : []
        };
        payload.total = payload.items.reduce((acc, item) => acc + item.subtotal, 0);
        if (data.restaurantId) {
            payload.restaurantId = data.restaurantId;
        } else if (data.restaurant) { 
            payload.restaurantId = data.restaurant._id || data.restaurant.id || data.restaurant;
        }
        if (data.reservationId) {
            payload.reservationId = data.reservationId;
        } else if (data.reservation) {
            payload.reservationId = data.reservation._id || data.reservation.id || data.reservation;
        }
        if (orderId) {
            await updateOrder(orderId, payload);
            return;
        } else {
            await createOrder(payload);
        }
    };
    return { saveOrder };
};