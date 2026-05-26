import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useReportStore } from "../store/ReportStore";
import { PlusIcon, ArrowPathIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

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
        setSelectedRestaurantId
    } = useReportStore();

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (selectedRestaurantId) {
            fetchStatistics(selectedRestaurantId);
        }
    }, [selectedRestaurantId]);

    const onSubmit = async (data) => {

        if (!selectedRestaurantId) {
            toast.error("Selecciona un restaurante");
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

            topDishes: [
                {
                    name: data.topDish,
                    quantitySold: 1,
                }
            ]
        };

        try {
            if (editingId) {
                await editStatistic(editingId, payload);
                toast.success("Estadística actualizada");
            } else {
                await addStatistic(payload);
                toast.success("Estadística registrada");
            }
            reset();
            setShowForm(false);
            setEditingId(null);
        } catch (e) {
            toast.error(e?.response?.data?.message ?? "Error al guardar");
        }
    };

    const handleEdit = (stat) => {
        setEditingId(stat._id);
        setValue("date", stat.date?.substring(0, 10));
        setValue("totalIncome", stat.performance?.totalIncome);
        setValue("averageOccupancy", stat.performance?.averageOccupancy);
        setValue("totalOrders", stat.performance?.ordersPerDay);
        setValue("customerSatisfaction", stat.performance?.customerSatisfaction);
        setValue("peakHour", stat.demand?.peakHour);
        setValue("topDish", stat.topDishes?.[0]?.name);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await removeStatistic(id);
            toast.success("Estadística eliminada");
        } catch (e) {
            toast.error("Error al eliminar");
        }
    };

    const handleCancel = () => {
        reset();
        setShowForm(false);
        setEditingId(null);
    };

    return (
        <div className="p-6 space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Estadísticas</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Registra los datos diarios del restaurante
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => fetchStatistics(selectedRestaurantId)}
                        disabled={loading}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                        title="Refrescar"
                    >
                        <ArrowPathIcon className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                    </button>
                    <button
                        onClick={() => {
                            if (!selectedRestaurantId) {
                                toast.error("Selecciona un restaurante");
                                return;
                            }
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Nueva Estadística
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restaurante
                </label>

                <select
                    value={selectedRestaurantId}
                    onChange={(e) => setSelectedRestaurantId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                    <option value="">Selecciona un restaurante</option>

                    {restaurants.map((restaurant) => (
                        <option
                            key={restaurant._id}
                            value={restaurant._id}
                        >
                            {restaurant.restaurantName}
                        </option>
                    ))}
                </select>
            </div>

            {showForm && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            {editingId ? "Editar Estadística" : "Nueva Estadística"}
                        </h2>
                        <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("date", { required: "Requerido" })}
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ingresos Totales (Q)</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("totalIncome", { required: "Requerido", min: 0 })}
                            />
                            {errors.totalIncome && <p className="text-red-500 text-xs mt-1">{errors.totalIncome.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ocupación Promedio (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="100"
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("averageOccupancy", { required: "Requerido", min: 0, max: 100 })}
                            />
                            {errors.averageOccupancy && <p className="text-red-500 text-xs mt-1">{errors.averageOccupancy.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total de Órdenes</label>
                            <input
                                type="number"
                                min="0"
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("totalOrders", { required: "Requerido", min: 0 })}
                            />
                            {errors.totalOrders && <p className="text-red-500 text-xs mt-1">{errors.totalOrders.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Satisfacción del Cliente (1-5)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="1"
                                max="5"
                                placeholder="5.0"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("customerSatisfaction", { required: "Requerido", min: 1, max: 5 })}
                            />
                            {errors.customerSatisfaction && <p className="text-red-500 text-xs mt-1">{errors.customerSatisfaction.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hora Pico (0-23)</label>
                            <input
                                type="number"
                                min="0"
                                max="23"
                                placeholder="12"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("peakHour", { required: "Requerido", min: 0, max: 23 })}
                            />
                            {errors.peakHour && <p className="text-red-500 text-xs mt-1">{errors.peakHour.message}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plato más vendido</label>
                            <input
                                type="text"
                                placeholder="Ej: Pollo a la plancha"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("topDish", { required: "Requerido" })}
                            />
                            {errors.topDish && <p className="text-red-500 text-xs mt-1">{errors.topDish.message}</p>}
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? "Guardando..." : editingId ? "Actualizar" : "Guardar"}
                            </button>
                        </div>

                    </form>
                </div>
            )}

            {loading && !statistics.length ? (
                <div className="text-center py-16 text-gray-400">
                    <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p>Cargando estadísticas...</p>
                </div>
            ) : !statistics.length ? (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-lg">No hay estadísticas registradas aún.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">Fecha</th>
                                <th className="px-4 py-3">Ingresos (Q)</th>
                                <th className="px-4 py-3">Ocupación %</th>
                                <th className="px-4 py-3">Órdenes</th>
                                <th className="px-4 py-3">Satisfacción</th>
                                <th className="px-4 py-3">Hora Pico</th>
                                <th className="px-4 py-3">Plato Top</th>
                                <th className="px-4 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {statistics.map((stat) => (
                                <tr key={stat._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-gray-700">
                                        {new Date(stat.date).toLocaleDateString("es-GT")}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        Q{Number(stat.performance.totalIncome).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{stat.performance?.averageOccupancy}%</td>
                                    <td className="px-4 py-3 text-gray-600">{stat.performance?.ordersPerDay}</td>
                                    <td className="px-4 py-3 text-gray-600">{stat.performance?.customerSatisfaction}/5</td>
                                    <td className="px-4 py-3 text-gray-600">{stat.demand?.peakHour}:00</td>
                                    <td className="px-4 py-3 text-gray-600">{stat.topDishes?.[0]?.name}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(stat)}
                                                className="text-blue-400 hover:text-blue-600 transition-colors"
                                                title="Editar"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(stat._id)}
                                                disabled={loading}
                                                className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                                                title="Eliminar"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};