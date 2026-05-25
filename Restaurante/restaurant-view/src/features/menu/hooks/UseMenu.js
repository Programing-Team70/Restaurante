import { useMenuStore } from '../store/MenuStore';

export const useSaveMenu = () => {
    const updateMenu = useMenuStore((state) => state.updateMenu);
    const createMenu = useMenuStore((state) => state.createMenu);

    const saveMenu = async (data) => {
        const menuId = data._id || data.id;
        const payload = {
            name: data.name,
            description: data.description,
            price: Number(data.price), 
            type: data.type,
            ingredients: Array.isArray(data.ingredients) 
                ? data.ingredients.filter(ing => ing.trim() !== '') 
                : [],
            isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
            isActive: data.isActive !== undefined ? data.isActive : true
        };
        if (data.restaurant) {
            payload.restaurant = data.restaurant;
        }
        if (menuId) {
            await updateMenu(menuId, payload);
            return;
        } else {
            await createMenu(payload);
        }
    };
    return { saveMenu };
};