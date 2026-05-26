import { useEffect, useState } from "react";
import { useReportStore } from "../store/ReportStore";
import { ReportTable } from "../components/ReportTable";
import { CreateReportModal } from "../components/CreateReportModal";
import { ReportChart } from "../components/ReportChart";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export const ReportsPage = () => {
    const { reports, fetchReports, selectedReport, fetchReport, loading, restaurants, fetchRestaurants, selectedRestaurantId, setSelectedRestaurantId } = useReportStore();

    const [showModal, setShowModal] = useState(false);
    const [activeReportId, setActiveReportId] = useState(null);

    useEffect(() => {
        fetchReports();
        fetchRestaurants();
    }, []);

    const handleSelectReport = async (id) => {
        if (activeReportId === id) {
            setActiveReportId(null);
            return;
        }
        setActiveReportId(id);
        await fetchReport(id);
    };

    return (
        <div className="p-6 space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reportes</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Genera y consulta reportes del restaurante
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchReports}
                        disabled={loading}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                        title="Refrescar"
                    >
                        <ArrowPathIcon className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Nuevo Reporte
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

            {loading && !reports.length ? (
                <div className="text-center py-16 text-gray-400">
                    <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p>Cargando reportes...</p>
                </div>
            ) : (
                <div>
                    {reports.length > 0 && (
                        <p className="text-xs text-gray-400 mb-2">
                            Haz clic en una fila para ver la gráfica del reporte.
                        </p>
                    )}

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
                                    <ReportRow
                                        key={report._id}
                                        report={report}
                                        isActive={activeReportId === report._id}
                                        onSelect={() => handleSelectReport(report._id)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeReportId && selectedReport && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-700 mb-1">
                        {selectedReport.title}
                    </h2>
                    <p className="text-xs text-gray-400 mb-2">
                        {new Date(selectedReport.startDate).toLocaleDateString("es-GT")} —{" "}
                        {new Date(selectedReport.endDate).toLocaleDateString("es-GT")}
                    </p>
                    <ReportChart report={selectedReport} />
                </div>
            )}

            {showModal && (
                <CreateReportModal
                    onClose={() => setShowModal(false)}
                    restaurantId={selectedRestaurantId}
                />
            )}
        </div>
    );
};

const ReportRow = ({ report, isActive, onSelect }) => {
    const { removeReport, loading } = useReportStore();

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

    return (
        <tr
            onClick={onSelect}
            className={`cursor-pointer transition-colors ${isActive ? "bg-blue-50" : "hover:bg-gray-50"}`}
        >
            <td className="px-4 py-3 font-medium text-gray-800">{report.title}</td>
            <td className="px-4 py-3 text-gray-600">
                {reportTypeLabel[report.reportType] ?? report.reportType}
            </td>
            <td className="px-4 py-3 text-gray-500">
                {new Date(report.startDate).toLocaleDateString("es-GT")}
            </td>
            <td className="px-4 py-3 text-gray-500">
                {new Date(report.endDate).toLocaleDateString("es-GT")}
            </td>
            <td className="px-4 py-3 uppercase text-gray-500">{report.format}</td>
            <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[report.status]}`}>
                    {report.status}
                </span>
            </td>
            <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                    {report.status === "generado" && report.fileUrl && (
                        <a
                            href={report.fileUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 transition-colors text-xs underline"
                        >
                            Descargar
                        </a>
                    )}
                    <button
                        onClick={() => removeReport(report._id)}
                        disabled={loading}
                        className="text-red-400 hover:text-red-600 transition-colors text-xs disabled:opacity-50"
                    >
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
};