import { useReportStore } from "../store/ReportStore";
import { TrashIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export const ReportTable = () => {
    const { reports, removeReport, loading } = useReportStore();

    const reportTypeLabel = {
        demanda: "Demanda",
        reservaciones: "Reservaciones",
        platos_populares: "Platos Populares",
        horas_pico: "Horas Pico",
        desempeño: "Desempeño",
    };

    const statusColor = {
        pendiente: "bg-yellow-100 text-yellow-700",
        generado: "bg-green-100 text-green-700",
        error: "bg-red-100 text-red-700",
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("es-GT", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    if (!reports.length) {
        return (
            <div className="text-center py-16 text-gray-400">
                <p className="text-lg">No hay reportes generados aún.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Título</th>
                        <th className="px-4 py-3">Tipo</th>
                        <th className="px-4 py-3">Desde</th>
                        <th className="px-4 py-3">Hasta</th>
                        <th className="px-4 py-3">Formato</th>
                        <th className="px-4 py-3">Estado</th>
                        <th className="px-4 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {reports.map((report) => (
                        <tr key={report._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-800">
                                {report.title}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                                {reportTypeLabel[report.reportType] ?? report.reportType}
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                                {formatDate(report.startDate)}
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                                {formatDate(report.endDate)}
                            </td>
                            <td className="px-4 py-3 uppercase text-gray-500">
                                {report.format}
                            </td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[report.status]}`}>
                                    {report.status}
                                </span>
                            </td>
                            <td className="px-4 py-3 flex items-center gap-2">
                                {report.fileUrl && (
                                    <a
                                        href={report.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-700 transition-colors"
                                        title="Descargar"
                                    >
                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                    </a>
                                )}
                                <button
                                    onClick={() => removeReport(report._id)}
                                    disabled={loading}
                                    className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                                    title="Eliminar"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};