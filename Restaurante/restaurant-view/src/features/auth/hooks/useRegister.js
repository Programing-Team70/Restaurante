import { useAuthStore } from '../store/authStore';

export const useRegister = () => {
    const register = useAuthStore((state) => state.register);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const handleRegister = async (values) => {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('surname', values.surname);
        formData.append('username', values.username);
        formData.append('phone', values.phone);
        formData.append('email', values.email);
        formData.append('password', values.password);

        return await register(formData);
    };

    return {
        handleRegister,
        loading,
        error,
    };
};
