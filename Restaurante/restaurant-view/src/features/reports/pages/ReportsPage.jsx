import { useEffect, useState } from "react";
import { useReportStore } from "../store/ReportStore";
import { ReportTable } from "../components/ReportTable";
import { CreateReportModal } from "../components/CreateReportModal";
import { ReportChart } from "../components/ReportChart";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Plus, Trash2, Download } from 'lucide-react';

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
        <div className="w-full max-w-8xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center border-b border-gray-100">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-[#0a192f]">Reportes</h2>
                    <p className="text-gray-500 italic text-sm">Gestión de eventos Heaven Flavor</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchReports}
                        disabled={loading}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                    >
                        <ArrowPathIcon className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-[#0a192f] text-white px-5 py-5 rounded-lg font-semibold hover:bg-[#112240] transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 whitespace-nowrap tracking-wide"
                    >
                        <Plus size={18} strokeWidth={2.5} /> 
                        <span>Nuevo Reporte</span>
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

            {loading && !reports.length ? (
                <div className="text-center py-12 text-gray-400 tracking-[0.2em] uppercase text-xs animate-pulse">
                    Sincronizando con la base de datos Heaven Flavor...
                </div>
            ) : (
                <div>
                    {reports.length > 0 && (
                        <p className="text-xs text-gray-400 mb-2">
                            Selecciona el reporte para ver su grafica.
                        </p>
                    )}

                    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                        <table className="w-full text-left min-w-max border-collapse divide-x divide-gray-200">
                            <thead className="bg-[#0a192f] text-white">
                                <tr className="divide-x divide-gray-700">
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Título</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Tipo</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Desde</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Hasta</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Formato</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Estado</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Acciones</th>
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
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 justify-between">
                    <h2 className="text-2xl font-bold text-[#0a192f]">
                        {selectedReport.title}
                    </h2>
                    <p className="text-gray-500 italic text-sm">
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
            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{report.title}</td>
            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">
                {reportTypeLabel[report.reportType] ?? report.reportType}
            </td>
            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">
                {new Date(report.startDate).toLocaleDateString("es-GT")}
            </td>
            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">
                {new Date(report.endDate).toLocaleDateString("es-GT")}
            </td>
            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{report.format}</td>
            <td className="px-6 py-4 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[report.status]}`}>
                    {report.status}
                </span>
            </td>
            <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-center space-x-4 whitespace-nowrap">
                    {report.status === "generado" && report.fileUrl && (
                        <a
                            href={report.fileUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 transition-colors text-xs underline"
                        >
                            <Download size={22}/>
                        </a>
                    )}
                    <button
                        onClick={() => removeReport(report._id)}
                        disabled={loading}
                        className="p-2.5 text-red-600 hover:bg-red-50 hover:scale-105 rounded-xl transition-all duration-200"
                    >
                        <Trash2 size={22}/>
                    </button>
                </div>
            </td>
        </tr>
    );
};