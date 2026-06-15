import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Plus, Search } from "lucide-react-native";
import { useOrderStore } from "../store/OrderStore.js";
import { OrderContainer } from "../components/OrderContainer.jsx";
import { OrderContainerModal } from "../components/OrderContainerModal.jsx";
import { OrderModal } from "../components/OrderModal.jsx";
import { useSaveOrder } from "../hooks/UseOrder.js";

export const OrderPage = () => {
  const orders = useOrderStore((state) => state.orders);
  const loading = useOrderStore((state) => state.loading);
  const error = useOrderStore((state) => state.error);
  const getOrders = useOrderStore((state) => state.getOrders);
  const getOrdersByRestaurant = useOrderStore(
    (state) => state.getOrdersByRestaurant,
  );
  const { saveOrder } = useSaveOrder();

  const [searchId, setSearchId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleSearch = async () => {
    if (!searchId.trim()) {
      await getOrders();
      return;
    }
    await getOrdersByRestaurant(searchId.trim());
  };

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
    setIsDetailOpen(false);
  };

  const handleTransformToEdit = () => {
    setIsDetailOpen(false);
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = async (orderToDisable) => {
    try {
      await saveOrder({
        ...orderToDisable,
        isActive: false,
      });
      if (searchId.trim()) {
        await getOrdersByRestaurant(searchId.trim());
      } else {
        await getOrders();
      }
      setIsDetailOpen(false);
      setSelectedOrder(null);
    } catch (err) {
      console.error("Error al desactivar el pedido:", err);
    }
  };

  const handleSaveOrder = async (newOrderData) => {
    try {
      await saveOrder(newOrderData);
      if (searchId.trim()) {
        await getOrdersByRestaurant(searchId.trim());
      } else {
        await getOrders();
      }
      setIsModalOpen(false);
      setSelectedOrder(null);
    } catch (err) {
      console.error("Error al procesar el pedido en Heaven Flavor:", err);
    }
  };

  return (
    <ScrollView className="w-full py-10 px-6 space-y-8">
      <View className="flex-row justify-between items-center border-b border-gray-100 pb-5">
        <View className="space-y-1">
          <Text className="text-3xl font-bold text-[#0a192f]">Pedidos</Text>
          <Text className="text-gray-500 italic text-sm">
            Gestión de pedidos
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleOpenCreateModal}
          className="flex-row items-center mx-6 bg-[#0a192f] px-5 py-3 rounded-lg"
        >
          <Plus size={18} strokeWidth={2.5} color="white" />
          <Text className="text-white font-semibold">Nuevo</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View className="bg-red-50 p-4 rounded-xl border border-red-100 flex-col gap-2">
          <Text className="text-red-600 text-sm font-medium">{error}</Text>
        </View>
      )}

      <View className="bg-white p-4 rounded-2xl border border-gray-100">
        <View className="flex-row gap-3">
          <View className="relative flex-1">
            <Search
              size={18}
              color="#9ca3af"
              style={{ position: "absolute", left: 14, top: 12, zIndex: 10 }}
            />
            <TextInput
              value={searchId}
              onChangeText={setSearchId}
              placeholder="Buscar por ID del restaurante..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
              placeholderTextColor="#9ca3af"
            />
          </View>
          <TouchableOpacity
            onPress={handleSearch}
            className="bg-gray-100 px-6 justify-center rounded-xl"
          >
            <Text className="text-[#0a192f] font-bold text-xs uppercase tracking-wider">
              Buscar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View className="items-center justify-center py-12">
          <ActivityIndicator size="small" color="#9ca3af" className="mb-3" />
          <Text
            style={{ letterSpacing: 2 }}
            className="text-center text-gray-400 uppercase text-xs"
          >
            Sincronizando con la base de datos Heaven Flavor...
          </Text>
        </View>
      ) : (
        <View className="flex-row flex-wrap -mx-2">
          {Array.isArray(orders) &&
          orders.filter((order) => order && (order._id || order.id)).length >
            0 ? (
            orders
              .filter((order) => order && (order._id || order.id))
              .map((order) => (
                <View key={order._id || order.id} className="w-1/2 p-2">
                  <OrderContainer
                    order={order}
                    onClick={() => handleOpenDetail(order)}
                  />
                </View>
              ))
          ) : (
            <View className="w-full">
              <Text className="text-center py-12 text-gray-400 text-sm italic">
                {searchId.trim()
                  ? "No se encontraron pedidos registrados para esta consulta."
                  : "Ingrese un ID del pedido en el buscador superior para consultar su distribución."}
              </Text>
            </View>
          )}
        </View>
      )}

      <OrderContainerModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        selectedOrder={selectedOrder}
        onEditClick={handleTransformToEdit}
        onDeleteClick={handleDeleteOrder}
      />

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        onSave={handleSaveOrder}
        initialData={selectedOrder}
      />
    </ScrollView>
  );
};
