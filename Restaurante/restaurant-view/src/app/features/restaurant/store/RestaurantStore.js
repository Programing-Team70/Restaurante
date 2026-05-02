import { create } from "zustand";
import { persist } from "zustand/middleware";
import { restaurant as restaurantRequest } from "../../../shared/api";
import { showError } from "../../../shared/utils/Toast.js";

export const useRestaurantStore = create(
    persist(
        (set, get) => ({

        })
    )
)