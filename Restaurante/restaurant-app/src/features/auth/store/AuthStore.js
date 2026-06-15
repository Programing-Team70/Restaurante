import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  login as loginRequest,
  register as registerRequest,
  forgotPassword as forgotPasswordRequest,
  resetPassword as resetPasswordRequest,
} from "../../../shared/api/Auth.js";
import { showError } from "../../../shared/utils/Toast.js";

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
        try {
          const token = get().token;
          const role = get().user?.role;
          const isAdmin = role === "EMPLEADO";

          if (token && !isAdmin) {
            set({
              user: null,
              token: null,
              refreshToken: null,
              expiresAt: null,
              isAuthenticated: false,
              error: "No tiene permitido acceder a esta aplicacion.",
            });
            return;
          }
          set({
            isAuthenticated: Boolean(token) && isAdmin,
          });
        } catch (err) {
          console.error("Error en checkAuth:", err);
          set({ isAuthenticated: false });
        } finally {
          set({ isLoadingAuth: false });
        }
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
        console.log("2) login() llamado con:", emailOrUsername, password);
        try {
          set({ loading: true, error: null });
          const { data } = await loginRequest({ emailOrUsername, password });
          const role = data?.userDetails?.role;

          console.log(data);
          if (role !== "EMPLEADO") {
            const message = "No tiene permitido acceder a esta aplicacion.";
            set({
              user: null,
              token: null,
              refreshToken: null,
              expiresAt: null,
              isAuthenticated: false,
              error: message,
              loading: false,
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
          console.log(
            "ERROR axios:",
            err.message,
            err.code,
            err?.config?.baseURL,
            err?.config?.url,
          );
          const message =
            err.response?.data?.message || "Error al iniciar sesión.";
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      register: async (formData) => {
        try {
          set({ loading: true, error: null });
          const { data } = await registerRequest(formData);
          set({ loading: false });
          return {
            success: true,
            emailVerificationRequired: data?.emailVerificationRequired,
            data,
          };
        } catch (err) {
          const message = err.response?.data?.message || "Error al registrarse";
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      forgotPassword: async (email) => {
        try {
          set({ loading: true, error: null });
          const { data } = await forgotPasswordRequest(email);
          set({ loading: false });
          return { success: true, data };
        } catch (err) {
          const message =
            err.response?.data?.message || "Error al enviar el correo";
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      resetPassword: async ({ token, newPassword }) => {
        try {
          set({ loading: true, error: null });
          const { data } = await resetPasswordRequest(token, newPassword);
          return { success: true, data };
        } catch (err) {
          const message =
            err.response?.data?.message || "Error al restablecer contraseña";
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },
    }),
    {
      name: "auth-HF",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
