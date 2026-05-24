import { useReservationStore } from '../store/ReservationStore';

export const useSaveReservation = () => {
    const updateReservation = useReservationStore((state) => state.updateReservation);
    const createReservation = useReservationStore((state) => state.createReservation);

    const saveReservation = async (data) => {
        const reservationId = data._id || data.id;

        const payload = {
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            type: data.type ? data.type.toLowerCase() : 'mesa',
            date: data.date, 
            guests: Number(data.guests || 1),
            status: data.status || "pendiente",
            notes: data.notes || "",
            isActive: data.isActive !== undefined ? data.isActive : true,
            isAvalible: data.isAvalible !== undefined ? data.isAvalible : true 
        };
        if (data.restaurantId) {
            payload.restaurantId = data.restaurantId;
        } else if (data.restaurant) { 
            payload.restaurantId = data.restaurant._id || data.restaurant.id || data.restaurant;
        }
        if (data.type === "mesa" && data.tableId) {
            payload.tableId = data.tableId;
        }
        if (reservationId) {
            await updateReservation(reservationId, payload);
            return;
        } else {
            await createReservation(payload);
        }
    };
    return { saveReservation };
};