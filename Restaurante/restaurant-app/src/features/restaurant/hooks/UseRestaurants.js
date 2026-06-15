import { useRestaurantStore } from '../store/RestaurantStore';

export const useSaveRestaurant = () => {
    const updateRestaurant = useRestaurantStore((state) => state.updateRestaurant);
    const createRestaurant = useRestaurantStore((state) => state.createRestaurant);

    const saveRestaurant = async (data) => {
        const restaurantId = data._id || data.id;
        const formData = new FormData();
        formData.append('restaurantName', data.restaurantName);
        formData.append('restaurantAddress', data.restaurantAddress);
        formData.append('restaurantSchedule', data.restaurantSchedule);
        formData.append('restaurantCategory', data.restaurantCategory);
        formData.append('averagePrice', data.averagePrice);
        
        if (data.phone) {
            formData.append('contact[phone]', data.phone);
        }
        if (data.email) {
            formData.append('contact[email]', data.email);
        }
        if (data.isAvailable !== undefined) {
            formData.append('isAvailable', data.isAvailable);
        }
        if (data.isActive !== undefined) {
            formData.append('isActive', data.isActive);
        }
        if (data.photos && data.photos.length > 0) {
            formData.append('images', data.photos[0]); 
        } else if (data.images && data.images.length > 0) {
            formData.append('images', data.images[0]); 
        }
        if (restaurantId) {
            await updateRestaurant(restaurantId, formData);
            return;
        } else {
            await createRestaurant(formData);
        }
    };
    return { saveRestaurant };
};