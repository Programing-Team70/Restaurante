'use strict';

import ExcelJS from "exceljs";

export const generateExcel = async (report) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Reporte");

    sheet.columns = [
        { header: "Campo", key: "field" },
        { header: "Valor", key: "value" }
    ];

    Object.entries(report.data).forEach(([key, value]) => {
        sheet.addRow({
            field: key,
            value: JSON.stringify(value)
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};