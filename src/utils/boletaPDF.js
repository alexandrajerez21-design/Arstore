// src/utils/boletaPDF.js
import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Generar boleta PDF
 * @param {Array} productos - [{nombre, precio, cantidad}]
 * @param {Number} total
 */
export function generarBoletaPDF(productos, total) {
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(18);
  doc.text("🛒 Minimarket A&R PRO", 14, 15);

  doc.setFontSize(12);
  doc.text("Comprobante de compra", 14, 22);
  doc.text(`Fecha: ${new Date().toLocaleString()}`, 14, 30);

  // Productos
  const filas = productos.map(p => [
    p.nombre,
    p.cantidad,
    "$" + p.precio,
    "$" + p.cantidad * p.precio,
  ]);

  doc.autoTable({
    head: [["Producto", "Cant.", "Precio", "Subtotal"]],
    body: filas,
    startY: 40,
  });

  // Total
  doc.setFontSize(14);
  doc.text(`TOTAL: $${total}`, 14, doc.lastAutoTable.finalY + 10);

  // Pie de página
  doc.setFontSize(10);
  doc.text("Gracias por su compra 💜", 14, doc.lastAutoTable.finalY + 20);
  doc.text("ARstore · Sistema de Caja", 14, doc.lastAutoTable.finalY + 25);

  // Descargar
  doc.save("boleta_ARstore.pdf");
}
