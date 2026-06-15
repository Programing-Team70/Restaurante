import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Plus, Edit3, Trash2, XCircle, RefreshCw } from "lucide-react-native";
import { useReportStore } from "../store/ReportStore";
import Toast from "react-native-toast-message";

export const StatisticsPage = () => {
  const {
    statistics,
    fetchStatistics,
    addStatistic,
    editStatistic,
    removeStatistic,
    loading,
    restaurants,
    fetchRestaurants,
    selectedRestaurantId,
    setSelectedRestaurantId,
  } = useReportStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showRestaurantPicker, setShowRestaurantPicker] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (selectedRestaurantId) {
      fetchStatistics(selectedRestaurantId);
    }
  }, [selectedRestaurantId]);

  const selectedRestaurant = restaurants.find(
    (r) => r._id === selectedRestaurantId,
  );

  const onSubmit = async (data) => {
    if (!selectedRestaurantId) {
      Toast.show({ type: "error", text1: "Selecciona un restaurante" });
      return;
    }

    const payload = {
      restaurantId: selectedRestaurantId,
      date: data.date,
      period: "diario",
      performance: {
        totalIncome: Number(data.totalIncome),
        averageOccupancy: Number(data.averageOccupancy),
        ordersPerDay: Number(data.totalOrders),
        customerSatisfaction: Number(data.customerSatisfaction),
      },
      demand: {
        peakHour: `${data.peakHour}:00`,
      },
      topDishes: [{ name: data.topDish, quantitySold: 1 }],
    };

    try {
      if (editingId) {
        await editStatistic(editingId, payload);
        Toast.show({ type: "success", text1: "Estadística actualizada" });
      } else {
        await addStatistic(payload);
        Toast.show({ type: "success", text1: "Estadística registrada" });
      }
      reset();
      setShowForm(false);
      setEditingId(null);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: e?.response?.data?.message ?? "Error al guardar",
      });
    }
  };

  const handleEdit = (stat) => {
    setEditingId(stat._id);
    setValue("date", stat.date?.substring(0, 10));
    setValue("totalIncome", String(stat.performance?.totalIncome ?? ""));
    setValue(
      "averageOccupancy",
      String(stat.performance?.averageOccupancy ?? ""),
    );
    setValue("totalOrders", String(stat.performance?.ordersPerDay ?? ""));
    setValue(
      "customerSatisfaction",
      String(stat.performance?.customerSatisfaction ?? ""),
    );
    setValue("peakHour", stat.demand?.peakHour?.replace(":00", "") ?? "");
    setValue("topDish", stat.topDishes?.[0]?.name ?? "");
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await removeStatistic(id);
      Toast.show({ type: "success", text1: "Estadística eliminada" });
    } catch {
      Toast.show({ type: "error", text1: "Error al eliminar" });
    }
  };

  const handleCancel = () => {
    reset();
    setShowForm(false);
    setEditingId(null);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white";

  const Field = ({
    label,
    name,
    rules,
    keyboardType = "default",
    placeholder,
  }) => (
    <View className="mb-4">
      <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-1">
        {label}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={inputClass}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
          />
        )}
      />
      {errors[name] && (
        <Text className="text-red-500 text-xs mt-1">
          {errors[name].message}
        </Text>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-[#0a192f]">
            Estadísticas
          </Text>
          <Text className="text-gray-400 text-xs italic mt-0.5">
            Gestión Heaven Flavor
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() =>
              selectedRestaurantId && fetchStatistics(selectedRestaurantId)
            }
            disabled={loading}
            className="p-2 rounded-lg"
          >
            <RefreshCw size={20} color={loading ? "#d1d5db" : "#6b7280"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!selectedRestaurantId) {
                Toast.show({
                  type: "error",
                  text1: "Selecciona un restaurante",
                });
                return;
              }
              setShowForm(true);
            }}
            className="flex-row items-center gap-2 bg-[#0a192f] px-4 py-2.5 rounded-xl"
          >
            <Plus size={16} color="white" strokeWidth={2.5} />
            <Text className="text-white text-sm font-semibold">Nueva</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() =>
              selectedRestaurantId && fetchStatistics(selectedRestaurantId)
            }
          />
        }
      >
        {/* Restaurant Picker */}
        <View className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
          <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
            Restaurante
          </Text>
          <TouchableOpacity
            onPress={() => setShowRestaurantPicker(true)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white flex-row items-center justify-between"
          >
            <Text
              className={`text-sm font-medium ${selectedRestaurant ? "text-gray-800" : "text-gray-400"}`}
            >
              {selectedRestaurant?.restaurantName ??
                "Selecciona un restaurante"}
            </Text>
            <Text className="text-gray-400 text-xs">▼</Text>
          </TouchableOpacity>
        </View>

        {/* Table */}
        {loading && !statistics.length ? (
          <View className="items-center py-16">
            <ActivityIndicator size="large" color="#0a192f" />
            <Text className="text-gray-400 text-xs uppercase tracking-widest mt-3">
              Cargando estadísticas...
            </Text>
          </View>
        ) : !statistics.length ? (
          <View className="items-center py-16">
            <Text className="text-gray-400 text-xs uppercase tracking-widest">
              Aún no hay estadísticas registradas.
            </Text>
          </View>
        ) : (
          <View className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator>
              <View>
                {/* Table Header */}
                <View className="flex-row bg-[#0a192f]">
                  {[
                    "Fecha",
                    "Ingresos",
                    "Ocupación",
                    "Órdenes",
                    "Satisf.",
                    "H. Pico",
                    "Plato Top",
                    "Acciones",
                  ].map((col) => (
                    <View key={col} className="w-28 px-3 py-4 items-center">
                      <Text className="text-white text-xs font-semibold uppercase tracking-wide text-center">
                        {col}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Table Rows */}
                {statistics.map((stat, index) => (
                  <View
                    key={stat._id}
                    className={`flex-row border-b border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <View className="w-28 px-3 py-4 items-center justify-center">
                      <Text className="text-xs text-[#0a192f] font-medium text-center">
                        {new Date(stat.date).toLocaleDateString("es-GT")}
                      </Text>
                    </View>
                    <View className="w-28 px-3 py-4 items-center justify-center">
                      <Text className="text-xs text-[#0a192f] font-medium">
                        Q{Number(stat.performance?.totalIncome).toFixed(2)}
                      </Text>
                    </View>
                    <View className="w-28 px-3 py-4 items-center justify-center">
                      <Text className="text-xs text-[#0a192f] font-medium">
                        {stat.performance?.averageOccupancy}%
                      </Text>
                    </View>
                    <View className="w-28 px-3 py-4 items-center justify-center">
                      <Text className="text-xs text-[#0a192f] font-medium">
                        {stat.performance?.ordersPerDay}
                      </Text>
                    </View>
                    <View className="w-28 px-3 py-4 items-center justify-center">
                      <Text className="text-xs text-[#0a192f] font-medium">
                        {stat.performance?.customerSatisfaction}/5
                      </Text>
                    </View>
                    <View className="w-28 px-3 py-4 items-center justify-center">
                      <Text className="text-xs text-[#0a192f] font-medium">
                        {stat.demand?.peakHour}
                      </Text>
                    </View>
                    <View className="w-28 px-3 py-4 items-center justify-center">
                      <Text className="text-xs text-[#0a192f] font-medium text-center">
                        {stat.topDishes?.[0]?.name}
                      </Text>
                    </View>
                    <View className="w-28 px-3 py-4 flex-row items-center justify-center gap-2">
                      <TouchableOpacity
                        onPress={() => handleEdit(stat)}
                        className="p-2 rounded-xl bg-blue-50"
                      >
                        <Edit3 size={16} color="#2563eb" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDelete(stat._id)}
                        disabled={loading}
                        className="p-2 rounded-xl bg-red-50"
                      >
                        <Trash2 size={16} color="#dc2626" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Restaurant Picker Modal */}
      <Modal visible={showRestaurantPicker} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-end"
          activeOpacity={1}
          onPress={() => setShowRestaurantPicker(false)}
        >
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-base font-bold text-[#0a192f] mb-4">
              Selecciona un restaurante
            </Text>
            {restaurants.map((r) => (
              <TouchableOpacity
                key={r._id}
                onPress={() => {
                  setSelectedRestaurantId(r._id);
                  setShowRestaurantPicker(false);
                }}
                className={`px-4 py-3 rounded-xl mb-2 ${
                  selectedRestaurantId === r._id
                    ? "bg-[#0a192f]"
                    : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedRestaurantId === r._id
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {r.restaurantName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Form Modal */}
      <Modal visible={showForm} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl overflow-hidden max-h-[90%]">
            {/* Modal Header */}
            <View className="bg-[#0a192f] px-6 py-4 flex-row items-center justify-between">
              <View>
                <Text className="text-white text-base font-bold">
                  {editingId ? "Editar Estadística" : "Nueva Estadística"}
                </Text>
                <Text className="text-gray-300 text-xs mt-0.5">
                  {editingId
                    ? "Modifica los datos de la estadística"
                    : "Registra una nueva estadística"}
                </Text>
              </View>
              <TouchableOpacity onPress={handleCancel} className="p-1.5">
                <XCircle size={22} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <ScrollView className="p-6" keyboardShouldPersistTaps="handled">
              <Field
                label="Fecha (YYYY-MM-DD)"
                name="date"
                rules={{ required: "Requerido" }}
                placeholder="2024-01-15"
              />
              <Field
                label="Ingresos Totales (Q)"
                name="totalIncome"
                rules={{ required: "Requerido" }}
                keyboardType="decimal-pad"
                placeholder="0.00"
              />
              <Field
                label="Ocupación Promedio (%)"
                name="averageOccupancy"
                rules={{ required: "Requerido" }}
                keyboardType="decimal-pad"
                placeholder="0"
              />
              <Field
                label="Total de Órdenes"
                name="totalOrders"
                rules={{ required: "Requerido" }}
                keyboardType="number-pad"
                placeholder="0"
              />
              <Field
                label="Satisfacción del Cliente (1-5)"
                name="customerSatisfaction"
                rules={{ required: "Requerido" }}
                keyboardType="decimal-pad"
                placeholder="5.0"
              />
              <Field
                label="Hora Pico (0-23)"
                name="peakHour"
                rules={{ required: "Requerido" }}
                keyboardType="number-pad"
                placeholder="12"
              />
              <Field
                label="Plato más vendido"
                name="topDish"
                rules={{ required: "Requerido" }}
                placeholder="Ej: Pollo a la plancha"
              />

              {/* Buttons */}
              <View className="flex-row gap-3 pt-2 pb-8">
                <TouchableOpacity
                  onPress={handleCancel}
                  className="flex-1 py-3 rounded-xl border border-gray-200 items-center"
                >
                  <Text className="text-gray-600 text-sm font-semibold">
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-[#0a192f] items-center"
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text className="text-white text-sm font-semibold">
                      {editingId ? "Actualizar" : "Guardar"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
