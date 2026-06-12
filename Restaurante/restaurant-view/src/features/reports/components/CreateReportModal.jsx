import { useForm } from "react-hook-form";
import { useReportStore } from "../store/ReportStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { XCircle, Upload } from 'lucide-react';

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="fixed inset-0 bg-[#0a192f]/40 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />
        
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-3xl overflow-hidden transform transition-all z-10 max-h-[90vh] flex flex-col">
                <div className="bg-[#0a192f] text-white px-10 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold tracking-wide">
                            Crear Reporte
                        </h2>
                    </div>
                    <button 
                        type="button"
                        onClick={onClose} 
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white disabled:opacity-50"
                    >
                        <XCircle size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-10 overflow-y-auto space-y-5 flex-1 text-left">

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                            Título
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Reporte semanal de demanda"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            {...register("title", { required: "El título es requerido" })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                            Tipo de Reporte
                        </label>
                        <select
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
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
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                Fecha Inicio
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                {...register("startDate", { required: "Requerido" })}
                            />
                            {errors.startDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                Fecha Fin
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                {...register("endDate", { required: "Requerido" })}
                            />
                            {errors.endDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                            Formato de salida
                        </label>
                        <select
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
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
                            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-colors bg-[#0a192f] hover:bg-[#122b52]"
                        >
                            {loading ? "Generando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};