'use strict';

import PDFDocument from "pdfkit";

export const generatePDF = (report) => {
    return new Promise((resolve) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => resolve(Buffer.concat(buffers)));

        doc.fontSize(18).text(`Reporte: ${report.title}`);
        doc.moveDown();

        doc.text(`Tipo: ${report.reportType}`);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.moveDown();

        doc.text(JSON.stringify(report.data, null, 2));

        doc.end();
    });
};