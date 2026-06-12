import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useReportStore } from "../store/ReportStore";
import { PlusIcon, ArrowPathIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { Plus, Trash2, XCircle, Edit3 } from 'lucide-react';

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
        <div className="w-full max-w-8xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center border-b border-gray-100">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-[#0a192f]">Estadisticas</h2>
                    <p className="text-gray-500 italic text-sm">Gestión de estadisticas Heaven Flavor</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => fetchStatistics(selectedRestaurantId)}
                        disabled={loading}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
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
                        className="flex items-center gap-2 bg-[#0a192f] text-white px-5 py-5 rounded-lg font-semibold hover:bg-[#112240] transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 whitespace-nowrap tracking-wide"
                    >
                        <Plus size={18} strokeWidth={2.5} /> 
                        <span>Nuevo Estadistica</span>
                    </button>
                </div>
            </header>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f]">
                    Restaurante
                </label>
                <select
                    value={selectedRestaurantId}
                    onChange={(e) => setSelectedRestaurantId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors bg-white"
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
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-[#0a192f] text-white px-10 py-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold tracking-wide">
                                {editingId ? "Editar Estadística" : "Nueva Estadística"}
                            </h3>
                            <p className="text-xs text-gray-300 font-normal mt-0.5">
                                {editingId ? 'Modifique una estadistica Heaven Flavor' : 'Cree una nueva estadistica Heaven Flavor'}
                            </p>
                        </div>
                        <button onClick={handleCancel} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white disabled:opacity-50">
                            <XCircle size={22} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-10 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 text-left">

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Fecha</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                {...register("date", { required: "Requerido" })}
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Ingresos Totales (Q)</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"                                {...register("totalIncome", { required: "Requerido", min: 0 })}
                            />
                            {errors.totalIncome && <p className="text-red-500 text-xs mt-1">{errors.totalIncome.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Ocupación Promedio (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="100"
                                placeholder="0"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"                                {...register("totalIncome", { required: "Requerido", min: 0 })}
                                {...register("averageOccupancy", { required: "Requerido", min: 0, max: 100 })}
                            />
                            {errors.averageOccupancy && <p className="text-red-500 text-xs mt-1">{errors.averageOccupancy.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Total de Órdenes</label>
                            <input
                                type="number"
                                min="0"
                                placeholder="0"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"                                {...register("totalIncome", { required: "Requerido", min: 0 })}
                                {...register("totalOrders", { required: "Requerido", min: 0 })}
                            />
                            {errors.totalOrders && <p className="text-red-500 text-xs mt-1">{errors.totalOrders.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Satisfacción del Cliente (1-5)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="1"
                                max="5"
                                placeholder="5.0"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"                                {...register("totalIncome", { required: "Requerido", min: 0 })}
                                {...register("customerSatisfaction", { required: "Requerido", min: 1, max: 5 })}
                            />
                            {errors.customerSatisfaction && <p className="text-red-500 text-xs mt-1">{errors.customerSatisfaction.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Hora Pico (0-23)</label>
                            <input
                                type="number"
                                min="0"
                                max="23"
                                placeholder="12"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"                                {...register("totalIncome", { required: "Requerido", min: 0 })}
                                {...register("peakHour", { required: "Requerido", min: 0, max: 23 })}
                            />
                            {errors.peakHour && <p className="text-red-500 text-xs mt-1">{errors.peakHour.message}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Plato más vendido</label>
                            <input
                                type="text"
                                placeholder="Ej: Pollo a la plancha"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"                                {...register("totalIncome", { required: "Requerido", min: 0 })}
                                {...register("topDish", { required: "Requerido" })}
                            />
                            {errors.topDish && <p className="text-red-500 text-xs mt-1">{errors.topDish.message}</p>}
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-colors bg-[#0a192f] hover:bg-[#122b52]"
                            >
                                {loading ? "Guardando..." : editingId ? "Actualizar" : "Guardar"}
                            </button>
                        </div>

                    </form>
                </div>
            )}

            {loading && !statistics.length ? (
                <div className="text-center py-12 text-gray-400 tracking-[0.2em] uppercase text-xs animate-pulse">
                    <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p className="text-center py-12 text-gray-400 tracking-[0.2em] uppercase text-xs animate-pulse">Sincronizando con la base de datos Heaven Flavor...</p>
                </div>
            ) : !statistics.length ? (
                <div className="text-center py-12 text-gray-400 tracking-[0.2em] uppercase text-xs animate-pulse">
                    <p className="text-center py-12 text-gray-400 tracking-[0.2em] uppercase text-xs animate-pulse">Aún no hay estadísticas registradas.</p>
                </div>
            ) : (
                <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full text-left min-w-max border-collapse divide-x divide-gray-200">
                        <thead className="bg-[#0a192f] text-white">
                            <tr className="divide-x divide-gray-700">
                                <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Fecha</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Ingresos</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Ocupación</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Órdenes</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Satisfacción</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Hora Pico</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Plato Top</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {statistics.map((stat) => (
                                <tr key={stat._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">
                                        {new Date(stat.date).toLocaleDateString("es-GT")}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">
                                        Q{Number(stat.performance.totalIncome).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{stat.performance?.averageOccupancy}%</td>
                                    <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{stat.performance?.ordersPerDay}</td>
                                    <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{stat.performance?.customerSatisfaction}/5</td>
                                    <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{stat.demand?.peakHour}:00</td>
                                    <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{stat.topDishes?.[0]?.name}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center space-x-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleEdit(stat)}
                                                className="p-2.5 text-blue-600 hover:bg-blue-50 hover:scale-105 rounded-xl transition-all duration-200"
                                                title="Editar"
                                            >
                                                <Edit3 size={22}/>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(stat._id)}
                                                disabled={loading}
                                                className="p-2.5 text-red-600 hover:bg-red-50 hover:scale-105 rounded-xl transition-all duration-200"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={22}/>
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