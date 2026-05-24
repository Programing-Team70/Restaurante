import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginRequest, register, register as registerRequest } from '../../../shared/api';
import { showError } from '../../../shared/utils/toast.js';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,
            checkAuth: () => {
                const token = get().token;
                const role = get().user?.role;
                const isAdmin = role === 'EMPLEADO';
                if (token && !isAdmin) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        error: 'No tiene permitido acceder a esta aplicacion.',
                    });
                    return;
                }
                set({ 
                    isLoadingAuth: false, 
                    isAuthenticated: Boolean(token) && isAdmin,
                });
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                });
            },

            login: async ({ emailOrUsername, password }) => {
                try {
                    set({ loading: true, error: null });
                    const { data } = await loginRequest({ emailOrUsername, password });
                    const role = data?.userDetails?.role;
                    console.log(data);
                    if (role !== 'EMPLEADO') {
                        const message = 'No tiene permitido acceder a esta aplicacion.';
                        set({
                            user: null,
                            token: null,
                            refreshToken: null,
                            expiresAt: null,
                            isAuthenticated: false,
                            isLoadingAuth: false,
                            error: message,
                        });
                        showError(message);
                        return { success: false, error: message };
                    }
                    set({
                        user: data.userDetails,
                        token: data.token,
                        refreshToken: data.refreshToken,
                        expiresAt: data.expiresIn,
                        isAuthenticated: true,
                        loading: false,
                    });
                    return { success: true };
                } catch (err) {
                    const message = err.response?.data?.message || 'Error al iniciar sesión.';
                    set({ error: message, loading: false });
                    return { success: false, error: message };
                }
            },

            register: async ({ name, email, password }) => {
                try {
                    set({ loading: true, error: null });
                    const { data } = await registerRequest({ FormData });
                    set({ loading: false });
                    return {
                        success: true,
                        emailVereificationRequired: data?.emailVerificationRequired || false,
                        data,
                    };
                } catch (err) {
                    const message = err.response?.data?.message || 'Error al registrar usuario.';
                    set({ error: message, loading: false });
                    return { success: false, error: message };
                }
            },
        }), { name: 'auth-HF' }
    )
);