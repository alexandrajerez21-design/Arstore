import { jsPDF } from "jspdf";

export function generarBoletaPDF(venta) {
  const doc = new jsPDF({
    unit: "mm",
    format: [80, 200] // Formato ticket boleta minimarket
  });

  // Encabezado
  doc.setFontSize(14);
  doc.text("🛒 Minimarket A&R", 10, 10);
  doc.setFontSize(10);
  doc.text("Boleta de compra", 10, 16);

  doc.setFontSize(8);
  doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 22);
  doc.text("----------------------------------------", 5, 27);

  // Lista de productos
  doc.setFontSize(9);
  venta.items.forEach((item, i) => {
    doc.text(`${i + 1}. ${item.nombre}`, 5, 34 + i * 6);
    doc.text(`$${item.precio}`, 55, 34 + i * 6);
  });

  const altoItems = 34 + venta.items.length * 6;

  doc.text("----------------------------------------", 5, altoItems + 4);

  // Total
  doc.setFontSize(11);
  doc.text(`TOTAL: $${venta.total}`, 10, altoItems + 12);

  doc.text("----------------------------------------", 5, altoItems + 18);
  doc.setFontSize(9);
  doc.text("Gracias por su compra 💜", 15, altoItems + 26);

  // Guardar PDF
  doc.save(`boleta_ARstore_${Date.now()}.pdf`);
}
