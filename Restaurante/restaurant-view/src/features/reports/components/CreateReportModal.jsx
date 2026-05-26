import { useForm } from "react-hook-form";
import { useReportStore } from "../store/ReportStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export const CreateReportModal = ({ onClose, restaurantId }) => {
    const { addReport, loading } = useReportStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await addReport({
                ...data,
                restaurantId,
            });
            toast.success("Reporte generado correctamente");
            onClose();
        } catch (e) {
            toast.error(e?.response?.data?.message ?? "Error al generar el reporte");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Generar Reporte
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Título
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Reporte semanal de demanda"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("title", { required: "El título es requerido" })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Reporte
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("reportType", { required: "Selecciona un tipo" })}
                        >
                            <option value="">-- Seleccionar --</option>
                            <option value="demanda">Demanda</option>
                            <option value="reservaciones">Reservaciones</option>
                            <option value="platos_populares">Platos Populares</option>
                            <option value="horas_pico">Horas Pico</option>
                            <option value="desempeño">Desempeño</option>
                        </select>
                        {errors.reportType && (
                            <p className="text-red-500 text-xs mt-1">{errors.reportType.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha Inicio
                            </label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("startDate", { required: "Requerido" })}
                            />
                            {errors.startDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha Fin
                            </label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("endDate", { required: "Requerido" })}
                            />
                            {errors.endDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Formato de salida
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("format")}
                        >
                            <option value="json">JSON (solo datos)</option>
                            <option value="pdf">PDF</option>
                            <option value="excel">Excel</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Generando..." : "Generar Reporte"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};