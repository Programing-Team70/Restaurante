import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "react-native-gifted-charts";

export const ReportChart = ({ report }) => {
  console.log("REPORT:", report);
  console.log("DATA:", report?.data);
  console.log("TYPE:", report?.reportType);

  if (!report || !report.data) return null;

  const { reportType, data } = report;

  if (reportType === "demanda" || reportType === "reservaciones") {
    const chartData = [
      { name: "Total Reservaciones", valor: data.totalReservations || 15 },
      { name: "Demanda", valor: data.demand || 8 },
    ];

    return (
      <div className="mt-6 w-full h-[300px]">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          Resumen de {reportType === "demanda" ? "Demanda" : "Reservaciones"}
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="valor" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (reportType === "platos_populares") {
    const chartData = (data.topDishes ?? []).map((d) => ({
      name: d.name,
      vendidos: d.quantitySold,
    }));

    if (!chartData.length)
      return <p className="text-gray-400 text-sm mt-4">Sin datos de platos.</p>;

    return (
      <div className="mt-6 w-full h-[300px]">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          Platos más vendidos
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 12 }}
              width={120}
            />
            <Tooltip />
            <Bar dataKey="vendidos" fill="#10b981" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (reportType === "horas_pico") {
    const chartData = (data.peakHours ?? []).map((h) => ({
      hora: h.hour,
      reservaciones: h.reservations,
    }));

    if (!chartData.length)
      return (
        <p className="text-gray-400 text-sm mt-4">Sin datos de horas pico.</p>
      );

    return (
      <div className="mt-6 w-full h-[300px]">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Horas Pico</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hora" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="reservaciones"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (reportType === "desempeño") {
    const perf = data.performance ?? {};
    const chartData = [
      { name: "Ingresos", valor: perf.totalIncome ?? 0 },
      { name: "Ocupación %", valor: perf.averageOccupancy ?? 0 },
      { name: "Órdenes/día", valor: perf.ordersPerDay ?? 0 },
      { name: "Satisfacción", valor: perf.customerSatisfaction ?? 0 },
    ];

    return (
      <div className="mt-6 w-full h-[300px]">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          Métricas de Desempeño
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="valor" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
};
