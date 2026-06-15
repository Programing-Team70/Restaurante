import { useTableStore } from '../store/TableStore';

export const useSaveTable = () => {
    const updateTable = useTableStore((state) => state.updateTable);
    const createTable = useTableStore((state) => state.createTable);

    const saveTable = async (data) => {
        const tableId = data._id || data.id;
        const payload = {
            restaurant: data.restaurant,
            capacity: Number(data.capacity),
            location: data.location,
            availableHours: data.availableHours || [],
            isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
            isActive: data.isActive !== undefined ? data.isActive : true
        };
        if (tableId) {
            await updateTable(tableId, payload);
            return;
        } else {
            await createTable(payload);
        }
    };
    return { saveTable };
};