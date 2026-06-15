import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRestaurantStore } from "../store/RestaurantStore";
import { RestaurantContainer } from "../components/RestaurantContainer.jsx";

export const RestaurantsPage = () => {
  const restaurants = useRestaurantStore((state) => state.restaurants);
  const loading = useRestaurantStore((state) => state.loading);
  const error = useRestaurantStore((state) => state.error);
  const getRestaurants = useRestaurantStore((state) => state.getRestaurants);

  useEffect(() => {
    getRestaurants();
  }, []);

  const validRestaurants = Array.isArray(restaurants) 
    ? restaurants.filter((res) => res && (res._id || res.id))
    : [];

  return (
    <ScrollView className="w-full py-10 px-6 space-y-8">
      <View className="flex-row justify-between items-center border-b border-gray-100 pb-4">
        <View className="space-y-1">
          <Text className="text-3xl font-bold text-[#0a192f]">
            Restaurantes
          </Text>
          <Text className="text-gray-500 italic text-sm">
            Visualización de restaurantes disponibles
          </Text>
        </View>
      </View>

      {error && (
        <View className="bg-red-50 p-4 rounded-xl border border-red-100">
          <Text className="text-red-600 text-sm font-medium text-left">
            {error}
          </Text>
        </View>
      )}

      {loading ? (
        <View className="items-center justify-center py-12">
          <ActivityIndicator size="small" color="#9ca3af" className="mb-3" />
          <Text
            style={{ letterSpacing: 2.0 }}
            className="text-center text-gray-400 uppercase text-[10px] px-4 font-semibold"
          >
            Sincronizando con la base de datos Heaven Flavor...
          </Text>
        </View>
      ) : (
        <View className="w-full">
          {validRestaurants.length > 0 ? (
            <RestaurantContainer data={validRestaurants} />
          ) : (
            <View className="w-full py-12 items-center">
              <Text className="text-gray-400 text-sm italic text-center">
                No se encontraron restaurantes registrados en Heaven Flavor.
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};