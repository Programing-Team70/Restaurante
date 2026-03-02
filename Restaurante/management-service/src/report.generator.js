import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import fs from "fs";

export const generatePDF = (data, filename) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(`reports/${filename}.pdf`);
    doc.pipe(stream);
    doc.fontSize(20).text(filename, { align: "center" });
    data.forEach((item) => {
      doc.fontSize(12).text(JSON.stringify(item));
    });
    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
};

export const generateExcel = async (data, filename) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(filename);
  worksheet.columns = Object.keys(data[0]).map((key) => ({ header: key, key }));
  worksheet.addRows(data);
  await workbook.xlsx.writeFile(`reports/${filename}.xlsx`);
};
