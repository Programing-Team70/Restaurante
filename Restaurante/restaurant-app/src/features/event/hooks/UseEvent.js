import { useEventStore } from '../store/EventStore.js';

export const useSaveEvent = () => {
    const createEvent = useEventStore((state) => state.createEvent);
    const updateEvent = useEventStore((state) => state.updateEvent);
    const cancelEvent = useEventStore((state) => state.cancelEvent);
    const saveEvent = async (data) => {
        const eventId = data._id || data.id;
        const payload = {
            title: data.title,
            description: data.description,
            eventType: data.eventType ? data.eventType.toLowerCase() : 'cena temática',
            eventDate: data.eventDate,
            capacity: Number(data.capacity || 1),
            status: data.status || 'programado',
            notes: data.notes || '',
            isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
            isActive: data.isActive !== undefined ? data.isActive : true,
            resources: {
                music: data.resources?.music || 'No requerida',
                decoration: data.resources?.decoration || 'No requerida',
                extraStaffNeeded: Number(data.resources?.extraStaffNeeded || 0),
                specialMenuItems: Array.isArray(data.resources?.specialMenuItems) 
                    ? data.resources.specialMenuItems 
                    : []
            }
        };
        if (data.restaurantId) {
            payload.restaurantId = data.restaurantId;
        } else if (data.restaurant) {
            payload.restaurantId = data.restaurant._id || data.restaurant.id || data.restaurant;
        }
        if (eventId && payload.status === 'cancelado') {
            await cancelEvent(eventId);
            return;
        }
        if (eventId) {
            await updateEvent(eventId, payload);
        } else {
            await createEvent(payload);
        }
    };
    return { saveEvent };
};